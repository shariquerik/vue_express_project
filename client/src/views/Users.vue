<template>
  <div> 
    <button @click="editrole" outlined color="blue">Edit</button>
    <button v-if="this.edit" @click="save" outlined color="blue">Save</button>
    <div v-if="!edit">
        <li class="list-none" v-for="user in this.users" :key="user.id">
            {{ user.email}} - {{user.role}}
        </li>
    </div>
    <div v-else>
        <li class="list-none" v-for="user in this.users" :key="user.id">
            {{ user.email }} - 
            <select class="select p-1" v-model="user.role">
                <option value="user">user</option>
                <option value="manager">manager</option>
                <option value="admin">admin</option>
            </select>
        </li>
    </div>
  </div>
</template>

<script>
import UsersService from '../services/UsersService'

export default {
    name: 'users',
    data () {
        return {
            users: [],
            edit: false
        }
    },
    methods:{
        notify(type,text){
            this.$notify({
            group: 'notify', type, text
            })
        },
        editrole(){
            this.edit = !this.edit
        },
        async save(){
            for(let user in this.users){
                await UsersService.put(this.users[user])
            }
            this.edit = false
        }
    },
    async mounted () {
        try{
            this.users = (await UsersService.index()).data
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