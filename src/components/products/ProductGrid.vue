<template>
  <div class="row q-col-gutter-md">
    <div v-for="product in products" :key="product.id" class="col-6 col-sm-6 col-md-4 col-lg-3">
      <ProductCard :product="product" @add-to-cart="$emit('add-to-cart', $event)" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product } from 'src/models/types'
import ProductCard from './ProductCard.vue'

defineProps<{
  products: Product[]
}>()

defineEmits<{
  (e: 'add-to-cart', product: Product): void
}>()
</script>
