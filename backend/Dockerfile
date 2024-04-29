# syntax=docker/dockerfile:1

ARG PYTHON_VERSION=3.11
FROM python:${PYTHON_VERSION}-slim as base

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /home/app/backend

COPY . /home/app/backend

RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 4200

CMD uvicorn 'main:app' --reload
