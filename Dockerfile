FROM node:12-alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./

RUN npm install
RUN ls -la

# add app
COPY . ./

# start app
CMD ["npm", "build"]
CMD ["npm", "start"]
