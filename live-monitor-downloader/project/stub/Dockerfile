FROM node:18-slim

RUN mkdir app
WORKDIR /app
ADD . .


RUN npm install

CMD ["npm", "run", "start"]

EXPOSE 8080
