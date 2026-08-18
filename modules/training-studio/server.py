from __future__ import annotations

import html
import json
import os
import re
import shutil
import sqlite3
import uuid
from io import BytesIO
from difflib import SequenceMatcher
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

from fastapi import FastAPI, File, Form, HTTPException, UploadFile, Request
from fastapi.responses import FileResponse, HTMLResponse, Response
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

import qrcode
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4, landscape
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.utils import ImageReader
from reportlab.pdfgen import canvas

from engine import analyze_pdf, intro_like_title, interaction_readiness, teaching_statement_quality, module_quiz_budget

BASE = Path(__file__).resolve().parent
DATA = BASE / "data"
UPLOADS = DATA / "uploads"
ASSETS = DATA / "assets"
MATERIALS = DATA / "materials"
DB = DATA / "studio.db"
STATIC = BASE / "static"
UPLOADS.mkdir(parents=True, exist_ok=True)
ASSETS.mkdir(parents=True, exist_ok=True)
MATERIALS.mkdir(parents=True, exist_ok=True)

app = FastAPI(title="Fortix Training Studio", version="1.6.0")
app.mount("/static", StaticFiles(directory=STATIC), name="static")
app.mount("/assets", StaticFiles(directory=ASSETS), name="assets")


def now_iso() -> str:
    return datetime.now(timezone.utc).isoformat()


def conn() -> sqlite3.Connection:
    c = sqlite3.connect(DB)
    c.row_factory = sqlite3.Row
    return c


def init_db() -> None:
    with conn() as c:
        c.execute(
            """
            CREATE TABLE IF NOT EXISTS projects (
                id TEXT PRIMARY KEY,
                title TEXT NOT NULL,
                status TEXT NOT NULL,
                filename TEXT NOT NULL,
                source_path TEXT,
                source_deleted INTEGER NOT NULL DEFAULT 0,
                created_at TEXT NOT NULL,
                updated_at TEXT NOT NULL,
                payload TEXT NOT NULL
            )
            """
        )
        c.execute(
            """
            CREATE TABLE IF NOT EXISTS certificates (
                id TEXT PRIMARY KEY,
                certificate_code TEXT UNIQUE NOT NULL,
                project_id TEXT NOT NULL,
                student_name TEXT NOT NULL,
                student_document TEXT,
                student_email TEXT,
                student_company TEXT,
                student_role TEXT,
                course_title TEXT NOT NULL,
                workload_hours REAL NOT NULL,
                score INTEGER NOT NULL,
                completed_at TEXT NOT NULL,
                issued_at TEXT NOT NULL,
                payload TEXT NOT NULL
            )
            """
        )
        c.execute("CREATE INDEX IF NOT EXISTS idx_cert_project ON certificates(project_id)")
        c.execute("CREATE INDEX IF NOT EXISTS idx_cert_code ON certificates(certificate_code)")


init_db()


class ProjectPayload(BaseModel):
    payload: dict[str, Any]


class CertificateIssue(BaseModel):
    student: dict[str, Any]
    answers: dict[str, int]
    completedAt: str | None = None


def safe_filename(value: str, fallback: str = "arquivo") -> str:
    value = re.sub(r"[^A-Za-z0-9._ -]+", "", str(value or "")).strip().replace(" ", "-")
    return value[:120] or fallback


def material_dir(project_id: str) -> Path:
    d = MATERIALS / project_id
    d.mkdir(parents=True, exist_ok=True)
    return d


def find_material(payload: dict[str, Any], material_id: str) -> dict[str, Any] | None:
    return next((m for m in payload.get("materials", []) if str(m.get("id")) == str(material_id)), None)


def certificate_row(code: str) -> dict[str, Any]:
    with conn() as c:
        row = c.execute("SELECT * FROM certificates WHERE certificate_code=?", (code,)).fetchone()
    if not row:
        raise HTTPException(404, "Certificado não encontrado")
    return dict(row)


