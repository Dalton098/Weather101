FROM node:18-alpine
RUN npm i -g pnpm
RUN npm i -g @angular/cli
COPY backend/ backend/
COPY frontend/ frontend/
COPY package.json package.json
COPY pnpm-lock.yaml pnpm-lock.yaml

RUN pnpm install
RUN pnpm build

EXPOSE 3000

CMD ["pnpm", "start"]