# Monorepo - API & React App

Este repositorio contiene dos proyectos:
- **api/** → Backend en Node.js
- **app/** → Frontend en React (Vite)

Ambos servicios se ejecutan con **Docker Compose**.

---

## Requisitos previos 🐳

- [Docker](https://docs.docker.com/get-docker/)  
- [Docker Compose](https://docs.docker.com/compose/)

---

## Estructura del proyecto
  
├── api/ # Backend Node.js  
│ ├── src/  
│ ├── package.json  
│ ├── Dockerfile  
│ └── .env  
│  
├── app/ # Frontend React  
│ ├── src/  
│ ├── package.json  
│ ├── Dockerfile  
│ └── .env  
│  
├── docker-compose.yml  
└── README.md  
  
---

## Levantar los servicios

Desde la raíz del repositorio:  

`sudo docker-compose up -d --build`  

**Esto construirá y levantará:**

api → disponible en http://localhost:3000  
app → disponible en http://localhost:5173  

## Comandos utiles:  

**Ver logs del contenedor:** `sudo docker logs ms-api-files` | `sudo docker logs ms-app-files`  
**Apagar los contenedores:** `sudo docker-compose down`  
**Limpiar contenedores::**  
`
sudo docker container prune -f
sudo docker image prune -af
sudo docker volume prune -f
`  

## Uso de la api:
`cd api`  
`npm install`  
`npm run start`  

**Variables de entorno: .env**  
`
PORT=3000
EXTERNAL_API_URL=https://echo-serv.tbxnet.com
API_KEY=aSuperSecretKey
`  

**Ejecutar test:** `npm run test`  

**Endpoints:**
`curl --location 'http://localhost:3000/v1/files'`  
`curl --location 'http://localhost:3000/v1/files/data'`  

## Uso de la app:
`cd app`  
`npm install`  
`npm run dev`  

`VITE_API_FILES_URL=http://localhost:3000`  
