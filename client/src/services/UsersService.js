import Api from '@/services/Api'

export default {
    index (){
        return Api().get('users')
        
    },
    put (user){
        return Api().put(`users/${user.id}`, user)
    }

}

