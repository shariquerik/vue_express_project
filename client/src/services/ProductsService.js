import Api from '@/services/Api'

export default {
    index (){
        return Api().get('products')
    },
    put (product){
        return Api().put(`products/${product.id}`, product)
    },
    product (productId){
        return Api().get(`products/${productId}`)
    }

}
