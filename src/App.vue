<template>
  <div id="fcocMaps">
    <b-navbar toggleable="md" type="dark" variant="dark">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand to="/">FCOC Gestor de Mapes</b-navbar-brand>
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-nav-item to="/">Inici</b-nav-item>
          <b-nav-item v-if = "!isLoggedIn" to="/login">Log in</b-nav-item>
          <b-nav-item v-if = "!isLoggedIn" to="/register">Register</b-nav-item>
          <b-nav-item v-if = "isLoggedIn" to="/myMaps">Els meus mapes</b-nav-item>
          <b-nav-item v-if = "isLoggedIn" ><a @click="logout">Logout</a></b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <router-view></router-view>
         <!-- routes will be rendered here -->
  </div>
</template>

<script>

  export  default {
    name: 'fcocMaps',
    data () {
      return {
      }
    },
    computed : {
      isLoggedIn : function(){ return this.$store.getters.isLoggedIn}
    },
    methods: {
      logout: function () {
        this.$store.dispatch('logout')
          .then(() => {
            this.$router.push('/login')
          })
      }
    },
    created: function () {
      this.$http.interceptors.response.use(undefined, function (err) {
        return new Promise(function (resolve, reject) {
          if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
            this.$store.dispatch('logout')
          }
          throw err;
        });
      });
    }
  }
</script>
<style >
  #fcocMaps {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

</style>
