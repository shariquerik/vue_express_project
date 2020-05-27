<template>
  <div id="product" class=" flex-row container mx-auto mt-8">
    <div class="flex">
        <div class="">
          <h1 class="text-3xl">{{product.productName}}</h1>
        </div>
        <div class="ml-2 flex content-center" v-if="this.isLoggedIn">
          <button class="p-2" v-if="!this.isbookmarked" @click="Bookmarked">book</button>
          <button class="p-2" v-else @click="Unbookmarked">unbook</button>
        </div>
    </div>
    <div class="ml-5 mt-5">
      <h2>Price: ₹{{product.price}}/kg</h2>
    </div>
  </div>
</template>

<script>
import ProductsService from '../services/ProductsService'
import UsersService from '../services/UsersService'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'Product',
  data(){
    return{
      product: [],
      bookmarked: [],
      isbookmarked: false
    }
  },
  methods:{
    ...mapActions({
      setBookmark: 'auth/setBookmark',
      setUnbookmark: 'auth/setUnbookmark'
    }),
    async Bookmarked(){
        this.setBookmark(this.product.id)
        this.isbookmarked = true
        await UsersService.put(this.user)
    },
    async Unbookmarked(){
        this.setUnbookmark(this.product.id)
        this.isbookmarked = false
        await UsersService.put(this.user)
    }
  },
  async mounted() {
    if(this.user) this.bookmarked = this.user.bookmarked
    const id = this.$route.params.productId
    this.product = (await ProductsService.product(id)).data
    const pid = (e) => e === this.product.id
    const index = this.bookmarked.findIndex(pid)
    if(index !== -1)
        this.isbookmarked = true
    else
        this.isbookmarked = false
  },
    computed: mapState({
      isLoggedIn: state => state.auth.isUserLoggedIn,
      user: state => state.auth.user
    })
}
</script>
