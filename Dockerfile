FROM node:18.3 AS builder

# Copy the client source code
COPY client /app/client

WORKDIR /app/client

# Install client dependencies
RUN npm install

# Build the client
RUN npm run build


FROM node:18.3 AS server


WORKDIR /app

# Copy the built client from the 'builder' stage to the 'server' stage
COPY --from=builder /app/client/build ./client/build

# Create the server directory
WORKDIR /app/server

# Copy the server source code
COPY server /app/server

WORKDIR /app/server

# Install server dependencies
RUN npm install

# Specify the command to start the server
CMD ["npm", "start"]
