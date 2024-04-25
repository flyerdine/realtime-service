FROM node:16-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install -g pm2

RUN echo "Installing Node modules..."
RUN npm install --only=production

# Bundle app source
COPY . .

RUN echo "Starting service at on port 3000.."
EXPOSE 3000

ENTRYPOINT ["pm2-runtime", "process.json"]