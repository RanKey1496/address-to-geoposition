# Address to Geoposition
_Servicio en NodeJS que busca convertir una dirección a una ubicación en coordenadas

## Comenzando 🚀
Las instrucciones aquí te permitirán obtener una copia del proyecto en funcionamiento en tu máquina local para propósitos de desarrollo y pruebas.
Mira **Instalación 🔧** para conocer como instalar el proyecto.

### Pre-requisitos 📋
_Para realizar la instalación local de debe contar con unos requisitos:_
```
- NodeJS v12+
- NPM
- Postgresql DB
```
_Si se tiene instalado Docker es mucho más fácil, solo se necesita:_
```
- Docker
- docker-compose
```

### Instalación 🔧
Hay dos formas de poner a correr nuestro servicio xmen:
1. Forma tradicional (instaladar todo en el equipo)
2. Docker con docker-compose

#### Forma tradicional 🔧
Para la forma tradicional, debemos tener antes una base de datos en Postgresql.
Primero que todo debemos instalar las dependendencias del proyecto ejecutando:
```
npm install
```
Luego debemos modificar las variables de entorno que se encuentran dentro del archivo _.env.dev_ (development).
Por ultimo para correr nuestro programa solo debemos ejecutar el comando:
```
npm run watch
```
Luego de esto quedará una instancia corriendo en el puerto 3000.
Para probar que todo funciona bien puede hacerse una petición HTTP:
```
GET http://localhost:3000/signup
```

#### Docker y docker-compose 🔧
Para esta forma, debemos tener previamente instalado docker y docker-compose en nuestro equipo.
Luego, lo unico que debemos ejecutar es:
```
docker-compose up
```
De esta manera, se creará una instancia de Postgresql y una de nuestro address-to-geoposition.
Luego de esto quedará una instancia corriendo en el puerto 3000.
Para probar que todo funciona bien puede hacerse una petición HTTP:
```
GET http://localhost:3000/signup
```

## Ejecutando las pruebas ⚙️
En esta ocasión, las pruebas que realizaremos serán unitarias.
Primero debemos instalar los paquetes de npm con el comando:
```
npm install
```
Una vez instalados nuestros paquetes de npm podemos ejecutar las pruebas con:
```
npm test
```

## Endpoints 📦
Para pruebas podemos hacer peticiones a las siguientes URL:
```
POST - http://localhost:3000/signup
POST - http://localhost:3000/login
POST - http://localhost:3000/refresh
GET - http://localhost:3000/converter
```

## ¿Que se hizo?
Se creó un servicio utilizando Express que expone varios endpoints.
```
/signup nos permite crear un usuario en el sistema, además válida que los parametros enviados en el body sean válidos.
```
```
/login nos permite solicitar claves de acceso (token y refresh token)
```
```
/refresh permite solicitar un nuevo token apartir de un token ya existente
```
```
/converter se envía una dirección, ubicación o lugar por medio del query param "address", este valor se consulta en las API de Mapbox, si no se encuentran resultados, entonces se buscaría en la API de Here, en caso de no obtener resultados, retorna un error.
```
Dentro del proyecto se utilizaron varios patrones de diseño, principalmente se utilizó el patrón Strategy, adicional podemos ver el patrón Dependency Injection con Inversify y el patrón Builder para hacer más fácil las pruebas unitarias.

## Construido con 🛠️
* [NodeJS](https://nodejs.org/) - Entorno en tiempo de ejecución multiplataforma
* [Express](https://expressjs.com/) - Framework en nodejs para realizar APIs
* [InversifyJS](https://github.com/inversify/InversifyJS) - Contenedor para inversión de control (IoC)
* [TypeORM](https://typeorm.io/#/) - ORM para conexión a bases de datos
* [Postgresql](https://www.postgresql.org/) - Base de datos relacional
* [Docker](https://www.docker.com/) - Plataforma de contenedorización open-source

## Autores ✒️

* **Jhon Gil Sepulveda** - *Trabajo Inicial* - [rankey1496](https://github.com/rankey1496)

## Licencia 📄

Este proyecto está bajo la Licencia ISC