def certificate_pdf_bytes(row: dict[str, Any], verification_url: str) -> bytes:
    buf = BytesIO()
    page_w, page_h = landscape(A4)
    c = canvas.Canvas(buf, pagesize=(page_w, page_h))
    # Clean FortixSeg certificate: navy frame, orange accent and high contrast.
    c.setFillColor(colors.HexColor("#F7F9FC")); c.rect(0, 0, page_w, page_h, fill=1, stroke=0)
    c.setStrokeColor(colors.HexColor("#0E2F4F")); c.setLineWidth(5); c.rect(26, 26, page_w-52, page_h-52, fill=0, stroke=1)
    c.setStrokeColor(colors.HexColor("#F59E0B")); c.setLineWidth(1.5); c.rect(38, 38, page_w-76, page_h-76, fill=0, stroke=1)
    c.setFillColor(colors.HexColor("#0E2F4F")); c.setFont("Helvetica-Bold", 24); c.drawCentredString(page_w/2, page_h-92, "CERTIFICADO DE CONCLUSÃO")
    c.setFillColor(colors.HexColor("#F59E0B")); c.setFont("Helvetica-Bold", 13); c.drawCentredString(page_w/2, page_h-116, "FORTIXSEG · TREINAMENTOS EM SEGURANÇA DO TRABALHO")
    name = row.get("student_name") or "Aluno"
    course = row.get("course_title") or "Treinamento"
    hours = float(row.get("workload_hours") or 0)
    score = int(row.get("score") or 0)
    completed = str(row.get("completed_at") or "")[:10]
    c.setFillColor(colors.HexColor("#1E293B")); c.setFont("Helvetica", 13); c.drawCentredString(page_w/2, page_h-164, "Certificamos que")
    c.setFont("Helvetica-Bold", 25); c.setFillColor(colors.HexColor("#0E2F4F")); c.drawCentredString(page_w/2, page_h-202, name[:70])
    c.setFillColor(colors.HexColor("#334155")); c.setFont("Helvetica", 13)
    text = f'concluiu com aproveitamento o treinamento "{course}".'
    c.drawCentredString(page_w/2, page_h-238, text[:112])
    c.setFont("Helvetica-Bold", 12); c.drawCentredString(page_w/2, page_h-270, f"Carga horária: {hours:g} h   ·   Aproveitamento: {score}%   ·   Conclusão: {completed}")
    issuer = "FortixSeg"
    try:
        pdata=json.loads(row.get("payload") or "{}")
        issuer=pdata.get("issuer") or issuer
        responsible=pdata.get("responsibleName") or ""
        role=pdata.get("responsibleRole") or ""
    except Exception:
        responsible=role=""
    c.setFillColor(colors.HexColor("#475569")); c.setFont("Helvetica", 10); c.drawString(64, 80, f"Emitido por: {issuer}")
    if responsible:
        c.drawString(64, 64, f"Responsável: {responsible}{' · '+role if role else ''}")
    c.drawString(64, 48, f"Código de validação: {row.get('certificate_code')}")
    qr = qrcode.QRCode(version=3, box_size=5, border=1)
    qr.add_data(verification_url); qr.make(fit=True)
    qr_img = qr.make_image(fill_color="black", back_color="white")
    qbuf=BytesIO(); qr_img.save(qbuf, format="PNG"); qbuf.seek(0)
    c.drawImage(ImageReader(qbuf), page_w-150, 48, 92, 92, preserveAspectRatio=True, mask='auto')
    c.setFont("Helvetica", 8); c.drawRightString(page_w-58, 38, "Valide este certificado pelo QR Code ou pelo código acima.")
    c.showPage(); c.save(); buf.seek(0)
    return buf.getvalue()


def get_project(project_id: str) -> dict[str, Any]:
    with conn() as c:
        row = c.execute("SELECT * FROM projects WHERE id=?", (project_id,)).fetchone()
    if not row:
        raise HTTPException(404, "Treinamento não encontrado")
    return {
        "id": row["id"], "title": row["title"], "status": row["status"], "filename": row["filename"],
        "sourceDeleted": bool(row["source_deleted"]), "createdAt": row["created_at"], "updatedAt": row["updated_at"],
        "payload": json.loads(row["payload"]),
    }


def text_similarity_for_quality(a: str, b: str) -> float:
    return SequenceMatcher(None, " ".join(str(a).lower().split()), " ".join(str(b).lower().split())).ratio()


