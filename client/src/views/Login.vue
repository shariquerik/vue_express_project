<template>
  <div class="login flex justify-center">
    <div class="w-full max-w-xs mt-20">
      <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div class="flex justify-center font-bold mb-3 text-gray-700" >Login</div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
            Email
          </label>
          <input v-model="form.email" :class="{'border-red-500 mb-3': this.field === 'email'}" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="email" placeholder="Email">
          <p v-if="this.field === 'email'" class="text-red-500 text-xs italic">{{this.error}}</p>        
        </div>
        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
            Password
          </label>
          <input v-model="form.password" :class="{'border-red-500 mb-3': this.field === 'password'}" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="************">
          <p v-if="this.field === 'password'" class="text-red-500 text-xs italic">{{this.error}}</p>
        </div>
        <div class="flex items-center justify-between">
          <button @click="login" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
            Sign In
          </button>
          <a class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
            Forgot Password?
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
import { mapActions } from 'vuex'

export default {
    data () {
      return {
        form: {
          email: '',
          password: ''
        },
        error: '',
        field: ''
      }
    },
    methods: {
      ...mapActions({
      setToken: 'auth/setToken',
      setUser: 'auth/setUser'
      }),
      async login() {
        try {
          const response = await AuthenticationService.login({
              email: this.form.email,
              password: this.form.password
          })
          this.setToken(response.data.token)
          this.setUser(response.data.user)
          this.error = ''
          this.field = ''
          this.$router.push({name: 'dashboard'})
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

  body {
    background-color: #F3EBF6;
    font-family: 'Ubuntu', sans-serif;
  }
    
  .main {
    margin: 4em auto;
  }
    
  .sign {
    padding-top: 40px;
    color: #8C55AA;
    font-family: 'Ubuntu', sans-serif;
    font-weight: bold;
    font-size: 23px;
  }
    
  .email {
    width: 76%;
    color: rgb(38, 50, 56);
    font-weight: 700;
    font-size: 14px;
    letter-spacing: 1px;
    background: rgba(136, 126, 126, 0.04);
    padding: 10px 20px;
    border: none;
    border-radius: 20px;
    outline: none;
    box-sizing: border-box;
    border: 2px solid rgba(0, 0, 0, 0.02);
    margin-bottom: 50px;
    margin-left: 46px;
    text-align: center;
    margin-bottom: 27px;
    font-family: 'Ubuntu', sans-serif;
  }
    
  form.form1 {
    padding-top: 40px;
  }
    
  .pass {
    width: 76%;
    color: rgb(38, 50, 56);
    font-weight: 700;
    font-size: 14px;
    letter-spacing: 1px;
    background: rgba(136, 126, 126, 0.04);
    padding: 10px 20px;
    border: none;
    border-radius: 20px;
    outline: none;
    box-sizing: border-box;
    border: 2px solid rgba(0, 0, 0, 0.02);
    margin-bottom: 50px;
    margin-left: 46px;
    text-align: center;
    margin-bottom: 27px;
    font-family: 'Ubuntu', sans-serif;
  }
    
   
  .email:focus, .pass:focus {
    border: 2px solid rgba(0, 0, 0, 0.18) !important;   
  }
    
  .submit {
    cursor: pointer;
    border-radius: 5em;
    color: #fff;
    background: linear-gradient(to right, #9C27B0, #E040FB);
    border: 0;
    padding-left: 40px;
    padding-right: 40px;
    padding-bottom: 10px;
    padding-top: 10px;
    font-family: 'Ubuntu', sans-serif;
    margin-left: 35%;
    font-size: 13px;
    box-shadow: 0 0 20px 1px rgba(0, 0, 0, 0.04);
  }
    
  .forgot {
    text-shadow: 0px 0px 3px rgba(117, 117, 117, 0.12);
    color: #E1BEE7;
    padding-top: 15px;
  }
    
  a {
    text-shadow: 0px 0px 3px rgba(117, 117, 117, 0.12);
    color: #E1BEE7;
    text-decoration: none
  }
    
  @media (max-width: 600px) {
      .main {
          border-radius: 0px;
      }
  }
</style>