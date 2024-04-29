ARG NODE_VERSION=21.7.3

################################################################################
# Use node image for base image for all stages.
FROM node:${NODE_VERSION} as base

WORKDIR /home/app/frontend

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5005

CMD ["npm", "run", "dev"]