FROM node:12.18-alpine
ENV NODE_ENV=development
WORKDIR /frontend
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install
COPY . .
EXPOSE ${FRONTEND_PORT}
CMD ["npm", "run", "serve"]
