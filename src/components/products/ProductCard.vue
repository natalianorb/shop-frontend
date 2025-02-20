<template>
  <q-card class="product-card" v-ripple>
    <q-img :src="product.image" :ratio="1" class="product-image" loading="lazy">
      <template v-slot:loading>
        <q-spinner-dots color="white" />
      </template>
    </q-img>

    <q-card-section class="q-pa-sm">
      <div class="text-subtitle1 ellipsis">{{ product.name }}</div>
    </q-card-section>

    <q-card-actions align="between" class="q-pa-sm">
      <div class="text-h6 q-mt-sm">{{ formatPrice(product.price) }}</div>

      <q-btn color="accent" icon="add" @click="$emit('add-to-cart', product)" round />
    </q-card-actions>
  </q-card>
</template>

<script setup lang="ts">
import type { Product } from 'src/models/types'
import { formatPrice } from 'src/utils/format'

defineProps<{
  product: Product
}>()

defineEmits<{
  (e: 'add-to-cart', product: Product): void
}>()
</script>

<style lang="scss" scoped>
.product-card {
  height: 100%;
  display: flex;
  flex-direction: column;

  box-shadow: 8px 8px 12px rgba(150, 150, 154, 0.25);
  border-radius: 24px;

  .product-image {
    height: 180px;
    object-fit: cover;
  }
}

.ellipsis {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

@media (max-width: 599px) {
  .product-card {
    .product-image {
      height: 150px;
    }
  }

  :deep(.q-card__section) {
    padding: 8px;
  }
}
</style>
