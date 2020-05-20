<template>
  <div>
    <v-container>
        <v-btn @click="editrole" outlined color="blue">Edit</v-btn>
        <v-btn v-if="this.edit" @click="save" v-model="this.users" outlined color="blue">Save</v-btn>
        <div v-if="!edit">
            <li v-for="user in this.users" :key="user.id">
                {{ user.email}} - {{user.role}}
            </li>
        </div>
        <div v-else>
            <li v-for="user in this.users" :key="user.id">
                {{ user.email }} - 
                <select class="select" v-model="user.role">
                    <option value="user">user</option>
                    <option value="manager">manager</option>
                    <option value="admin">admin</option>
                </select>
            </li>
        </div>
    </v-container>
  </div>
</template>

<script>
import UsersService from '../services/UsersService'

export default {
    name: 'users',
    data () {
        return {
            users: [],
            edit: false,
            selected: ''
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
    li{
        list-style: none;
    }
    .select {
        padding: 3px;
        outline: 2px;
        outline-color: black;
    }
</style>