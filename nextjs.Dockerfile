FROM node:20-alpine

WORKDIR /app

#COPY ./frontend/package*.json ./
COPY ./frontend .
RUN rm -r node_modules && \
    npm install
#RUN npm run build


EXPOSE 3000
#CMD ["npm", "run", "start"]