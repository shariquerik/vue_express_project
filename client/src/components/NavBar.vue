<template>
  <v-app-bar
      color="deep-purple accent-4"
      dense
      dark
      app
      flat
    >
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>Title</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn router :to="{name: 'login'}">
          Log In
      </v-btn>
      <v-btn router :to="{name: 'register'}">
          Sign Up
      </v-btn>

    
    </v-app-bar>
</template>

<script>
export default {
    name: 'navbar'
}
</script>

<style>

</style>