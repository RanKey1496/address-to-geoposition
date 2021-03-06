# Address to Geoposition
_Servicio en NodeJS que busca convertir una direcci贸n a una ubicaci贸n en coordenadas

## Comenzando 馃殌
Las instrucciones aqu铆 te permitir谩n obtener una copia del proyecto en funcionamiento en tu m谩quina local para prop贸sitos de desarrollo y pruebas.
Mira **Instalaci贸n 馃敡** para conocer como instalar el proyecto.

### Pre-requisitos 馃搵
_Para realizar la instalaci贸n local de debe contar con unos requisitos:_
```
- NodeJS v12+
- NPM
- Postgresql DB
```
_Si se tiene instalado Docker es mucho m谩s f谩cil, solo se necesita:_
```
- Docker
- docker-compose
```

### Instalaci贸n 馃敡
Hay dos formas de poner a correr nuestro servicio xmen:
1. Forma tradicional (instaladar todo en el equipo)
2. Docker con docker-compose

#### Forma tradicional 馃敡
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
Luego de esto quedar谩 una instancia corriendo en el puerto 3000.
Para probar que todo funciona bien puede hacerse una petici贸n HTTP:
```
GET http://localhost:3000/signup
```

#### Docker y docker-compose 馃敡
Para esta forma, debemos tener previamente instalado docker y docker-compose en nuestro equipo.
Luego, lo unico que debemos ejecutar es:
```
docker-compose up
```
De esta manera, se crear谩 una instancia de Postgresql y una de nuestro address-to-geoposition.
Luego de esto quedar谩 una instancia corriendo en el puerto 3000.
Para probar que todo funciona bien puede hacerse una petici贸n HTTP:
```
GET http://localhost:3000/signup
```

## Ejecutando las pruebas 鈿欙笍
En esta ocasi贸n, las pruebas que realizaremos ser谩n unitarias.
Primero debemos instalar los paquetes de npm con el comando:
```
npm install
```
Una vez instalados nuestros paquetes de npm podemos ejecutar las pruebas con:
```
npm test
```

## Endpoints 馃摝
Para pruebas podemos hacer peticiones a las siguientes URL:
```
POST - http://localhost:3000/signup
POST - http://localhost:3000/login
POST - http://localhost:3000/refresh
GET - http://localhost:3000/converter
```

## 驴Que se hizo?
Se cre贸 un servicio utilizando Express que expone varios endpoints.
```
/signup nos permite crear un usuario en el sistema, adem谩s v谩lida que los parametros enviados en el body sean v谩lidos.
```
```
/login nos permite solicitar claves de acceso (token y refresh token)
```
```
/refresh permite solicitar un nuevo token apartir de un token ya existente
```
```
/converter se env铆a una direcci贸n, ubicaci贸n o lugar por medio del query param "address", este valor se consulta en las API de Mapbox, si no se encuentran resultados, entonces se buscar铆a en la API de Here, en caso de no obtener resultados, retorna un error.
```
Dentro del proyecto se utilizaron varios patrones de dise帽o, principalmente se utiliz贸 el patr贸n Strategy, adicional podemos ver el patr贸n Dependency Injection con Inversify y el patr贸n Builder para hacer m谩s f谩cil las pruebas unitarias.

## Construido con 馃洜锔?
* [NodeJS](https://nodejs.org/) - Entorno en tiempo de ejecuci贸n multiplataforma
* [Express](https://expressjs.com/) - Framework en nodejs para realizar APIs
* [InversifyJS](https://github.com/inversify/InversifyJS) - Contenedor para inversi贸n de control (IoC)
* [TypeORM](https://typeorm.io/#/) - ORM para conexi贸n a bases de datos
* [Postgresql](https://www.postgresql.org/) - Base de datos relacional
* [Docker](https://www.docker.com/) - Plataforma de contenedorizaci贸n open-source

## Autores 鉁掞笍

* **Jhon Gil Sepulveda** - *Trabajo Inicial* - [rankey1496](https://github.com/rankey1496)

## Licencia 馃搫

Este proyecto est谩 bajo la Licencia ISC