# Step 1: Build frontend 
FROM node:18-alpine as build-step

WORKDIR /usr/app

COPY React-App/package.json React-App/package-lock.json .

RUN npm install

COPY frontend/src src 
COPY frontend/public public 
RUN npm install

# Step 2: Build backend
FROM python:3.8-slim-buster

WORKDIR /usr/app
COPY --from=build-step /usr/app/build build

COPY backend/requirements.txt .
RUN pip3 install -r requirements.txt

COPY backend/codecraft.py .
COPY backend/response.py .

CMD [ "python3", "-m" , "flask", "run", "--host=0.0.0.0"]


