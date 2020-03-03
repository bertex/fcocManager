<template>
  <div>
    <h1>Register</h1>
    <b-form @submit.prevent="register"  @reset="onReset" v-if="!savingSuccessful" >
      <b-form-group id="registerNomGroup" label="Nom" label-for="registerNom" label-align="right"
                    label-cols-sm="3">
        <b-col sm="7">
          <b-input required autofocus
                   id="registerNom"
                   type="text"
                   v-model.trim="$v.form.name.$model"
                   :state="validateState('name')"
                   placeholder="Nom"
                   aria-describedby="input_name_Feedback"/>
          <b-form-invalid-feedback id="input_name_Feedback"> Aquest camp és obligatori
          </b-form-invalid-feedback>
        </b-col>
      </b-form-group>
      <b-form-group id="registerEmailGroup" label="Email" label-for="registerEmail" label-align="right"
                    label-cols-sm="3">
        <b-col sm="7">
          <b-input required
                   id="registerEmail"
                   type="email"
                   v-model.trim="$v.form.email.$model"
                   :state="validateState('email')"
                   placeholder="Correu "
                   aria-describedby="input_email_Feedback"/>
          <b-form-invalid-feedback id="input_email_Feedback">Aquest camp és obligatori i ha de ser un e-mail vàlid
          </b-form-invalid-feedback>
        </b-col>
      </b-form-group>
      <b-form-group id="registerPassGroup" label="Password" label-for="registerPass" label-align="right"
                    label-cols-sm="3">
        <b-col sm="7">
          <b-input required
                   id="registerPass"
                   type="password"
                   v-model.trim="$v.form.password.$model"
                   :state="validateState('password')"
                   placeholder="password"
                   aria-describedby="input_password_Feedback"/>
          <b-form-invalid-feedback id="input_password_Feedback">Aquest camp és obligatori i ha de tenir minim 6 caràcters
          </b-form-invalid-feedback>
        </b-col>
      </b-form-group>
      <b-form-group id="registerConfirmGroup" label="Confirma password" label-for="registerConfirm" label-align="right"
                    label-cols-sm="3">
        <b-col sm="7">
          <b-input required
                   id="registerConfirm"
                   type="password"
                   v-model.trim="$v.form.password_confirmation.$model"
                   :state="validateState('password_confirmation')"
                   placeholder="Repeteix password"
                   aria-describedby="input_password_confirmation_Feedback"/>
          <b-form-invalid-feedback id="input_password_confirmation_Feedback"> Ha de ser igual que password
          </b-form-invalid-feedback>
        </b-col>
      </b-form-group>
      <b-button type="submit" variant="primary">Register</b-button>
      <p class="typo__p" v-if="submitStatus === 'OK'">Thanks for your submission!</p>
      <p class="typo__p" v-if="submitStatus === 'ERROR'">Please fill the form correctly.</p>
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
  import {required, sameAs, minLength, email} from 'vuelidate/lib/validators';
  import {validationMixin} from "vuelidate";

  export default {
    mixins: [validationMixin],
    data() {
      return {
        form: {
          name: "",
          email: "",
          password: "",
          password_confirmation: ""
        },
        text: " Usuari inserit de forma correcte",
        textError: "no s'ha pogut insertar l'usuari.",
        savingSuccessful: false,
        apiError: false,
        submitStatus: null
      }
    },
    validations: {
      form: {
        name: {required},
        email: {required, email},
        password: {required, minLength: minLength(6)},
        password_confirmation: {sameAsPassword: sameAs('password')}
      }
    },

    methods: {
      register: function () {
        this.$v.form.$touch();
        if (this.$v.$invalid) {
          this.submitStatus = 'ERROR'
        } else {
          this.submitStatus = 'OK';
          let data = {
            username: this.form.name,
            email: this.form.email,
            password: this.form.password,
          };
          this.$store.dispatch('register', data)
            .then(() => this.savingSuccessful = true)
            .catch(err => {
              console.log(err);
              this.apiError = true;
              this.savingSuccessful = false;
            })
        }
      },
      validateState(name) {
        const {$dirty, $error} = this.$v.form[name];
        return $dirty ? !$error : null;
      },
      onReset(evt) {
        evt.preventDefault();
        // Reset our form values
        this.form.name = null;
        this.form.email = null;
        this.form.password = null;
        this.form.password_confirmation = null;
        // Trick to reset/clear native browser form validation state
        this.savingSuccessful = true;
        this.$nextTick(() => {
          this.savingSuccessful = false;
          this.$v.$reset();
        })
      },
    }
  }
</script>
