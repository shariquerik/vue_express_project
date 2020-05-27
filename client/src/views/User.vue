<template>
  <div class="container mx-auto mt-4"> 
    <div class="md:flex bg-gray-200 rounded-lg p-6">
      <img class="h-16 w-16 md:h-24 md:w-24 rounded-full mx-auto md:mx-0 md:mr-6" src="../assets/logo.png">
      <div class="text-center md:text-left">
        <h2 class="text-lg">{{this.user.firstName}} {{this.user.lastName}}</h2>
        <div class="text-purple-500">{{this.user.role}}</div>
        <div class="text-gray-600">{{this.user.email}}</div>
        <div class="text-gray-600">{{this.user.phone}}</div>
      </div>
      <div class="mx-auto md:mx-0 md:ml-6">
          <button @click="Edit" v-if="!this.edit">Edit</button>
          <button @click="Save" v-else >Save</button>
      </div>
    </div>
    <form v-if="this.edit" class="w-full max-w-lg bg-gray-200 rounded-lg my-4 p-5">
        <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                First Name
            </label>
            <input v-model="user.firstName" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-gray-500 focus:bg-white" id="grid-first-name" type="text" placeholder="Jane">
            <!-- <p class="text-red-500 text-xs italic">Please fill out this field.</p> -->
            </div>
            <div class="w-full md:w-1/2 px-3">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                Last Name
            </label>
            <input v-model="user.lastName" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Doe">
            </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full px-3">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                Password
            </label>
            <input v-model="user.password" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="password" placeholder="******************">
            <!-- <p class="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p> -->
            </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-2">
            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-email">
                Email
            </label>
            <input v-model="user.email" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-email" type="text" placeholder="abcd@xyz.com">
            </div>
            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-phone">
                Phone
            </label>
            <input v-model="user.phone" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-phone" type="text" placeholder="9876543210">
            </div>
        </div>
        </form>
  </div>
</template>

<script>
import UsersService from '../services/UsersService'

export default {
    name: 'users',
    data () {
        return {
            user: {},
            edit: false
        }
    },
    methods:{
        notify(type,text){
            this.$notify({
            group: 'notify', type, text
            })
        },
        Edit(){
            this.edit = !this.edit
        },
        async Save(){
            try {
                await UsersService.put(this.user)
                this.edit = false
            } catch (error) {
                this.notify('error', error.response.data.error)
            }
        }
    },
    async mounted () {
        try{
            this.user = (await UsersService.user(this.$route.params.userId)).data
        }
        catch(error){
            const err = error.response.data
            if(err === 'Access Denied, contact your admin.'){
                console.error(err)
                this.notify('error', err)
                this.$router.push({name: 'dashboard'})
            }
            else if (error.response.status === 500){
                console.error('Need to Login')
                this.notify('error', 'Need to Login')
                this.$router.push({name: 'login'})
            }
            else{
                console.error(err)
                this.notify('error', err)
                this.$router.push({name: 'login'})
            }
        }
        
        
    }
}
</script>

<style scoped>
</style>