def validate_payload_shape(payload: dict[str, Any]) -> None:
    """Reject structurally broken editor payloads before they can corrupt a local project."""
    if not isinstance(payload, dict):
        raise HTTPException(422, "Payload do treinamento inválido.")
    modules = payload.get("modules")
    if not isinstance(modules, list):
        raise HTTPException(422, "A lista de módulos é inválida.")
    if not modules:
        raise HTTPException(422, "O treinamento precisa possuir ao menos um módulo.")
    if len(modules) > 250:
        raise HTTPException(422, "Quantidade de módulos acima do limite de segurança.")
    module_ids: list[str] = []
    topic_ids: list[str] = []
    for mi, m in enumerate(modules, 1):
        if not isinstance(m, dict):
            raise HTTPException(422, f"Módulo {mi} inválido.")
        mid=str(m.get("id") or "").strip()
        if not mid: raise HTTPException(422, f"Módulo {mi} sem identificador interno.")
        module_ids.append(mid)
        topics=m.get("topics", [])
        if not isinstance(topics, list):
            raise HTTPException(422, f"Tópicos do módulo {mi} inválidos.")
        if len(topics) > 300:
            raise HTTPException(422, f"Módulo {mi} possui tópicos demais.")
        for ti,t in enumerate(topics,1):
            if not isinstance(t,dict): raise HTTPException(422,f"Tópico {ti} do módulo {mi} inválido.")
            tid=str(t.get("id") or "").strip()
            if not tid: raise HTTPException(422,f"Tópico {ti} do módulo {mi} sem identificador interno.")
            topic_ids.append(tid)
    if len(module_ids)!=len(set(module_ids)):
        raise HTTPException(422,"Há identificadores de módulo duplicados. Recarregue o projeto antes de salvar.")
    if len(topic_ids)!=len(set(topic_ids)):
        raise HTTPException(422,"Há identificadores de tópico duplicados. Recarregue o projeto antes de salvar.")
    valid_modules=set(module_ids); valid_topics=set(topic_ids)
    question_ids=[]
    for key in ("questions", "moduleQuizzes"):
        items=payload.get(key,[])
        if not isinstance(items,list): raise HTTPException(422,f"Campo {key} inválido.")
        if len(items)>1000: raise HTTPException(422,f"Campo {key} excede o limite de segurança.")
        for qi,q in enumerate(items,1):
            if not isinstance(q,dict): raise HTTPException(422,f"Questão {qi} em {key} inválida.")
            qid=str(q.get("id") or "").strip()
            if not qid: raise HTTPException(422,f"Questão {qi} em {key} sem identificador interno.")
            question_ids.append(qid)
            mid=str(q.get("moduleId") or "")
            if mid not in valid_modules: raise HTTPException(422,f"Questão {qi} em {key} aponta para módulo inexistente.")
            tid=str(q.get("topicId") or "").strip()
            if tid and tid not in valid_topics: raise HTTPException(422,f"Questão {qi} em {key} aponta para tópico inexistente.")
            if tid:
                owner=next((str(mm.get("id")) for mm in modules if any(str(tt.get("id"))==tid for tt in mm.get("topics",[]))),None)
                if owner and owner != mid: raise HTTPException(422,f"Questão {qi} em {key} cruza conteúdo de módulos diferentes.")
            opts=q.get("options")
            if not isinstance(opts,list) or not 2<=len(opts)<=6: raise HTTPException(422,f"Questão {qi} em {key} possui alternativas inválidas.")
            if any(not str(x).strip() for x in opts): raise HTTPException(422,f"Questão {qi} em {key} possui alternativa vazia.")
            idx=q.get("correctIndex")
            if not isinstance(idx,int) or not 0<=idx<len(opts): raise HTTPException(422,f"Questão {qi} em {key} possui resposta correta inválida.")
    if len(question_ids)!=len(set(question_ids)):
        raise HTTPException(422,"Há identificadores de questão duplicados.")
    source_pages=payload.get("sourcePages",[])
    if not isinstance(source_pages,list): raise HTTPException(422,"Campo sourcePages inválido.")
    page_nums=[]
    for item in source_pages:
        if not isinstance(item,dict): raise HTTPException(422,"Há página-fonte inválida.")
        try: n=int(item.get("page"))
        except Exception: raise HTTPException(422,"Há numeração de página-fonte inválida.")
        if n<1: raise HTTPException(422,"Há numeração de página-fonte inválida.")
        page_nums.append(n)
    if len(page_nums)!=len(set(page_nums)): raise HTTPException(422,"Há páginas-fonte duplicadas.")


