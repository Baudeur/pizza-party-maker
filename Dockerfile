FROM ubuntu:24.10
WORKDIR /app
COPY ./src ./src
COPY ./public ./public
COPY index.html .
COPY package.json .
COPY postcss.config.js .
COPY tailwind.config.js .
COPY tsconfig.app.json .
COPY tsconfig.json .
COPY tsconfig.node.json .
COPY vite.config.ts .
RUN apt update && \
apt-get install -y nodejs && \
apt-get install -y npm && \
apt-get clean && \
npm install --verbose && \
npm i -g serve && \
npm run build
EXPOSE 3000
CMD [ "serve", "-s", "dist"]