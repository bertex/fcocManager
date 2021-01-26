# Fcoc Gestor de MApes

Aquesta és la interfície UI per a poder visualitzar mapes (per a tothom) i si estàs autenticat en pots fer CRUD de mapes


## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run serve

# build for production with minification
npm run build

```
####Si volem arrencar UI amb Docker
```
cd fcoc-ui
docker build -t fcoc-ui-img .
docker run -p 8080 --name fcoc-ui fcoc-ui-img
```
