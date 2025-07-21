# 🧪 Stage 1: Build React frontend
FROM node:20 as client-build
WORKDIR /app
COPY client ./client
RUN cd client && npm install && npm run build

# ⚙️ Stage 2: Build Express backend
FROM node:20
WORKDIR /app

# ✅ Install tools in the final container
RUN apt-get update && \
    apt-get install -y \
    nmap \
    dnsutils \
    whois \
    python3 \
    python3-pip && \
    pip3 install --break-system-packages toutatis


# Copy backend and static frontend
COPY server ./server
COPY --from=client-build /app/client/dist ./server/client

WORKDIR /app/server
RUN npm install

# Expose backend port
EXPOSE 5000

# Run backend
CMD ["node", "index.js"]