def quality_check(payload: dict[str, Any]) -> dict[str, Any]:
    errors: list[str] = []; warnings: list[str] = []; info: list[str] = []
    mods = payload.get("modules", []); qs = payload.get("questions", []); module_quizzes = payload.get("moduleQuizzes", [])
    module_ids=[str(m.get("id") or "") for m in mods]
    if any(not x for x in module_ids): errors.append("Há módulo sem identificador interno.")
    if len(module_ids) != len(set(module_ids)): errors.append("Há identificadores de módulo duplicados.")
    topic_ids=[]
    topic_to_module={}
    for m in mods:
        for t in m.get("topics", []):
            tid=str(t.get("id") or "")
            topic_ids.append(tid)
            if tid: topic_to_module[tid]=str(m.get("id") or "")
    if any(not x for x in topic_ids): errors.append("Há tópico sem identificador interno.")
    if len(topic_ids) != len(set(topic_ids)): errors.append("Há identificadores de tópico duplicados.")
    valid_modules=set(module_ids); valid_topics=set(topic_ids)
    if not payload.get("title", "").strip(): errors.append("Título do treinamento não definido.")
    if not mods: errors.append("Nenhum módulo disponível.")
    intro_positions=[i for i,m in enumerate(mods) if intro_like_title(m.get("learningTitle") or m.get("title") or "")]
    if intro_positions and intro_positions[0] != 0:
        warnings.append("Há um módulo introdutório fora da primeira posição; revise a ordem pedagógica.")
    for i, m in enumerate(mods, 1):
        if not m.get("title", "").strip(): errors.append(f"Módulo {i} sem título.")
        if not m.get("topics"): errors.append(f"Módulo “{m.get('title','?')}” sem tópicos.")
        if m.get("structureConfidence", 1) < .55: warnings.append(f"Divisão do módulo “{m.get('title','?')}” foi inferida com baixa confiança.")
        if m.get("sourceWordCount", 0) and m.get("sourceWordCount", 0) < 45:
            warnings.append(f"Módulo “{m.get('title','?')}” possui pouco conteúdo textual rastreado e pode precisar ser unido a outro módulo.")
        for t in m.get("topics", []):
            has_content = bool(t.get("content", "").strip() or t.get("visuals"))
            if not has_content: errors.append(f"Tópico “{t.get('title','?')}” sem conteúdo.")
            if t.get("confidence", 1) < .6: warnings.append(f"Tópico “{t.get('title','?')}” com baixa confiança.")
            if not t.get("sourcePages"): warnings.append(f"Tópico “{t.get('title','?')}” sem rastreabilidade de página.")
            ped=t.get("pedagogy") or {}
            if not ped.get("simpleExplanation"): warnings.append(f"Tópico “{t.get('title','?')}” ainda não possui explicação pedagógica em linguagem direta.")
            if not ped.get("learningGoal"): warnings.append(f"Tópico “{t.get('title','?')}” ainda não possui objetivo pedagógico específico.")
            interactions=t.get("interactions") or []
            expects_interaction = (not intro_like_title(m.get("learningTitle") or m.get("title") or "")
                                   and not intro_like_title(t.get("learningTitle") or t.get("title") or "")
                                   and interaction_readiness(t))
            if expects_interaction and not interactions:
                warnings.append(f"Tópico “{t.get('title','?')}” possui conteúdo suficiente, mas ainda não recebeu uma interação pertinente.")
            if intro_like_title(m.get("learningTitle") or m.get("title") or "") and interactions:
                errors.append(f"Módulo introdutório “{m.get('learningTitle') or m.get('title')}” não deve possuir pergunta interativa obrigatória.")
            for iq in interactions:
                opts=iq.get("options",[]); ci=iq.get("correctIndex")
                if ci is None or not isinstance(ci,int) or ci < 0 or ci >= len(opts):
                    errors.append(f"Interação sem resposta correta válida no tópico “{t.get('title','?')}”.")
                    continue
                if len(opts) < 3:
                    warnings.append(f"Interação no tópico “{t.get('title','?')}” possui poucas alternativas.")
                correct = opts[ci] if 0 <= ci < len(opts) else ""
                if correct and teaching_statement_quality(correct) < .15:
                    warnings.append(f"Interação no tópico “{t.get('title','?')}” usa uma resposta-fonte que parece fragmentada; revise o enunciado.")
    quiz_by_module: dict[str, list[dict[str, Any]]] = {}
    option_usage: dict[str,int] = {}
    for mq in module_quizzes:
        mid=str(mq.get("moduleId") or ""); tid=str(mq.get("topicId") or "")
        quiz_by_module.setdefault(mid, []).append(mq)
        if mid not in valid_modules: errors.append(f"Quiz aponta para módulo inexistente: {mq.get('question','?')[:60]}")
        if tid and tid not in valid_topics: errors.append(f"Quiz aponta para tópico inexistente: {mq.get('question','?')[:60]}")
        if tid and topic_to_module.get(tid) and topic_to_module.get(tid) != mid:
            errors.append(f"Quiz cruza conteúdo entre módulos: {mq.get('question','?')[:60]}")
        opts = [str(x).strip() for x in mq.get("options", [])]; ci = mq.get("correctIndex")
        if ci is None or not isinstance(ci, int) or ci < 0 or ci >= len(opts):
            errors.append(f"Pergunta de módulo sem resposta correta válida: {mq.get('question','?')[:70]}")
        if len(opts) < 3 or any(not x for x in opts): warnings.append(f"Quiz possui alternativas incompletas: {mq.get('question','?')[:60]}")
        if len({x.lower() for x in opts if x}) != len([x for x in opts if x]): warnings.append(f"Quiz possui alternativas repetidas: {mq.get('question','?')[:60]}")
        for opt in opts: option_usage[opt.lower()] = option_usage.get(opt.lower(),0)+1
    for m in mods:
        title = m.get("learningTitle") or m.get("title") or ""
        mq = quiz_by_module.get(str(m.get("id") or ""), [])
        budget = module_quiz_budget(m)
        if intro_like_title(title):
            if mq:
                errors.append(f"Módulo introdutório “{title}” não deve possuir quiz ao final.")
        elif budget <= 0:
            if mq:
                warnings.append(f"Módulo curto “{title}” recebeu quiz mesmo sem densidade suficiente; revise se ele é necessário.")
        elif not mq:
            warnings.append(f"Módulo “{title}” possui conteúdo suficiente para até {budget} pergunta(s) de fechamento, mas nenhuma foi gerada.")
        elif len(mq) > budget:
            warnings.append(f"Módulo “{title}” possui perguntas demais para seu tamanho; máximo recomendado: {budget}.")

    if not qs: warnings.append("Nenhuma questão de avaliação configurada.")
    seen_questions: list[str] = []
    module_corrects=[]
    for mq in module_quizzes:
        opts=mq.get("options",[]); ci=mq.get("correctIndex")
        if isinstance(ci,int) and 0<=ci<len(opts): module_corrects.append(str(opts[ci]))
    for q in qs:
        text=str(q.get("question","")).strip(); key=text.lower()
        if any(text_similarity_for_quality(text, old) > .93 for old in seen_questions):
            warnings.append(f"Questão final duplicada ou muito semelhante: {text[:70]}")
        seen_questions.append(text)
        mid=str(q.get("moduleId") or ""); tid=str(q.get("topicId") or "")
        if mid and mid not in valid_modules: errors.append(f"Questão final aponta para módulo inexistente: {text[:60]}")
        if tid and tid not in valid_topics: errors.append(f"Questão final aponta para tópico inexistente: {text[:60]}")
        opts=[str(x).strip() for x in q.get("options",[])]; ci=q.get("correctIndex")
        if ci is None or not isinstance(ci,int) or ci<0 or ci>=len(opts):
            errors.append(f"Questão sem resposta correta válida: {text[:70]}")
            continue
        if len(opts)<3 or any(not x for x in opts): warnings.append(f"Questão final possui alternativas incompletas: {text[:60]}")
        if len({x.lower() for x in opts if x}) != len([x for x in opts if x]): warnings.append(f"Questão final possui alternativas repetidas: {text[:60]}")
        correct=opts[ci]
        if any(text_similarity_for_quality(correct, x)>.94 for x in module_corrects):
            warnings.append(f"A avaliação final repete uma resposta já cobrada no quiz do módulo: {text[:65]}")
        for opt in opts: option_usage[opt.lower()] = option_usage.get(opt.lower(),0)+1
    overused=[x for x,n in option_usage.items() if x and n>=4]
    if overused: warnings.append(f"Há {len(overused)} alternativa(s) reutilizada(s) muitas vezes entre os quizzes; revise a variedade das questões.")
    score=payload.get("passingScore",0)
    if not isinstance(score,(int,float)) or score<=0 or score>100: errors.append("Nota mínima inválida; use um valor de 1 a 100.")
    attempts=payload.get("attempts",1)
    if not isinstance(attempts,(int,float)) or int(attempts)<1: errors.append("Número de tentativas inválido.")
    source = payload.get("source", {})
    if source.get("nativePageMode"):
        source_pages = payload.get("sourcePages", [])
        missing_images = [p.get("page") for p in source_pages if not p.get("imageUrl")]
        if missing_images:
            errors.append(f"Páginas originais sem imagem renderizada: {', '.join(map(str, missing_images[:12]))}.")
        total_expected = int(source.get("pages") or 0)
        if total_expected and len(source_pages) != total_expected:
            errors.append(f"O PDF possui {total_expected} páginas, mas o treinamento preservou {len(source_pages)} páginas.")
        display_pages = [int(n) for m in mods for n in (m.get("displayPages") or m.get("sourcePages") or []) if str(n).isdigit()]
        expected=set(range(1,total_expected+1)) if total_expected else set()
        actual=set(display_pages)
        missing=sorted(expected-actual); invalid=sorted(actual-expected) if expected else []
        duplicates=sorted({n for n in display_pages if display_pages.count(n)>1})
        if missing: errors.append(f"Páginas ausentes no player: {', '.join(map(str,missing[:15]))}.")
        if invalid: errors.append(f"Numeração de página inválida no player: {', '.join(map(str,invalid[:15]))}.")
        if duplicates: warnings.append(f"Há páginas associadas a mais de um módulo: {', '.join(map(str,duplicates[:15]))}.")
        if total_expected and actual==expected and not duplicates:
            info.append(f"Modo PDF nativo: {len(source_pages)} páginas originais preservadas uma única vez no player.")
    if source.get("needsOcr"): warnings.append("O PDF possui baixa extração de texto; considere OCR.")
    analysis = payload.get("analysis", {})
    if analysis.get("coveragePercent",100) < 72: warnings.append(f"Cobertura textual do treinamento em {analysis.get('coveragePercent')}%; confira se partes do PDF ficaram fora do curso.")
    if not analysis.get("agendaDetected"):
        info.append("Estrutura criada por títulos/mudanças de assunto porque não foi encontrado roteiro/sumário.")
        ordering=analysis.get("moduleOrdering") or {}
        if ordering.get("changed"):
            info.append("A ordem pedagógica foi normalizada de forma conservadora: introdução primeiro e prática/encerramento ao final, mantendo rastreabilidade das páginas de origem.")
    else:
        info.append(f"Roteiro/sumário detectado com {len(analysis.get('agendaItems', []))} itens; essa ordem foi preservada como fonte principal.")
    inline=sum(len(t.get("interactions") or []) for m in mods for t in m.get("topics", []))
    info.append(f"{len(mods)} módulos, {len(module_quizzes)} perguntas de fechamento e {len(qs)} questões finais analisados.")
    return {"errors": errors, "warnings": warnings, "info": info, "canPublish": not errors}


