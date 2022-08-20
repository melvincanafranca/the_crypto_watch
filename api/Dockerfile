FROM python:3.10.5-alpine

WORKDIR /app
ADD . /app/

RUN apk update && apk add python3-dev \
gcc \
g++ \
libc-dev \
libffi-dev

RUN pip install ir requirements.txt

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0"]