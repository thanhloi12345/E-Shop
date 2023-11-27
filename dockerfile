FROM node:18-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN chown -r node:node /app/node_modules
RUN npx prisma generate 
RUN npm i sharp
RUN npm run build

EXPOSE 3000
USER node
CMD ["npm", "start"]