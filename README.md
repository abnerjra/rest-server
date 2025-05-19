# REST SERVER

1. Instalar las dependencias de node
```
  npm i
```
2. Crear el archivo `.env` a partir de `.env.template`
3. Iniciar proyecto
```
  npm run dev
```


# Generación de certificado SSL
```
  openssl req -x509 -sha256 -nodes -days 365 -newkey rsa:2048 -keyout server.key -out server.crt
```