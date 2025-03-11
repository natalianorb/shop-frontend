<template>
  <q-card class="product-card" v-ripple @click="router.push({ name: 'product-details', params: { id: product.id } })">
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

      <div class="row items-center q-gutter-sm">
        <q-btn :color="isFav ? 'red' : 'grey'" flat round dense :icon="isFav ? 'favorite' : 'favorite_border'"
          @click.stop="toggleFavorite(product)" />
        <q-btn color="accent" icon="add" @click.stop="$emit('add-to-cart', product)" round />
      </div>
    </q-card-actions>
  </q-card>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { computed } from 'vue'
import type { Product } from 'src/models/types'
import { formatPrice } from 'src/utils/format'
import { useFavoritesStore } from 'src/stores'
import { storeToRefs } from 'pinia'
import toggleFavorite from 'src/composables/toggleFavorite'

const router = useRouter()

const props = defineProps<{
  product: Product
}>()
const product = computed(() => props.product)

const favoritesStore = useFavoritesStore()
const { isFavorite } = storeToRefs(favoritesStore)
const isFav = computed(() => product.value ? isFavorite.value(product.value.id) : false)

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

    @media (max-width: 599px) {
      height: 150px;
    }
  }
}

.ellipsis {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

@media (max-width: 599px) {
  :deep(.q-card__section) {
    padding: 8px;
  }
}
</style>
