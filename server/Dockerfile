FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5050
CMD ["node", "index.js"]FROM node:18

WORKDIR /app

COPY package*.json ./

# Install server dependencies, including passport-related ones
RUN npm install
RUN npm install passport passport-local express-session bcryptjs

COPY . .

EXPOSE 5050

CMD ["node", "index.js"]