@app.get("/", response_class=HTMLResponse)
def home():
    return (STATIC / "index.html").read_text(encoding="utf-8")


@app.get("/api/health")
def health():
    return {"ok": True, "service": "fortix-training-studio", "version": "1.6.0", "engine": "pdf-native-materials-certificates-v160"}


@app.get("/api/projects")
def list_projects():
    with conn() as c:
        rows = c.execute("SELECT id,title,status,filename,source_deleted,created_at,updated_at,payload FROM projects ORDER BY updated_at DESC").fetchall()
    out = []
    for r in rows:
        p = json.loads(r["payload"])
        out.append({
            "id": r["id"], "title": r["title"], "status": r["status"], "filename": r["filename"],
            "sourceDeleted": bool(r["source_deleted"]), "createdAt": r["created_at"], "updatedAt": r["updated_at"],
            "modules": len(p.get("modules", [])), "questions": len(p.get("questions", [])),
        })
    return out


@app.post("/api/projects/upload")
async def upload_project(file: UploadFile = File(...), delete_source_after_extract: bool = Form(True)):
    name = file.filename or "treinamento.pdf"
    if not name.lower().endswith(".pdf"):
        raise HTTPException(400, "Envie um arquivo PDF.")
    project_id = str(uuid.uuid4())
    target = UPLOADS / f"{project_id}.pdf"
    size = 0
    try:
        with target.open("wb") as f:
            while True:
                chunk = await file.read(1024 * 1024)
                if not chunk: break
                size += len(chunk)
                if size > 80 * 1024 * 1024:
                    raise HTTPException(413, "PDF acima do limite de 80 MB.")
                f.write(chunk)
        with target.open("rb") as f:
            if f.read(5) != b"%PDF-":
                raise HTTPException(400, "O arquivo não possui assinatura válida de PDF.")
        try:
            payload = analyze_pdf(target, name, size, project_id, ASSETS)
        except HTTPException:
            raise
        except Exception as e:
            raise HTTPException(400, f"Não foi possível analisar este PDF: {e}")
        title = payload["title"]
        source_path: str | None = str(target)
        source_deleted = 0
        if delete_source_after_extract:
            target.unlink(missing_ok=True); source_path = None; source_deleted = 1
        ts = now_iso()
        with conn() as c:
            c.execute(
                "INSERT INTO projects(id,title,status,filename,source_path,source_deleted,created_at,updated_at,payload) VALUES(?,?,?,?,?,?,?,?,?)",
                (project_id, title, "REVIEW_REQUIRED", name, source_path, source_deleted, ts, ts, json.dumps(payload, ensure_ascii=False)),
            )
        return get_project(project_id)
    except Exception:
        # A failed ingestion must not leave user material or generated assets behind.
        target.unlink(missing_ok=True)
        shutil.rmtree(ASSETS / project_id, ignore_errors=True)
        raise


