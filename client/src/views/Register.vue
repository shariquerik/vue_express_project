<template>
  <div class="register">
    <!-- <v-container>
      <h2>Register</h2>
      <v-form
        ref="form"
      >
        <v-col>
          <v-row>
            <v-text-field
              type="email"
              label="Email"
              v-model="form.email"
              outlined
            ></v-text-field>
          </v-row>
          <v-row>
            <v-text-field
              type="password"
              label="Password"
              v-model="form.password"
              outlined
            ></v-text-field>
          </v-row>
          <v-row class="red-alert" v-if="error">
            <p>{{ error }}</p>
          </v-row>
          <v-row>
            <v-btn @click="register" outlined color="blue">Register</v-btn>
          </v-row>
        </v-col>
      </v-form>
    </v-container> -->
    <div class="main">
      <p class="sign" align="center">Sign up</p>
      <form class="form1">
        <input class="email" type="email" v-model="form.email" align="center" placeholder="Email">
        <input class="pass" type="password" v-model="form.password" align="center" placeholder="Password">
        <a class="submit" @click="register" align="center">Sign up</a>
      </form>   
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
        },
        error: null
      }
    },
    methods: {
      notify(type,text){
        this.$notify({
          group: 'notify', type, text
        })
      },
      async register() {
        try {
          const response = await AuthenticationService.register({
              email: this.form.email,
              password: this.form.password
          })
          console.log(response.data)
          this.error = null
          this.$router.push({name: 'login'})
        } catch (error) {
          this.error = error.response.data.error
          if(this.form.email === '' || this.form.password === ''){
            this.notify('error', 'Email or password is required.')
          }else{
            this.notify('error', this.error)
          }
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
    background-color: #FFFFFF;
    width: 400px;
    height: 400px;
    margin: 4em auto;
    border-radius: 1.5em;
    box-shadow: 0px 11px 35px 2px rgba(0, 0, 0, 0.14);
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