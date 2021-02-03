<template>
  <div id="myMapId" ref="LeafletMap"></div>
</template>

<script>
  import L from "leaflet";

  export default {
    name: "LeafletMap",
    data() {
      return {
        map: null,
        layers: [
          {
            id: 0,
            name: 'mapes',
            active: false,
            features: [],
          },
        ],
        tileLayer:null
      };
    },
    computed: {
      getterAllMaps() {
        return this.$store.getters.all_maps
      }
    },
    mounted() {
      this.getAllMaps();
      let allmaps=this.$store.getters.all_maps;
      this.initMap();
      this.getData(allmaps);
    },
    updated() {
      let allmaps=this.$store.getters.all_maps;
      this.getData(allmaps);
    },
    beforeDestroy() {
      if (this.map) {
        this.map.remove();
      }
    },
    methods: {
      getAllMaps:function () {
        this.$store.dispatch('getAllMaps')
      },
      getData(allmaps) {
        const GeoJson = require("geojson");
        let showGeoJson = GeoJson.parse(allmaps, {GeoJSON: 'geometry'});
        this.layers = L.geoJSON(showGeoJson, {
          onEachFeature: function (feature, layer) {
            layer.bindPopup(feature.properties.name + '</br>' + feature.properties.club
              + '</br>' + feature.properties.cartographer + '</br>' + feature.properties.cartography
              + '</br>' + feature.properties.year);
            }
        })
        .addTo(this.map);
      },
      initMap(){
        this.map =L.map(this.$refs['LeafletMap']).setView([41.50, 1.523], 8,);
        this.tileLayer=L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
          attribution:
            '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.map);
      }
    },

  };
</script>

<style >
  #myMapId {
    width: 100%;
    height: 600px;
  }

</style>
