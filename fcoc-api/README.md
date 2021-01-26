### Això s'executa només el primer cop
#####Crear una  imatge docker
```
cd fcoc-api
docker volume create pgdata
docker run --name fcocDB -e POSTGRES_PASSWORD=Xungo-1 -d -p 5432:5432 -v fcoc-pgdata:/var/lib/postgresql/data postgis/postgis
docker start fcocDB
```
#####Comandes per crear BD
```
docker exec -it fcocDB bash
# psql -U postgres
$ CREATE DATABASE fcocmapes;
```
### Això ho executem cada cop que arrenquem la DB
#####Inicialitzem la DB
```
sequelize db:migrate
sequelize db:sedd all
```
### Això ho executem per posar en marxa Api sense docker
#####Executem api
 ```
cd fcoc-api
node server.js
```
#### Si volem arrencar api amb docker
```
cd fcoc-api
docker build -t fcoc-api-img .
docker run -p 3000 --name fcoc-api fcoc-api-img
```

