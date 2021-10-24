FROM node:12-alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./

RUN npm install

# add app
COPY . ./
# RUN npm run migration-pull-print
RUN npm run prisma-generate
RUN npm run build

# Validate Files
RUN ls -la

# start app
CMD ["npm", "start"]