@app.get("/api/projects/{project_id}")
def project_detail(project_id: str):
    return get_project(project_id)


@app.put("/api/projects/{project_id}")
def update_project(project_id: str, body: ProjectPayload):
    existing = get_project(project_id); payload = body.payload
    validate_payload_shape(payload)
    payload["quality"] = quality_check(payload)
    title = payload.get("title") or existing["title"]
    with conn() as c:
        c.execute("UPDATE projects SET title=?,updated_at=?,payload=? WHERE id=?", (title, now_iso(), json.dumps(payload, ensure_ascii=False), project_id))
    return get_project(project_id)


@app.post("/api/projects/{project_id}/quality")
def run_quality(project_id: str):
    project = get_project(project_id); q = quality_check(project["payload"])
    payload = project["payload"]; payload["quality"] = q
    with conn() as c:
        c.execute("UPDATE projects SET updated_at=?,payload=? WHERE id=?", (now_iso(), json.dumps(payload, ensure_ascii=False), project_id))
    return q


@app.post("/api/projects/{project_id}/publish")
def publish(project_id: str):
    project = get_project(project_id); q = quality_check(project["payload"])
    if not q["canPublish"]:
        raise HTTPException(409, {"message": "Quality gate bloqueou a publicação", "quality": q})
    payload = project["payload"]; payload["quality"] = q; payload["publishedAt"] = now_iso()
    with conn() as c:
        c.execute("UPDATE projects SET status='PUBLISHED',updated_at=?,payload=? WHERE id=?", (now_iso(), json.dumps(payload, ensure_ascii=False), project_id))
    return get_project(project_id)


@app.post("/api/projects/{project_id}/unpublish")
def unpublish(project_id: str):
    get_project(project_id)
    with conn() as c:
        c.execute("UPDATE projects SET status='REVIEW_REQUIRED',updated_at=? WHERE id=?", (now_iso(), project_id))
    return get_project(project_id)



