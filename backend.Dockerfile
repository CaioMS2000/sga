FROM node:18-alpine

WORKDIR /app

COPY ./backend .
COPY ./backend/package*.json ./

RUN rm -r node_modules
RUN npm install && \
    npm install net && \
    chmod +x wait.sh

EXPOSE 4000
#CMD ["npm", "run", "dev"]
# CMD ["wait.sh"]