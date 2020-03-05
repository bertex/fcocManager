<template>
  <div id="myMapId" ref="LeafletMap"></div>
</template>

<script>
  import axios from "axios";

  export default {
    name: "LeafletMap",
    data() {
      return {
        map: null
      };
    },
    mounted() {
      axios
        .get('http://localhost:3000/api/maps')
        .then(response => {
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
    width: 800px;
    height: 600px;
  }

</style>
