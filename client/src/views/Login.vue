<template>
  <div class="register">
    <v-container>
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
      >
        <v-col>
          <v-row>
            <v-text-field
              type="email"
              label="Email"
              v-model="email"
              outlined
            ></v-text-field>
          </v-row>
          <v-row>
            <v-text-field
              type="password"
              label="Password"
              v-model="password"
              outlined
            ></v-text-field>
          </v-row>
          <v-row>
            <v-btn @click="login" outlined color="blue">Login</v-btn>
          </v-row>
        </v-col>
      </v-form>
    </v-container>
  </div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'

export default {
    data () {
      return {
        email: '',
        password: ''
      }
    },
    methods: {
      async login() {
        const response = await AuthenticationService.register({
          email: this.email,
          password: this.password
        })
        console.log(response.data)
      }
    }
}
</script>

<style scoped>

</style>