import Api from '@/services/Api'

export default {
    index (){
        return Api().get('users') 
    },
    put (user){
        return Api().put(`users/${user.id}`, user)
    },
    user (userId){
        return Api().get(`users/${userId}`) 
    }

}