<template>
  <div id="mapContainer"></div>
</template>

<script>
  import "leaflet/dist/leaflet.css";
  import L from "leaflet";
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
        .get('http://localhost:3000/api/map')
        .then(response => {
          const GeoJson = require ("geojson");
          this.geojson = response.data;
          console.log(this.geojson);
          let showGeoJson =GeoJson.parse (this.geojson, {GeoJSON:'geometry'});
          let myLayer = L.geoJSON(showGeoJson ).addTo(this.map);
        })
        .catch(error => {
          console.log(error)
          this.errored = true
        });
      this.map = L.map("mapContainer").setView([41.50, 1.523], 8);
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

<style scoped>
  #mapContainer {
    width: 100vw;
    height: 100vh;
  }
</style>
