FROM node:12

# Setting working directory. All the path will be relative to WORKDIR
WORKDIR /usr/src/app

# Installing dependencies
COPY package*.json ./
RUN npm install

# Copying source files
COPY . .

ARG APP_ENV=production
ENV APP_ENV=$APP_ENV

# Building app
RUN npm run build

# Running the app
CMD [ "npm", "start" ]
