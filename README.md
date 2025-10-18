# [![Backend CI](https://github.com/migbara/proyecto_mvp/actions/workflows/backend-ci.yml/badge.svg)](https://github.com/migbara/proyecto_mvp/actions/workflows/backend-ci.yml)
# [![Frontend CI](https://github.com/migbara/proyecto_mvp/actions/workflows/frontend-ci.yml/badge.svg)](https://github.com/migbara/proyecto_mvp/actions/workflows/frontend-ci.yml)
# Proyecto MVP - Fullstack example

Este repositorio es un scaffold didáctico para explorar prácticas de arquitectura y herramientas de desarrollo en un proyecto fullstack mínimo. Tiene dos aplicaciones dentro de un mismo repositorio (monorepo): el `frontend` (página estática con botones para incrementar/decrementar un contador) y el `backend` (API en Node.js + Express, persistencia en MariaDB).

Principales objetivos:

- Proveer un ejemplo sencillo de integración entre frontend y backend
- Enseñar uso de Docker y `docker-compose` para desarrollo y producción
- Mostrar cómo configurar CI/CD con GitHub Actions para pipelines independientes por carpeta
- Tener pruebas automáticas (Jest + supertest para backend)
- Proveer una colección de Postman con la documentación de la API
- Incluir integración con Jira (documentación de ejemplo en `docs/JIRA.md`)

Estructura relevante

- `backend/` - Node.js + Express + Sequelize (MariaDB). Pruebas con Jest+supertest.
- `frontend/` - HTML/CSS/JS (estática). Peticiones al backend mediante fetch.
- `docker-compose.yml` - Orquestra servicios: mariadb, phpmyadmin, backend, frontend.
- `.github/workflows/` - Workflows de GitHub Actions: pipelines separados para `backend` y `frontend`.
- `postman/collection.json` - Colección con los endpoints documentados.
- `docs/JIRA.md` - Guía rápida para crear proyecto y tareas en Jira.

## Requisitos previos

- Git
- Docker y docker-compose (para el entorno de desarrollo y producción con contenedores)
- Node.js 18+ (para desarrollo local de frontend/backend)
- npm

## Guía rápida — Desarrollo local (sin Docker)

1) Clona el repositorio

```bash
git clone <tu-repo-url> proyecto-mvp
cd proyecto-mvp
```

2) Backend

```bash
cd backend
cp .env.example .env        # crea tu fichero .env local con valores reales
npm install
npm run dev                # arranca en modo dev (nodemon)
```

El backend expone endpoints en `http://localhost:3000/api/counter`.

Variables de entorno principales para el backend (ver `backend/.env.example`):
- DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME
- CORS_ORIGIN

3) Frontend

El frontend es una app estática. Puedes abrir `frontend/index.html` directamente en el navegador o servirla desde un servidor local.

Recomendación de desarrollo ligero:

```bash
# desde la raíz
npx http-server frontend -p 8000
# o si tienes live-server / serve
```

El frontend por defecto hace peticiones a `http://localhost:3000` y la configuración CORS del backend está lista para `http://localhost:8000`.

## Ejecutar tests

Backend (desde carpeta `backend`):

```bash
cd backend
npm test
```

## CI/CD — GitHub Actions (monorepo)

Hemos configurado workflows separados en `.github/workflows/`:

- `backend-ci.yml`: Se dispara cuando hay cambios en `backend/**`. Ejecuta tests y, en `main`, construye y publica una imagen Docker y realiza un despliegue remoto vía SSH.
- `frontend-ci.yml`: Se dispara cuando hay cambios en `frontend/**`. Ejecuta build/tests y, en `main`, publica la imagen Docker y despliega.

Cómo funcionan:

- Cada workflow usa `paths` para ejecutarse solo si hay cambios en la carpeta correspondiente.
- En `main`, tras pasar los tests, se hace `docker build` y `docker push` (requiere secrets de Docker Hub o registro privado).
- El despliegue se realiza por SSH (acción `appleboy/ssh-action`) que ejecuta `docker-compose pull` y `docker-compose up -d` en el servidor de producción.

Secrets necesarios en GitHub Actions (añadir en Settings -> Secrets):

- DOCKER_USERNAME
- DOCKER_PASSWORD
- PROD_HOST (IP o host del servidor de producción)
- PROD_USERNAME
- SSH_PRIVATE_KEY (clave privada con acceso al servidor)

## Despliegue local con Docker Compose

El `docker-compose.yml` en la raíz arranca los siguientes servicios:
- db (mariadb) con volumen para persistencia
- phpmyadmin (para gestionar la BD)
- backend (imagen construida desde `backend/`)
- frontend (imagen para servir los archivos estáticos)

Ejecutar:

```bash
# desde la raíz del repo
docker-compose up --build
```

Esto iniciará los servicios y los expondrá según la configuración del `docker-compose.yml`.

## Postman

Importa `postman/collection.json` en Postman para ver la documentación y probar los endpoints (GET /api/counter, POST increment, decrement, reset).

## Jira

En `docs/JIRA.md` tienes una guía para crear un proyecto en Jira y ejemplos de issues/tareas para este proyecto (epics, historias, tareas técnicas, despliegue).

## Buenas prácticas y notas

- Mantén `.env` fuera del repositorio (está en `.gitignore`). Subir solo `.env.example`.
- El monorepo facilita cambios que impliquen frontend y backend a la vez, pero los pipelines siguen siendo independientes.
- Ajusta los workflows `backend-ci.yml` y `frontend-ci.yml` para adecuarlos a tu registro Docker y a los comandos de build del frontend (p. ej. si usas un bundler).

## Soporte

Si quieres, puedo:
- Añadir scripts de convenience para construir imágenes y etiquetarlas
- Añadir un Makefile para comandos comunes
- Generar plantillas de GitHub Actions más restrictivas (por ejemplo, usando ambientes de GitHub Deployments)

---

Ediciones y mantenimiento

Este README debe mantenerse actualizado con cambios en las rutas de los servicios, puertos expuestos o variables de entorno.

# Proyecto MVP - Fullstack example

Este repositorio contiene un scaffold para un proyecto fullstack de ejemplo pensado para explorar varias herramientas y arquitecturas: Docker, CI, pruebas, Postman, Jira y despliegue.

Carpeta principal del workspace contiene dos aplicaciones separadas (frontend y backend) y un fichero `docker-compose.yml` para arrancar todo en WSL.

Contenido relevante:

- `backend/` - Node.js + Express + Sequelize (MariaDB)
- `frontend/` - HTML + CSS + JS (estática)
- `docker-compose.yml` - orquesta: mariadb, phpmyadmin, backend, frontend
- `postman/collection.json` - colección de Postman con los endpoints
- `docs/JIRA.md` - instrucciones para crear proyecto y tareas en Jira

Sigue los pasos en `docs` y en los READMEs de cada carpeta para ejecutar y probar localmente.
