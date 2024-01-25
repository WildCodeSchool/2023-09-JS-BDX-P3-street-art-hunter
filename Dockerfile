#syntax=docker/dockerfile:1.4
FROM node:20-alpine

WORKDIR /usr/src/app
COPY --link ./package.json ./package-lock.json ./
COPY --link ./backend/package.json ./backend/package-lock.json ./backend/
COPY --link ./frontend/package.json ./frontend/package-lock.json ./frontend/
COPY --link ./frontend/plugins ./frontend/mdb-react-ui-kit-pro-advanced.tgz ./frontend/

RUN npm install

COPY ./ .
