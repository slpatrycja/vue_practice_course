<template>
  <div>
    <ul class="list-group">
      <li v-for='item in items' class="list-group-item" :key='item.id'>
        {{ item.title }} - ${{ Number(item.price).toFixed() }}
        <button @click="$emit('remove-from-cart', item)" class="btn badge badge-danger float-right">Remove from cart</button>
      </li>
    </ul>
    <div class="card p-3 my-5">
      <h4 class="text-center">Total: ${{ total }}</h4>
      <button :disabled='items.length ===0' @click="$emit('pay')" class="btn btn-primary">Pay now</button>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['items'],
    computed: {
      total() {
        return this.items.reduce((acc, item) => acc + Number(item.price), 0);
      }
    }
  }
</script>
