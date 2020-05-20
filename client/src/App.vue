<template>
  <div>
    <nav-bar />
    <v-content>
      <v-app>
        <router-view></router-view>
      </v-app>
    </v-content>
    <notifications position="bottom right" group="notify" />
  </div>
</template>

<script>
import NavBar from './components/NavBar'

export default {
  name: 'App',
  components: {
    NavBar
  }
};
</script>

<style>
  *{
    font-family: Arial, Helvetica, sans-serif;
  }
</style>
