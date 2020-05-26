<template>
  <div id="product" class=" container mx-auto mt-8">
    <h1 class=" text-3xl">Product List</h1>
    <div class=" ml-5 mt-5">
      <li class="list-none">
         {{product.productName}} - {{product.price}}
         <button v-if="!isbookmarked" @click="Bookmarked">book</button>
         <button v-else @click="Unbookmarked">unbook</button>
      </li>
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
      bookmarked: state => state.auth.user.bookmarked,
      user: state => state.auth.user
    })
}
</script>
