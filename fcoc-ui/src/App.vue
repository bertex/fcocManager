<template>
  <div id="fcocMaps">
    <b-navbar toggleable="md" type="dark" variant="info">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand id="logo" to="/">
        <b-img src="../public/logofcoc_lletres_costat.png" left thumbnail fluid/>
      </b-navbar-brand>
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-nav-item to="/">Inici</b-nav-item>
          <b-nav-item v-b-modal.modal-cerca>Cercador</b-nav-item>
          <b-modal ref="my-modal" hide-footer id="modal-cerca" title="Cercador de mapes">
              <b-form @submit.prevent="handleSubmit" >
                <b-form-group label="Nom">
                  <b-input id="searchName"
                           v-model="form.name"
                           placeholder="Cercar per nom"
                           type="text"/>
                </b-form-group>
                <b-form-group label="Club">
                  <b-input id="searchClub"
                           v-model="form.club"
                           placeholder="Cercar per club"
                           type="text"/>
                </b-form-group>
                <b-form-group label="Any">
                  <b-input id="searchYear"
                           v-model="form.year"
                           placeholder="Cercar per any "
                           type="text"/>
                </b-form-group>
                <b-form-group label="Cartografia">
                  <b-select id="searchCartography"
                            v-model="form.cartography"
                            :options="carto"
                            placeholder="Cercar per tipus de cartografia"
                            type="text"/>
                </b-form-group>
                <b-button type="submit">Ok</b-button>
              </b-form>
          </b-modal>
          <b-nav-item v-if="!isLoggedIn" to="/login">Log in</b-nav-item>
          <b-nav-item v-if="!isLoggedIn" to="/register">Register</b-nav-item>
          <b-nav-item v-if="isLoggedIn" to="/myMaps">Els meus mapes</b-nav-item>
          <b-nav-item v-if="isLoggedIn"><a @click="logout">Logout</a></b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <router-view></router-view>
    <!-- routes will be rendered here -->
  </div>
</template>

<script>
  export default {
    name: 'fcocMaps',
    data() {
      return {
        form: {
          name: null,
          club: null,
          year: null,
          cartography: null
        },
        carto: [{text: 'Escull una opció', value: null}, 'ISOM 2017', 'ISOM 2010', 'ISOM 2000'],
      }
    },

    computed: {
      isLoggedIn: function () {
        return this.$store.getters.isLoggedIn
      }
    },
    methods: {
      logout: function () {
        this.$store.dispatch('logout')
          .then(() => {
            this.$router.push('/login')
          })
      },
      handleSubmit() {
        this.$router.push({
          name: this.$route.name,
          params: {
            sName: this.form.name,
            sClub: this.form.club,
            sYear: this.form.year,
            sCartography: this.form.cartography
          },
          query: {
            sName: this.form.name,
            sClub: this.form.club,
            sYear: this.form.year,
            sCartography: this.form.cartography
          },
        }).catch();
        this.$refs['my-modal'].hide();
      }
    },

    created: function () {
      this.$http.interceptors.response.use(undefined, function (err) {
        return new Promise(function () {
          if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
            this.$store.dispatch('logout')
          }
          throw err;
        });
      });
    }
  }
</script>
<style>
  #fcocMaps {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  #logo {
    width: 10%;
  }

</style>
