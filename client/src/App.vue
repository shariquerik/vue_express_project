<template>
  <div>
    <nav-bar />
    <router-view></router-view>
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
