<template>
  <div class="form pt-6">
    <b-form @submit.prevent="submit" @reset="onReset" enctype="multipart/form-data" v-if="!savingSuccessful">
      <b-form-group id="nom-grup" label="Nom" label-for="inputNom" label-align="right"
                    label-cols-sm="3">
        <b-col sm="7">
          <b-form-input
            id="inputNom "
            type="text"
            name="Nom"
            :disabled="!isEditing"
            :class="{view: !isEditing}"
            v-model="form.name"
            placeholder="Nom del mapa"

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
            v-model="form.club"
            placeholder="club"

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
            v-model="form.cartographer"
            placeholder="Cartograf del mapa"

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
            v-model="form.cartography"
            :options="carto"

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
            v-model="form.year"
            placeholder="Any del mapa"

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
      <b-button variant="success"@click="isEditing = !isEditing" v-if="!isEditing">Edit</b-button>
      <b-button variant="primary"@click="save" v-else-if="isEditing">Save</b-button>
      <b-button variant="danger"v-if="isEditing" @click="cancel">Cancel</b-button>
    </b-form>
  </div>
</template>

<script>
  import {between, minLength, required} from "vuelidate/lib/validators";
  const shapefile = require('shapefile');
  import axios from "axios";

  export default {
    name: "EditMap",
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
        text: " Mapa inserit de forma correcte",
        textError: "no s'ha pogut insertar el mapa.",
        savingSuccessful: false,
        apiError: false,
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
    mounted() {
      axios.get('http://localhost:3000/api/map/'+this.id)
        .then(response => {
          this.form= response.data;
          console.log(this.form);
          this.cachedForm = Object.assign({}, this.form);
        });

    },
    methods: {
      async save() {

        if (this.data.file !== '' && this.data.file !== null){
          this.form.file = await this.shpToGeoJson();
        } else {
          this.form.file = this.form.geometry;
        }
        console.log(this.form);
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
          ).then(() => this.savingSuccessful = true)
          .catch(error => {
            console.log(error);
          });
        this.isEditing = false;
      },
      cancel() {
        this.form = Object.assign({}, this.cachedForm);
        this.isEditing = false;
      },
      //validateState(name) {
      //  const {$dirty, $error} = this.$v.form[name];
      //  return $dirty ? !$error : null;
      //},
      onReset(evt) {
        this.form.name = null;
        this.form.club = null;
        this.form.cartography = null;
        this.form.cartographer = null;
        this.form.year = null;
        this.form.file = null;
        // Trick to reset/clear native browser form validation state
        this.savingSuccessful = true;
        this.$nextTick(() => {
          this.savingSuccessful = false;
          this.$v.$reset();
        })
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
