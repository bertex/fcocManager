<template>
  <div class="form pt-6">
    <div class="summary text-red" v-if="$v.form.$error">
      Form has errors
    </div>
    <b-form @submit.prevent="submit" @reset="onReset" enctype="multipart/form-data" v-if="!savingSuccessful">
      <b-form-group id="nom-grup" label="Nom" label-for="inputNom" label-align="right"
                    label-cols-sm="3">
        <b-col sm="7">
          <b-form-input
            id="inputNom " type="text"
            name="Nom"
            v-model="$v.form.name.$model"
            placeholder="Nom del mapa"
            :state="validateState('name')"
            aria-describedby="inputNomFeedback"/>
          <b-form-invalid-feedback id="inputNomFeedback">Aquest és un camp obligatori.</b-form-invalid-feedback>
        </b-col>
      </b-form-group>
      <b-form-group id="club-grup" label="Club" label-for="inputClub" label-align="right"
                    label-cols-sm="3">
        <b-col sm="7">
          <b-form-input
            id="inputClub"
            name="club"
            type="text"
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
            v-model="$v.form.year.$model"
            placeholder="Any del mapa"
            :state="validateState('year')"
            aria-describedby="inputYearFeedback"/>
          <b-form-invalid-feedback id="inputYearFeedback">Aquest és un camp obligatorii és numèric
          </b-form-invalid-feedback>
        </b-col>
      </b-form-group>
      <b-form-group label="Fitxer Shp" label-cols-sm="3" label-align="right">
        <b-col sm="7">
          <b-form-file
            placeholder="Escull un fitxer o deixa'l aquí ..."
            drop-placeholder="Escull un fitxer"
            accept=".shp" @change="handleFileUpload($event)"/>
        </b-col>
      </b-form-group>
      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
    <div class="success" v-if="savingSuccessful">
      {{ this.text }}
    </div>
    <div class="success" v-if="apiError">
      {{ this.textError }}
    </div>
  </div>
</template>

<script>

  import {required, numeric, minLength} from "vuelidate/lib/validators";
  import {validationMixin} from "vuelidate";

  const shapefile = require('shapefile');
  import axios from "axios";

  export default {
    mixins: [validationMixin],
    name: "FormComponent",
    data() {
      return {
        form: {
          name: null,
          club: null,
          cartographer: null,
          cartography: null,
          year: null,
          file: null
        },
        carto: [{text: 'Escull una opció', value: null}, 'ISOM 2017', 'ISOM 2010', 'ISOM 2000'],
        data: {
          file: '',
          ziped: ''
        },
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
        year: {required, numeric}
      }
    },
    methods: {
      async submit() {
        this.$v.form.$touch();
        if (this.$v.form.$anyError) {
          return;
        }
        this.form.file = await this.shpToGeoJson();
        console.log(this.form.file.geometry);
        axios
          .post('http://localhost:3000/api/map/create',
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
          ).then(function () {
          console.log('SUCCESS!!');
          this.savingSuccessful = true
        })
          .catch(error => {
            console.log(error);
            this.apiError = true
            this.savingSuccessful = false
          })
          //.finally(() => this.savingSuccessful = true);
      },
      validateState(name) {
        const {$dirty, $error} = this.$v.form[name];
        return $dirty ? !$error : null;
      },
      onReset(evt) {
        evt.preventDefault();
        // Reset our form values
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
    },
    mounted() {
    },
  }
</script>
<!-- SASS styling -->
<style lang="scss">

</style>
