<template>
  <div id="dashboard" class="container mx-auto">
    <div class="mt-5">
        <li class="list-none" v-for="product in this.products" :key="product.id">
            <a :href="'/#/product/' + product.id">{{product.productName}}</a>
        </li>
    </div>
  </div>
</template>

<script>
import ProductsService from '../services/ProductsService'
import { mapState } from 'vuex'

export default {
  name: 'Dashboard',
  data (){
    return {
      products: []
    }
  },
  computed: mapState({
    user: state => state.auth.user
  }),
  async mounted () {
        try{
          const allProducts = (await ProductsService.index()).data
          for(let i=0; i<allProducts.length; i++){
            for(let j=0; j<this.user.bookmarked.length; j++){
              if(allProducts[i].id === this.user.bookmarked[j])
                this.products.push(allProducts[i])
            }
          }
        }
        catch(error){
            console.log(error)
        }
        
        
    }
}
</script>
