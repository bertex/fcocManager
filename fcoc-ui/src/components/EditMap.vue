<template>
  <div class="form pt-6">
    <b-form @submit.prevent="submit" enctype="multipart/form-data" >
      <b-form-group id="nom-grup" label="Nom" label-for="inputNom" label-align="right"
                    label-cols-sm="3">
        <b-col sm="7">
          <b-form-input
            id="inputNom "
            type="text"
            name="Nom"
            :disabled="!isEditing"
            :class="{view: !isEditing}"
            v-model.trim ="$v.form.name.$model"
            placeholder="Nom del mapa"
            :state="validateState('name')"
            aria-describedby="inputNomFeedback"/>
          <b-form-invalid-feedback id="inputNomFeedback">Aquest és un camp obligatori. Ha de tenir mínim 10 caràcters</b-form-invalid-feedback>
        </b-col>
      </b-form-group>
      <b-form-group id="club-grup" label="Club" label-for="inputClub" label-align="right"
                    label-cols-sm="3">
        <b-col sm="7">
          <b-form-input
            id="inputClub"
            name="club"
            type="text"
            :disabled="!isEditing"
            :class="{view: !isEditing}"
            v-model="$v.form.club.$model"
            placeholder="club"
            :state="validateState('club')"
            aria-describedby="inputClubFeedback"/>
          <b-form-invalid-feedback id="inputClubFeedback">Aquest és un camp obligatori.</b-form-invalid-feedback>
        </b-col>
      </b-form-group>
      <b-form-group id="cartographer-grup" label="Cartograf" label-for="inputCartographer" label-align="right"
                    label-cols-sm="3">
        <b-col sm="7">
          <b-form-input
            id="inputCartographer"
            type="text"
            name="cartographer"
            :disabled="!isEditing"
            :class="{view: !isEditing}"
            v-model="$v.form.cartographer.$model"
            placeholder="Cartograf del mapa"
            :state="validateState('cartographer')"
            aria-describedby="inputCartographerFeedback"/>
          <b-form-invalid-feedback id="inputCartographerFeedback">Aquest és un camp obligatori.
          </b-form-invalid-feedback>
        </b-col>
      </b-form-group>
      <b-form-group id="inputCarography" label="Cartografia" label-for="inputCartography" label-align="right"
                    label-cols-sm="3">
        <b-col sm="7">
          <b-form-select
            id="inputCartograhpy"
            name="cartography"
            :disabled="!isEditing"
            :class="{view: !isEditing}"
            v-model="$v.form.cartography.$model"
            :options="carto"
            :state="validateState('cartography')"
            aria-describedby="inputCartographyFeedback"/>
          <b-form-invalid-feedback id="inputCartographyFeedback">Aquest és un camp obligatori.</b-form-invalid-feedback>
        </b-col>
      </b-form-group>
      <b-form-group id="year-grup" label="Any" label-for="inputYear" label-align="right"
                    label-cols-sm="3">
        <b-col sm="7">
          <b-form-input
            id="inputYear"
            type="text"
            name="year"
            :disabled="!isEditing"
            :class="{view: !isEditing}"
            v-model="$v.form.year.$model"
            placeholder="Any del mapa"
            :state="validateState('year')"
            aria-describedby="inputYearFeedback"/>
          <b-form-invalid-feedback id="inputYearFeedback">Aquest és un camp obligatorii entre 1950 i 2050
          </b-form-invalid-feedback>
        </b-col>
      </b-form-group>
      <b-form-group label="Fitxer Shp" v-if="isEditing" label-cols-sm="3" label-align="right">
        <b-col sm="7">
          <b-form-file
            placeholder="Escull un fitxer o deixa'l aquí ..."
            drop-placeholder="Escull un fitxer"
            accept=".shp" @change="handleFileUpload($event)"/>
        </b-col>
      </b-form-group>
      <b-form-group id="geometry-grup" v-if="!isEditing" label="Geometry" label-for="inputGeometry" label-align="right"
                    label-cols-sm="3">
        <b-col sm="7">
          <b-form-textarea
            id="inputGeometry"
            type="text"
            name="geometry"
            :disabled="!isEditing"
            :class="{view: !isEditing}"
            v-model="form.geometry"/>
        </b-col>
      </b-form-group>
      <b-button variant="success" @click="isEditing = !isEditing" v-if="!isEditing">Edit</b-button>
      <b-button variant="primary" @click="save" v-else-if="isEditing">Save</b-button>
      <b-button variant="danger" v-if="isEditing" @click="cancel">Cancel</b-button>
    </b-form>
  </div>
</template>

<script>
  import {between, minLength, required} from "vuelidate/lib/validators";
  const shapefile = require('shapefile');
  import axios from "axios";
  import {validationMixin} from "vuelidate";

  export default {
    name: "EditMap",
    mixins: [validationMixin],
    props:['id'],
    data() {
      return {
        form: {
          name: null,
          club: null,
          cartographer: null,
          cartography: null,
          year: null,
          file: null,
          geometry:null,
          user: null
        },
        carto: [{text: 'Escull una opció', value: null}, 'ISOM 2017', 'ISOM 2010', 'ISOM 2000'],
        data: {
          file: null,
          ziped: null
        },
        isEditing: false,
      };
    },
    validations: {
      form: {
        name: {required, min: minLength(10)},
        club: {required},
        cartographer: {required},
        cartography: {required},
        year: {required, between: between(1950, 2040)}
      }
    },
    created() {
      this.getMapById()
    },
    methods: {
      async save() {
        this.$v.form.$touch();
        if (this.$v.form.$anyError) {
          return;
        }
        if (this.data.file !== '' && this.data.file !== null){
          this.form.file = await this.shpToGeoJson();
        } else {
          this.form.file = this.form.geometry;
        }
        axios
          .put('http://localhost:3000/api/map/'+this.id,
            {
              name: this.form.name,
              club: this.form.club,
              year: this.form.year,
              cartographer: this.form.cartographer,
              cartography: this.form.cartography,
              file: this.form.file.geometry,
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              },
            }
          ).then(() =>this.$router.push('/myMaps'))
          .catch(error => {
            console.log(error);
          });
        this.isEditing = false;
      },
      getMapById(){
        axios.get('http://localhost:3000/api/map/'+this.id)
          .then(response => {
            this.form= response.data;
            this.cachedForm = Object.assign({}, this.form);
          });
      },
      cancel() {
        this.form = Object.assign({}, this.cachedForm);
        this.isEditing = false;
      },
      validateState(name) {
        const {$dirty, $error} = this.$v.form[name];
        return $dirty ? !$error : null;
      },
      handleFileUpload(event) {
        this.data.file = event.target.files[0];
        let reader = new FileReader();
        reader.addEventListener("load", function () {
          this.data.ziped = reader.result;
        }.bind(this), false);
        if (this.data.file) {
          if (/\.(shp)$/i.test(this.data.file.name)) {
            reader.readAsArrayBuffer(this.data.file);
          }
        }
      },
      async shpToGeoJson() {
        let dummy;
        await shapefile.open(this.data.ziped)
          .then(source => source.read()
            .then(function log(result) {
              if (result.done) return;
              dummy = result.value;
              return source.read().then(log);
            }))
          .catch(error => console.error(error.stack));
        return dummy;
      }

    }
  }
</script>

<style scoped>
  textarea.form-control {
    height: 250px;
  }

</style>
