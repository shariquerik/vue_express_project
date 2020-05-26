<template>
  <div id="home" class=" container mx-auto mt-8">
    <h1 class=" text-3xl">Product List</h1>
    <div class=" ml-5 mt-5">
      <li class="list-none" v-for="product in this.products" :key="product.id">
          <a :href="'/#/product/' + product.id">{{product.productName}} - {{product.price}}</a>
      </li>
    </div>
  </div>
</template>

<script>
import ProductsService from '../services/ProductsService'

export default {
  name: 'Home',
  data(){
    return{
      products: []
    }
  },
  methods:{
    
  },
  async mounted() {
    this.products = (await ProductsService.index()).data
  }
}
</script>
