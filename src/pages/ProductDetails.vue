<template>
  <q-page class="q-pa-md">
    <div class="container">
      <!-- Back Navigation -->
      <div class="row items-center q-mb-lg">
        <q-btn flat round dense icon="arrow_back" color="black" @click="router.back()" />
        <span class="q-ml-sm text-subtitle1">Назад</span>
      </div>
    </div>


    <template v-if="product">
      <div class="container">
        <div class="row q-col-gutter-lg">
          <!-- Product Image -->
          <div class="col-12 col-sm-6">
            <q-card flat bordered>
              <q-img :src="product.image" :ratio="1" class="product-image" />
            </q-card>
          </div>

          <!-- Product Info -->
          <div class="col-12 col-sm-6">
            <div class="text-h4">{{ product.name }}</div>
            <div class="text-h5 q-mt-md">{{ formatPrice(product.price) }}</div>

            <q-separator class="q-my-lg" />

            <div class="row items-center q-gutter-md">
              <q-btn color="primary" icon-right="shopping_cart" label="Добавить в корзину" @click="addToCart"
                :size="$q.screen.lt.md ? 'sm' : 'md'" />
              <q-btn :color="isFav ? 'red' : 'grey'" round flat :size="$q.screen.lt.md ? 'sm' : 'md'"
                :icon="isFav ? 'favorite' : 'favorite_border'" @click="toggleFavorite(product)" />
            </div>

            <q-tooltip v-if="!isFav"> Добавить в избранное </q-tooltip>
            <q-tooltip v-else> Убрать из избранного </q-tooltip>
          </div>
        </div>
      </div>
    </template>

    <div v-else class="text-center q-pa-md">
      <q-spinner-dots color="primary" size="40" />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCartStore, useFavoritesStore } from 'src/stores'
import { products } from 'src/data/menu'
import { formatPrice } from 'src/utils/format'
import { showNotification } from 'src/utils/notify'
import { storeToRefs } from 'pinia'
import toggleFavorite from 'src/composables/toggleFavorite'

const route = useRoute()
const router = useRouter()

const product = computed(() => {
  return products.find((p) => p.id === Number(route.params.id))
})

const favoritesStore = useFavoritesStore()
const { isFavorite } = storeToRefs(favoritesStore)
const isFav = computed(() => product.value ? isFavorite.value(product.value.id) : false)

const cartStore = useCartStore()
const addToCart = () => {
  if (!product.value) return

  cartStore.addItem({
    id: product.value.id,
    name: product.value.name,
    price: product.value.price,
    image: product.value.image,
  })
  showNotification(`${product.value.name} добавлен в корзину`)
}

</script>

<style lang="scss" scoped>
.product-image {
  max-height: 500px;
  object-fit: cover;

  @media (max-width: 599px) {
    max-height: 300px;
  }
}
</style>
