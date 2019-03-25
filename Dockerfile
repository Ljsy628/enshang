FROM node:latest
ADD . /app
RUN cd /app && npm install && pwd && ls && npm run build && npm install http-server -g
ENTRYPOINT /app/entrypoint.sh
