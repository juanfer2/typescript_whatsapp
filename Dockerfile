FROM node:12-alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./

RUN npm install

# add app
COPY . ./
RUN npm run build

RUN ls -la

# start app
CMD ["npm", "start"]
