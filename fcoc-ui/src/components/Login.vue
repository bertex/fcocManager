<template>
  <div>
    <b-form class="login" @submit.prevent="login">
      <h1>Sign in</h1>
      <b-form-group id="Nom-grup" label="Email" label-for="LoginEmail" label-align="right"
                    label-cols-sm="3">
        <b-col sm="7">
          <b-input required
                   id="loginEmail"
                   v-model="email"
                   type="text"
                   placeholder="Nom d'usuari"
                   aria-describedby="inputYearFeedback"
          />
          <b-form-invalid-feedback id="inputYearFeedback">Aquest és un camp obligatorii
          </b-form-invalid-feedback>
        </b-col>
      </b-form-group>
      <b-form-group id="pass-grup" label="Password" label-for="loginPass" label-align="right"
                    label-cols-sm="3">

        <b-col sm="7">
          <b-input required
                   id="loginPass"
                   v-model="password"
                   type="password"
                   placeholder="Password"
                   aria-describedby="inputYearFeedback"
          />
          <b-form-invalid-feedback id="inputYearFeedback">Aquest és un camp obligatorii
          </b-form-invalid-feedback>
        </b-col>
      </b-form-group>
      <b-button type="submit" variant="primary">Login</b-button>
    </b-form>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        email: "",
        password: ""
      }
    },
    methods: {
      login: function () {
        let username = this.email;
        let password = this.password;
        this.$store.dispatch('login', {username, password})
          .then(() => this.$router.push('/myMaps'))
          .catch(err => console.log(err))
      }
    }
  }
</script>
