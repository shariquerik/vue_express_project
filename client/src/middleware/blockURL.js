import store from '../store'

export const isLoggedIn = (to, from, next) => {
    if(store.state.auth.isUserLoggedIn){
        next()
    }else{
        next({ name: 'login', query: { redirect_to: to.fullPath } })
    }
}