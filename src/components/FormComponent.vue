<template>
  <div class="form pt-6">
    <div class="summary text-red" v-if="$v.form.$error">
      Form has errors
    </div>
    <form @submit.prevent="submit" enctype="multipart/form-data" >
      <div class="flex justify-center my-6">
        <div
          class="px-4"
          :class="{ 'hasError': $v.form.name.$error }">
          <label class="mr-2 font-bold text-grey">Name
            <input type="text" class="input" v-model="form.name">
          </label>
        </div>
        <div
          class="px-4"
          :class="{ 'hasError': $v.form.club.$error }">
          <label class="mr-2 font-bold text-grey">Club
            <input type="text" class="input" v-model="form.club">
          </label>
        </div>
        <div
          class="px-4"
          :class="{ 'hasError': $v.form.cartographer.$error }">
          <label class="mr-2 font-bold text-grey">Cartographer
            <input type="text" class="input" v-model="form.cartographer">
          </label>
        </div>
        <div>
          <label class="mr-2 font-bold text-grey">Cartography
            <select type="integer" class="input" v-model="form.cartography">
              <option disabled value="">Escull una opció</option>
              <option>ISOM 2017</option>
              <option>ISOM 2010</option>
              <option>ISOM 2000</option>
            </select>
          </label>
        </div>
        <div
          class="px-4"
          :class="{ 'hasError': $v.form.year.$error }">
          <label class="mr-2 font-bold text-grey">year
            <input type="text" class="input" v-model="form.year">
          </label>
        </div>
        <div >
          <input type="file" id="file" ref="file" accept=".shp" v-on:change="handleFileUpload()"/>
        </div>
      </div>
      <div class="text-center">
        <button >Submit</button>
      </div>
    </form>
    <form action="http://localhost:3000/api/uploadfile" enctype="multipart/form-data" method="POST">
      <input type="file" name="myFile" />
      <input type="submit" value="Upload a file"/>
    </form>
  </div>
</template>

<script>

  import {required, email, minLength} from "vuelidate/lib/validators";
  import shp from "shpjs";
  //import shapefile from "shapefile";
  import axios from "axios";
  //import  shapefile2geojson from 'shapefile2geojson';
  export default {
    name: "FormComponent",

    data() {
      return {
        form: {
          name: "",
          club: "",
          cartographer: "",
          cartography: "",
          year: "",
          file: ""
        },
        data: {
          file:'',
          ziped:''
        }
        };
      },
  validations: {
    form: {
      name: {required, min: minLength(10)},
      club: {required},
      cartographer: {required},
      cartography: {required},
      year: {required},
    }
  },
    methods: {
      submit(){
        this.$v.form.$touch();
        if (this.$v.form.$error) return;
        console.log(this.data.ziped);
        this.form.file = shp(this.data.file)
          .then(function(a){return a.features});
        console.log(this.form.file);
        /*axios
          .post( 'http://localhost:3000/api/map/create',
          {
            name: this.form.name,
            club: this.form.club,
            year: this.form.year,
            cartographer: this.form.cartographer,
            cartography: this.form.cartography,
            file: this.form.file,
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
          }
        ).then(function(){
          console.log('SUCCESS!!');
        })
          .catch(function(){
            console.log('FAILURE!!');
          });*/
      },
      handleFileUpload(){
        this.data.file = this.$refs.file.files[0];
        let reader  = new FileReader();
        reader.addEventListener("load", function () {
          this.data.ziped = reader.result;
        }.bind(this), false);
        if( this.data.file ){
          if ( /\.(shp)$/i.test( this.data.file.name ) ) {
            reader.readAsDataURL( this.data.file );
          }
        }
      },
    },
    mounted() {
    },
  }
</script>
<!-- SASS styling -->
<style lang="scss">

</style>
