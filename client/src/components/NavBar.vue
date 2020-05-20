<template>
  <v-app-bar
      color="deep-purple accent-4"
      dense
      dark
      app
      flat
    >
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <router-link class="toolbar-title" to="/" tag="li" >
        <v-toolbar-title >Title</v-toolbar-title>
      </router-link>

      <v-spacer></v-spacer>

      <v-btn v-if="this.isLoggedIn" router :to="{name: 'dashboard'}">
          Dashboard
      </v-btn>
      <v-btn v-if="this.isLoggedIn && this.isAdmin === 'admin'" router :to="{name: 'users'}">
          Users
      </v-btn>
      <v-btn @click="logout" v-if="this.isLoggedIn" router :to="{name: 'home'}">
          Log Out
      </v-btn>
      <v-btn v-if="!this.isLoggedIn" router :to="{name: 'login'}">
          Log In
      </v-btn>
      <v-btn v-if="!this.isLoggedIn" router :to="{name: 'register'}">
          Sign Up
      </v-btn>

    
    </v-app-bar>
</template>

<script>
import axios from 'axios'
import { mapActions, mapState } from 'vuex'

export default {
    name: 'navbar',
    methods:{
      ...mapActions({
      setToken: 'auth/setToken',
      setUser: 'auth/setUser'
      }),
      logout(){
        this.setToken(null)
        this.setUser(null)
        delete axios.defaults.headers.common['Authorization']
      }
    },
    computed: mapState({
      isLoggedIn: state => state.auth.isUserLoggedIn,
      isAdmin: state => state.auth.user.role
    })
}
</script>

<style scoped>
  .toolbar-title {
    list-style: none;
    cursor: pointer;
  }
  .v-btn{
    margin: 2px;
    margin-left: 5px;
    padding: 0 8px!important;
  }
</style>