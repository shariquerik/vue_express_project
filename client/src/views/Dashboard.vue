<template>
  <div id="dashboard">
    <div class="md:flex bg-gray-200 rounded-lg p-6">
      <img class="h-16 w-16 md:h-24 md:w-24 rounded-full mx-auto md:mx-0 md:mr-6" src="../assets/logo.png">
      <div class="text-center md:text-left">
        <h2 class="text-lg">{{this.user.firstName}} {{this.user.lastName}}</h2>
        <div class="text-purple-500">Customer Support</div>
        <div class="text-gray-600">{{this.user.email}}</div>
        <div class="text-gray-600">{{this.user.phone}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Dashboard',
  computed: mapState({
    user: state => state.auth.user
  })
}
</script>
