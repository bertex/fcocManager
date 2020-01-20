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
        <div class="dropbox">
          <input type="file" name="uploadFieldName"
                 accept="image/*" class="input-file">
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
  import axios from "axios";
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
      submit() {
        this.$v.form.$touch();
        if (this.$v.form.$error) return
        // to form submit after this
        alert('Form submitted')
      },
    },
    mounted() {
    },
  };
</script>
<!-- SASS styling -->
<style lang="scss">

</style>