@app.post("/api/projects/{project_id}/materials")
async def upload_material(project_id: str, file: UploadFile = File(...), title: str = Form("")):
    project = get_project(project_id)
    name = file.filename or "material"
    allowed = {".pdf", ".doc", ".docx", ".xls", ".xlsx", ".ppt", ".pptx", ".png", ".jpg", ".jpeg", ".zip"}
    ext = Path(name).suffix.lower()
    if ext not in allowed:
        raise HTTPException(400, "Formato de material não permitido.")
    material_id = str(uuid.uuid4())
    stored = f"{material_id}{ext}"
    target = material_dir(project_id) / stored
    size = 0
    try:
        with target.open("wb") as out:
            while True:
                chunk = await file.read(1024 * 1024)
                if not chunk: break
                size += len(chunk)
                if size > 40 * 1024 * 1024:
                    raise HTTPException(413, "Material acima do limite de 40 MB.")
                out.write(chunk)
        item = {"id":material_id,"title":clean_title if (clean_title:=str(title or "").strip()) else Path(name).stem,"filename":name,"storedFilename":stored,"size":size,"uploadedAt":now_iso()}
        payload = project["payload"]
        payload.setdefault("materials", []).append(item)
        with conn() as c:
            c.execute("UPDATE projects SET updated_at=?,payload=? WHERE id=?", (now_iso(), json.dumps(payload, ensure_ascii=False), project_id))
        return item
    except Exception:
        target.unlink(missing_ok=True)
        raise


@app.get("/api/projects/{project_id}/materials/{material_id}")
def download_material(project_id: str, material_id: str):
    project = get_project(project_id)
    item = find_material(project["payload"], material_id)
    if not item: raise HTTPException(404, "Material não encontrado")
    path = MATERIALS / project_id / str(item.get("storedFilename") or "")
    if not path.exists(): raise HTTPException(410, "Arquivo do material não está mais disponível")
    return FileResponse(path, filename=item.get("filename") or "material")


@app.delete("/api/projects/{project_id}/materials/{material_id}")
def delete_material(project_id: str, material_id: str):
    project = get_project(project_id); payload=project["payload"]
    item = find_material(payload, material_id)
    if not item: raise HTTPException(404, "Material não encontrado")
    (MATERIALS / project_id / str(item.get("storedFilename") or "")).unlink(missing_ok=True)
    payload["materials"]=[m for m in payload.get("materials",[]) if str(m.get("id"))!=str(material_id)]
    with conn() as c:
        c.execute("UPDATE projects SET updated_at=?,payload=? WHERE id=?", (now_iso(), json.dumps(payload, ensure_ascii=False), project_id))
    return {"ok":True}


@app.post("/api/projects/{project_id}/certificates/issue")
def issue_certificate(project_id: str, body: CertificateIssue, request: Request):
    project=get_project(project_id); payload=project["payload"]
    if project["status"] != "PUBLISHED": raise HTTPException(409, "Treinamento ainda não foi publicado")
    if not payload.get("certificate", True): raise HTTPException(409, "Emissão de certificado desativada para este treinamento")
    student=body.student or {}; name=str(student.get("name") or "").strip()
    if len(name)<3: raise HTTPException(422, "Informe o nome completo do aluno")
    questions=payload.get("questions") or []
    if not questions: raise HTTPException(409, "Treinamento sem avaliação final configurada")
    answers=body.answers or {}
    if any(str(q.get("id")) not in answers for q in questions):
        raise HTTPException(409, "Avaliação final incompleta")
    hits=sum(1 for q in questions if int(answers.get(str(q.get("id")),-1)) == int(q.get("correctIndex",-2)))
    score=round((hits/max(1,len(questions)))*100)
    if score < int(payload.get("passingScore") or 70): raise HTTPException(409, "Certificado só pode ser emitido após aprovação")
    doc=str(student.get("document") or "").strip(); email=str(student.get("email") or "").strip().lower()
    identity = doc or email or name.casefold()
    with conn() as c:
        rows=c.execute("SELECT * FROM certificates WHERE project_id=? ORDER BY issued_at DESC",(project_id,)).fetchall()
    for r in rows:
        rp=json.loads(r["payload"] or "{}")
        rid=(r["student_document"] or r["student_email"] or r["student_name"].casefold())
        if rid==identity and int(r["score"])==score:
            code=r["certificate_code"]
            return {"code":code,"downloadUrl":f"/api/certificates/{code}/pdf","verifyUrl":f"/certificates/verify/{code}"}
    cert_id=str(uuid.uuid4()); code="FX-"+uuid.uuid4().hex[:12].upper(); issued=now_iso(); completed=body.completedAt or issued
    settings=payload.get("certificateSettings") or {}
    cert_payload={"issuer":settings.get("issuer") or "FortixSeg","responsibleName":settings.get("responsibleName") or "","responsibleRole":settings.get("responsibleRole") or "","student":student}
    with conn() as c:
        c.execute("""INSERT INTO certificates(id,certificate_code,project_id,student_name,student_document,student_email,student_company,student_role,course_title,workload_hours,score,completed_at,issued_at,payload) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)""",
                  (cert_id,code,project_id,name,doc,email,str(student.get("company") or ""),str(student.get("role") or ""),payload.get("title") or project["title"],float(payload.get("estimatedHours") or 0),score,completed,issued,json.dumps(cert_payload,ensure_ascii=False)))
    return {"code":code,"downloadUrl":f"/api/certificates/{code}/pdf","verifyUrl":f"/certificates/verify/{code}"}


