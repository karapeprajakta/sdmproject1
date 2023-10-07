FROM node:12
WORKDIR /app
COPY package.json /app
RUN npm install
RUN npm install express
COPY . /app
CMD node server.js
EXPOSE 8000
