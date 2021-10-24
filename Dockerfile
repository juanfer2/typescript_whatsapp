FROM node:12-alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./

RUN npm install

# add app
COPY . ./
RUN npm run build
RUN npm run migration-pull-print
RUN npm run prisma-generate

RUN ls -la

# start app
CMD ["npm", "start"]