@app.get("/api/certificates/{code}/pdf")
def download_certificate(code: str, request: Request):
    row=certificate_row(code)
    verify_url=str(request.base_url).rstrip("/")+f"/certificates/verify/{code}"
    pdf=certificate_pdf_bytes(row,verify_url)
    filename=safe_filename(f"Certificado-{row.get('student_name')}-{row.get('course_title')}","certificado")+".pdf"
    return Response(content=pdf,media_type="application/pdf",headers={"Content-Disposition":f'attachment; filename="{filename}"'})


@app.get("/certificates/verify/{code}", response_class=HTMLResponse)
def verify_certificate(code: str):
    try: row=certificate_row(code)
    except HTTPException:
        return HTMLResponse("<html><body style='font-family:Arial;padding:40px'><h2>Certificado não encontrado</h2><p>O código informado não consta nesta instalação FortixSeg.</p></body></html>",status_code=404)
    name=html.escape(str(row.get("student_name") or "")); course=html.escape(str(row.get("course_title") or "")); hours=row.get("workload_hours"); score=row.get("score"); completed=html.escape(str(row.get("completed_at") or "")[:10]); safe_code=html.escape(code)
    return HTMLResponse(f"""<!doctype html><html><head><meta charset='utf-8'><meta name='viewport' content='width=device-width'><title>Validar certificado</title></head><body style='margin:0;background:#f4f7fb;font-family:Arial;color:#0f2942'><main style='max-width:720px;margin:60px auto;background:white;padding:36px;border-radius:16px;box-shadow:0 10px 30px #0001'><div style='color:#0a8f5b;font-weight:700'>✓ CERTIFICADO VÁLIDO</div><h1 style='margin:10px 0 24px'>FortixSeg</h1><p><b>Aluno:</b> {name}</p><p><b>Treinamento:</b> {course}</p><p><b>Carga horária:</b> {hours:g} h</p><p><b>Aproveitamento:</b> {score}%</p><p><b>Conclusão:</b> {completed}</p><p><b>Código:</b> {safe_code}</p></main></body></html>""")


@app.get("/api/projects/{project_id}/export")
def export_project(project_id: str):
    project=get_project(project_id)
    safe="".join(c if c.isalnum() or c in "-_" else "-" for c in project["title"])[:70].strip("-") or "treinamento"
    body=json.dumps({"exportedAt":now_iso(),"project":project}, ensure_ascii=False, indent=2)
    return Response(content=body, media_type="application/json; charset=utf-8", headers={"Content-Disposition":f'attachment; filename="{safe}-backup.json"'})

@app.get("/api/projects/{project_id}/pdf")
def source_pdf(project_id: str):
    with conn() as c:
        row = c.execute("SELECT source_path,filename FROM projects WHERE id=?", (project_id,)).fetchone()
    if not row: raise HTTPException(404, "Treinamento não encontrado")
    if not row["source_path"] or not Path(row["source_path"]).exists():
        raise HTTPException(410, "PDF original foi removido após a extração.")
    return FileResponse(row["source_path"], media_type="application/pdf", filename=row["filename"])


@app.delete("/api/projects/{project_id}/source")
def delete_source(project_id: str):
    with conn() as c:
        row = c.execute("SELECT source_path FROM projects WHERE id=?", (project_id,)).fetchone()
        if not row: raise HTTPException(404, "Treinamento não encontrado")
        if row["source_path"]: Path(row["source_path"]).unlink(missing_ok=True)
        c.execute("UPDATE projects SET source_path=NULL,source_deleted=1,updated_at=? WHERE id=?", (now_iso(), project_id))
    return {"ok": True}


@app.delete("/api/projects/{project_id}")
def delete_project(project_id: str):
    with conn() as c:
        row = c.execute("SELECT source_path FROM projects WHERE id=?", (project_id,)).fetchone()
        if not row: raise HTTPException(404, "Treinamento não encontrado")
        if row["source_path"]: Path(row["source_path"]).unlink(missing_ok=True)
        c.execute("DELETE FROM projects WHERE id=?", (project_id,))
    shutil.rmtree(ASSETS / project_id, ignore_errors=True)
    shutil.rmtree(MATERIALS / project_id, ignore_errors=True)
    return {"ok": True}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("server:app", host="127.0.0.1", port=int(os.environ.get("FORTIX_PORT", "8765")), reload=False)
