FROM node:20.8
COPY package.json /app/
COPY tsconfig.json /app/
COPY tsconfig.node.json /app/
COPY vite.config.ts /app/
COPY index.html /app/
COPY src /app/src/
WORKDIR /app
RUN npm i
CMD ["npm", "run", "start"]
