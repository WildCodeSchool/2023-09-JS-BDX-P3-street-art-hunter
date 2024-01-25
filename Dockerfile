# Dockerfile backend
FROM node:18

WORKDIR /usr/src/app
COPY ./package.json ./package-lock.json .
COPY ./backend/package.json ./backend/package-lock.json ./backend
COPY ./frontend/package.json ./frontend/package-lock.json ./frontend/mdb-react-ui-kit-pro-advanced.tgz ./frontend
COPY ./frontend/plugins ./frontend/

RUN npm install

COPY ./ .
