<template>
  <div id="dashboard">
    <div class="md:flex bg-gray-200 rounded-lg p-6">
      <img class="h-16 w-16 md:h-24 md:w-24 rounded-full mx-auto md:mx-0 md:mr-6" src="../assets/logo.png">
      <div class="text-center md:text-left">
        <h2 class="text-lg">{{this.user.firstName}} {{this.user.lastName}}</h2>
        <div class="text-purple-500">Customer Support</div>
        <div class="text-gray-600">{{this.user.email}}</div>
        <div class="text-gray-600">{{this.user.phone}}</div>
      </div>
    </div>
    <div class=" container mx-auto mt-5">
        <li class="list-none" v-for="product in this.products" :key="product.id">
            {{ product.productName}} - {{product.price}}
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
