# REST SERVER

## Configuración de proyecto

Instalación de dependencias
- Docker (Opcional) [Documentación](https://docs.docker.com/engine/install/)
- PostgreSQL 15 (Opcional) [Documentación](https://www.postgresql.org/download/)
- Node JS Versión 22.3 (Requerido) [Documentación](https://nodejs.org/en/download/package-manager/)
- Prisma (Requerido) [Documentación](https://www.prisma.io/docs/getting-started?_gl=1*3lzlv3*_up*MQ..*_gs*MQ..)


1. Instalar las dependencias de node
```
  npm i
```
2. Crear el archivo `.env` a partir de `.env.template`
3. Iniciar proyecto
```
  npm run dev
```
4. Levantar base de datos mediante docker
* importante solo ejecutar el comando si se esta haciendo uso de docker, si no deseas trabajar con docker omitir este paso
```
  docker compose up -d
```


# Generación de certificado SSL
```
  openssl req -x509 -sha256 -nodes -days 365 -newkey rsa:2048 -keyout server.key -out server.crt
```