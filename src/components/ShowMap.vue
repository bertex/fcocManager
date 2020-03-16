<template>
  <div id="myMapId" ref="LeafletMap"></div>
</template>

<script>
  import axios from "axios";

  export default {
    name: "LeafletMap",
    props:['sName','sClub','sYear','sCartography'],
    data() {
      return {
        map: null,
      };
    },
    methods: {
      getData() {
        const query  ={
          name: this.$route.query.sName,
          club: this.$route.query.sClub,
          year: this.$route.query.sYear,
          cartography: this.$route.query.sCartography
        };
        const params  ={
          name: this.sName,
          club: this.$route.query.sClub,
          year: this.sYear,
          cartography: this.sCartography
        };
        axios
          .get('http://localhost:3000/api/maps', {params})
          .then(response => {
            console.log(query);
            console.log(params);
            const GeoJson = require ("geojson");
            this.geojson = response.data;
            let showGeoJson =GeoJson.parse (this.geojson, {GeoJSON:'geometry'});
            let myLayer = L.geoJSON(showGeoJson,{
              onEachFeature: function (feature, layer) {
                layer.bindPopup(feature.properties.name + '</br>' + feature.properties.club
                  + '</br>' +feature.properties.cartographer + '</br>' + feature.properties.cartography
                  + '</br>' + feature.properties.year);
              }})
              .addTo(this.map);
          })
          .catch(error => {
            console.log(error);
          });

        this.map =L.map(this.$refs['LeafletMap']).setView([41.50, 1.523], 8,);
        L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
          attribution:
            '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.map);
      }
    },
    mounted() {
      this.getData();
    },
    updated() {
      this.getData();
    },
    beforeDestroy() {
      if (this.map) {
        this.map.remove();
      }
    }
  };
</script>

<style >
  #myMapId {
    width: 100%;
    height: 600px;
  }

</style>
