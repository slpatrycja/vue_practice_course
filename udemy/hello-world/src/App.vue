<template>
  <div class="container">
    <div class="row">
      <div class="col-md-7">
        <div class="row">
          <div class="col-md-6" :key='product.id' v-for='product in products'>
            <product :isInCart = 'isInCart(product)' @add-to-cart='addToCart(product)' :product="product" ></product>
          </div>
        </div>
      </div>
      <div class="col-md-5 my-5">
        <cart @pay='payNow() '@remove-from-cart='removeFromCart($event)' :items='cart'></cart>
      </div>
    </div>
  </div>

</template>

<script>
import products from '@/products.json';
import Cart from '@/components/Cart.vue'
import Product from '@/components/Product.vue';

export default {
  name: 'app',
  components: {
    Product,
    Cart
  },
  data() {
    return {
      products,
      cart: []
    }
  },

  methods: {
    addToCart(product) {
      this.cart.push(product);
    },

    isInCart(product) {
      const item = this.cart.find(item => item.id === product.id);
      if(item) {
        return true;
      }

      return false;
    },

    removeFromCart(product) {
      this.cart = this.cart.filter(item => item.id != product.id);
    },

    payNow() {
      this.cart = [];
      alert('Shopping completed')
    }
  }
}
</script>

<style>
body {
  background-color: lightblue;
}
</style>
