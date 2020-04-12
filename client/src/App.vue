<template>
  <div>
    <nav-bar />
    <v-content>
      <v-app>
        <router-view></router-view>
      </v-app>
    </v-content>
  </div>
</template>

<script>
import NavBar from './components/NavBar'

export default {
  name: 'App',
  components: {
    NavBar
  },

  data: () => ({
    //
  }),
};
</script>

<style scoped>

</style>
