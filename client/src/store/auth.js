
export default{
  namespaced: true,
  strict: true,
  state: {
    token: null,
    user: null,
    isUserLoggedIn: false
  },
  mutations: {
    setToken(state, token){
      state.token = token
    },
    setUser(state, user){
      state.user = user
      if(user){
        state.isUserLoggedIn = true
      }else{
        state.isUserLoggedIn = false
      }
      
    },
    setBookmark(state, bookmarked){
      const id = (e) => e === bookmarked
      const index = state.user.bookmarked.findIndex(id)
      if(index === -1)
        state.user.bookmarked = [...state.user.bookmarked, bookmarked]
    },
    setUnbookmark(state, unbookmarked){
      const id = (e) => e === unbookmarked
      const index = state.user.bookmarked.findIndex(id)
      if(index !== -1)
        state.user.bookmarked.splice(index,1)
    }
  },
  actions: {
    setToken({commit}, token){
      commit('setToken', token)
    },
    setUser({commit}, user){
      commit('setUser', user)
    },
    setBookmark({commit}, bookmarked){
      commit('setBookmark', bookmarked)
    },
    setUnbookmark({commit}, unbookmarked){
      commit('setUnbookmark', unbookmarked)
    }
  }
}
