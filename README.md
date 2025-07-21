# 🔐 Hacker UI Server

A containerized OSINT and pentesting server running on Ubuntu 22.04 LTS, built from an old MacBook Pro.

## 📦 Tech Stack

- **Frontend**: React (Vite)
- **Backend**: Express.js
- **Runtime**: Node.js
- **Containerization**: Docker + Docker Compose
- **Remote Access**: Tailscale

## 🛠️ Tools Included

Inside the Docker container:
- `nmap`: Network scanning and version detection
- `dig`: DNS lookup
- `whois`: Domain owner investigation
- `toutatis`: Username-based OSINT (https://github.com/megadose/toutatis)

## 🌍 Features

- Web UI for easy tool access
- RESTful API to run tools from the frontend
- Accessible from anywhere via Tailscale
- Shared folder support for easy file exchange

## 🚧 Coming Soon

- Login/auth system (username-based or OAuth)
- Multi-user access
- Tool execution history & logs

## 💬 Credits

Built by [Hacker Dad](https://github.com/yourusername) using ChatGPT as a development assistant for planning, debugging, and writing Docker configurations.

## 📸 Screenshot

![Hacker UI Screenshot](./screenshot.png) *(Add your screenshot)*



## 🔗 License

MIT License
