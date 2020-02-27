<template>
  <div class='col-sm-6 col-sm-offset-3'>
    <h1>Llistat de mapes</h1>
    <b-icon icon="pencil" variant="success"/>
    <b-icon icon="trash" variant="danger"/>
    <b-table striped hover :fields="fields" :items="items">
      <template v-slot:cell(actions)="row">
        <button @click="onEdit(row.item.id)">
          <b-icon icon="pencil" variant="success"/>
        </button>
        <button @click="onDelete(row.item.id)">
          <b-icon icon="trash" variant="danger"/>
        </button>
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
      },
      onDelete: function (event) {
        axios.delete('http://localhost:3000/api/map/' + event)
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
