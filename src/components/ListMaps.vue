<template>
  <div class='col-sm-6 col-sm-offset-3'>
    <h1>Llistat de mapes</h1>
    <b-button to="/form" variant="primary">
      <b-icon icon="plus" />
      Nou mapa
    </b-button>
    <b-table striped responsive=" md" hover :fields="fields" :items="items">
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
  import axios from "axios";

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
        items: [],
      }
    },
    mounted: function () {
      this.getMyMaps();
    },
    methods: {

      getMyMaps() {
        //console.log(this.route.params.id);
        axios.get('http://localhost:3000/api/map')
          .then(res => {
            this.items = res.data;
          })
      },
      onEdit: function (event) {
        console.log(event);
        console.log(this.$store.state.user);
        console.log(this.$store.state.token);
      },
      onDelete: function (event) {
        axios.delete('http://localhost:3000/api/map/' + event, {
          headers: {
            'Authorization': ` ${this.$store.state.token}`
          }
        })
          .then(function () {
            console.log('SUCCESS!!');
          })
          .catch(error => {
            console.log(error);
          })
      }
    }
  }
</script>

<style scoped>

</style>
