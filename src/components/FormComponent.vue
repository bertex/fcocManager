<template>
  <div class="form pt-6">
    <div class="summary text-red" v-if="$v.form.$error">
      Form has errors
    </div>
    <form @submit.prevent="submit" enctype="multipart/form-data" v-if="isInitial || isSaving">
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
        <div class="dropbox">
          <input type="file" :name="uploadFieldName" :disabled="isSaving" @change="filesChange($event.target.name, $event.target.files)"
                 accept="image/*" class="input-file">
          <p v-if="isInitial">
            Drag your file(s) here to begin<br> or click to browse
          </p>
          <p v-if="isSaving">
            Uploading  files...
          </p>
        </div>
      </div>
      <div class="text-center">
        <button type="submit" class="button">
          Submit
        </button>
      </div>
    </form>
  </div>
</template>

<script>
  import {required, email, minLength} from "vuelidate/lib/validators";
  //import {upload}  from 'file-upload.service';
  import axios from "axios";
  let shp = require('gtran-shapefile');

  const STATUS_INITIAL = 0, STATUS_SAVING = 1, STATUS_SUCCESS = 2, STATUS_FAILED = 3;

  module.exports={
    name: "FormComponent",

    data() {
      return {
        form: {
          name: "",
          club: "",
          cartographer: "",
          cartography: "",
          year: "",
          uploadedFiles: [],
          uploadError: null,
          currentStatus: null,
          uploadFieldName: 'photos'

        }
      };
    },
    computed: {
      isInitial() {
        return this.currentStatus === STATUS_INITIAL;
      },
      isSaving() {
        return this.currentStatus === STATUS_SAVING;
      },
      isSuccess() {
        return this.currentStatus === STATUS_SUCCESS;
      },
      isFailed() {
        return this.currentStatus === STATUS_FAILED;
      }
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
      submit() {
        this.$v.form.$touch();
        if (this.$v.form.$error) return
        // to form submit after this
        alert('Form submitted')
      },
      reset() {
        // reset form to initial state
        this.currentStatus = STATUS_INITIAL;
        this.uploadedFiles = [];
        this.uploadError = null;
      },
      save(formData) {
        // upload data to the server
        this.currentStatus = STATUS_SAVING;

        /*upload(formData)
          .then(x => {
            this.uploadedFiles = [].concat(x);
            this.currentStatus = STATUS_SUCCESS;
          })
          .catch(err => {
            this.uploadError = err.response;
            this.currentStatus = STATUS_FAILED;
          });*/
      },
      filesChange(fieldName, fileList) {
        // handle file changes
        const formData = new FormData();

        if (!fileList.length) return;

        // append the files to FormData
        Array
          .from(Array(fileList.length).keys())
          .map(x => {
            formData.append(fieldName, fileList[x], fileList[x].name);
          });

        // save it
        this.save(formData);
      }
    },
    mounted() {
      this.reset();
    },


  };
</script>
<!-- SASS styling -->
<style lang="scss">
  .dropbox {
    outline: 2px dashed grey; /* the dash box */
    outline-offset: -10px;
    background: lightcyan;
    color: dimgray;
    padding: 10px 10px;
    min-height: 200px; /* minimum height */
    position: relative;
    cursor: pointer;
  }

  .input-file {
    opacity: 0; /* invisible but it's there! */
    width: 100%;
    height: 200px;
    position: absolute;
    cursor: pointer;
  }

  .dropbox:hover {
    background: lightblue; /* when mouse over to the drop zone, change color */
  }

  .dropbox p {
    font-size: 1.2em;
    text-align: center;
    padding: 50px 0;
  }
</style>
