<template>
  <div id="fcocMaps">
    <b-navbar toggleable="md" type="dark" variant="dark">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand to="/">My Vue App</b-navbar-brand>
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-nav-item to="/">Home</b-nav-item>
          <b-nav-item to="/form">Map regiter</b-nav-item>
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
    watch: {
    },
    methods: {
    }
  }
</script>
<style >
</style>
