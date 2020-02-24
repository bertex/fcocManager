<template>
  <div>
    <h1>Register</h1>
    <b-form @submit.prevent="register">
      <b-form-group id="registerNomGroup" label="Nom" label-for="registerNom" label-align="right"
                    label-cols-sm="3">
        <b-col sm="7">
          <b-input required autofocus
                   id="registerNom"
                   type="text"
                   v-model="name"
                   placeholder="Nom"
                   aria-describedby="inputYearFeedback"/>
          <b-form-invalid-feedback id="inputYearFeedback">Aquest és un camp obligatorii
          </b-form-invalid-feedback>
        </b-col>
      </b-form-group>
      <b-form-group id="registerEmailGroup" label="Email" label-for="registerEmail" label-align="right"
                    label-cols-sm="3">
        <b-col sm="7">
          <b-input required
                   id="registerEmail"
                   type="email"
                   v-model="email"
                   placeholder="Correu "
                   aria-describedby="inputYearFeedback"/>
          <b-form-invalid-feedback id="inputYearFeedback">Aquest és un camp obligatorii
          </b-form-invalid-feedback>
        </b-col>
      </b-form-group>
      <b-form-group id="registerPassGroup" label="Password" label-for="registerPass" label-align="right"
                    label-cols-sm="3">
        <b-col sm="7">
          <b-input required
                   id="registerPass"
                   type="password"
                   v-model="password"
                   placeholder="password"
                   aria-describedby="inputYearFeedback"/>
          <b-form-invalid-feedback id="inputYearFeedback">Aquest és un camp obligatorii
          </b-form-invalid-feedback>
        </b-col>
      </b-form-group>
      <b-form-group id="registerConfirmGroup" label="Confirma password" label-for="registerConfirm" label-align="right"
                    label-cols-sm="3">
        <b-col sm="7">
          <b-input required
                   id="registerConfirm"
                   type="password"
                   v-model="password_confirmation"
                   placeholder="Repeteix password"
                   aria-describedby="inputYearFeedback"/>
          <b-form-invalid-feedback id="inputYearFeedback">Aquest és un camp obligatorii
          </b-form-invalid-feedback>
        </b-col>
      </b-form-group>
      <b-button type="submit" variant="primary">Register</b-button>
    </b-form>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        name: "",
        email: "",
        password: "",
        password_confirmation: ""
      }
    },
    methods: {
      register: function () {
        let data = {
          username: this.name,
          email: this.email,
          password: this.password,
        };
        this.$store.dispatch('register', data)
          .then(() => this.$router.push('/'))
          .catch(err => console.log(err))
      }
    }
  }
</script>
