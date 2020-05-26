<template>
  <div class="register flex justify-center">
    <div class="w-full max-w-xs mt-20">
      <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div class="flex justify-center font-bold mb-3 text-gray-700">Register</div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
            Email
          </label>
          <input v-model="form.email" :class="{'border-red-500 mb-3': this.field === 'email'}" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="email" placeholder="Email">
          <p v-if="this.field === 'email'" class="text-red-500 text-xs italic">{{this.error}}</p>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
            Password
          </label>
          <input v-model="form.password" :class="{'border-red-500 mb-3': this.field === 'password'}" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="************">
          <p v-if="this.field === 'password'" class="text-red-500 text-xs italic">{{this.error}}</p>
        </div>
        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
            Confirm Password
          </label>
          <input v-model="form.confirmPassword" :class="{'border-red-500 mb-3': this.field === 'confirmPassword'}" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="************">
          <p v-if="this.field === 'confirmPassword'" class="text-red-500 text-xs italic">{{this.error}}</p>
        </div>
        <div class="flex items-center justify-between">
          <button @click="register" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
            Sign Up
          </button>
          <a class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#/login">
            Log in instead
          </a>
        </div>
      </form>
      <p class="text-center text-gray-500 text-xs">
        &copy;2020 RikApp. All rights reserved.
      </p>
    </div>
  </div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'

export default {
    data () {
      return {
        form:{
          email: '',
          password: '',
          confirmPassword: ''
        },
        error: '',
        field: ''
      }
    },
    methods: {
      async register() {
        try {
          if(this.form.password === this.form.confirmPassword){
            const response = await AuthenticationService.register({
                email: this.form.email,
                password: this.form.password
            })
            console.log(response.data)
            this.error = ''
            this.field = ''
            this.$router.push({name: 'login'})
          }
          else{
            this.field = 'confirmPassword'
            this.error = 'Password and Confirm password must be same'
          }
        } catch (error) {
          if(error.response.data.type === 'string.regex.base')
            this.error = 'password length should be atleast 6 and it should be only alphanumeric.'
          else
            this.error = error.response.data.error
          this.field = error.response.data.field
        }
        
      }
    }
}
</script>

<style scoped>
</style>