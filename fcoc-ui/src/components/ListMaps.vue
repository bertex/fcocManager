<template>
  <div class='col-sm-6 col-sm-offset-3'>
    <h1>Llistat de mapes</h1>
    <b-button to="/addMap" variant="primary">
      <b-icon icon="plus" />
      Nou mapa
    </b-button>
    <b-table ref="table" striped responsive=" md" hover :fields="fields" :items="gettermymaps">
      <template v-slot:cell(actions)="row">
        <b-button-group>
          <b-button @click="onEdit(row.item.id)" variant="success">
            <b-icon icon="pencil"/>
          </b-button>
          <b-button @click="onDelete(row.item.id)" variant="danger">
            <b-icon icon="trash"/>
          </b-button>
        </b-button-group>
      </template>
    </b-table>
  </div>
</template>

<script>
 //import axios from "axios";

  export default {
    name: "ListMaps",
    components: {},
    data() {
      return {
        fields: [
          {key: 'name', sortable: true},
          {key: 'club', sortable: true},
          {key: 'cartographer', sortable: true},
          {key: 'cartography', sortable: true},
          {key: 'year', sortable: true},
          'actions'
        ],
        user: null,
      }
    },
    computed:{
      gettermymaps(){
        return this.$store.getters.my_maps
      }
    },
    mounted () {
      this.getMyMaps();
    },
    methods: {
     getMyMaps:function () {
       this.user =  JSON.parse (localStorage.getItem("user"));
       this.$store.dispatch('getMyMaps',this.user)
     },
     onEdit: function (event) {
        this.$router.push('/editMap/'+ event);
     },
     onDelete: function (event) {
        if(confirm("Do you really want to delete?")) {
          this.$store.dispatch('removeMapById',event)
        }
     }
    }
  }
</script>

<style scoped>

</style>
