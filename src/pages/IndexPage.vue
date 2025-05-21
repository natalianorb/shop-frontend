<template>
  <q-page class="q-pa-md">
    <CategoryList :categories="categories" :selected-ids="selectedCategories" @select="toggleCategory"
      @show-filter="showFilterDialog = true" />

    <ProductGrid :products="filteredProducts" @add-to-cart="addToCart" />

    <q-dialog v-model="showFilterDialog">
      <q-card style="min-width: 300px">
        <q-card-section>
          <div class="text-h6">Выберите категорию</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-list>
            <q-item v-for="category in categories" :key="category.id" clickable v-ripple
              @click="selectCategoryAndCloseDialog(category.id)">
              <q-item-section>
                <q-item-label>{{ category.name }}</q-item-label>
              </q-item-section>
              <q-item-section avatar>
                <q-icon v-if="selectedCategories.includes(category.id)" name="check" color="primary" />
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn v-if="selectedCategories !== null" flat label="Очистить" color="primary" @click="clearFilter" />
          <q-btn flat label="Закрыть" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useCartStore } from 'src/stores'
import type { Product } from 'src/models/types'
import { showNotification } from 'src/utils/notify'
import { categories, products } from 'src/data/menu'
import CategoryList from 'src/components/categories/CategoryList.vue'
import ProductGrid from 'src/components/products/ProductGrid.vue'

const cartStore = useCartStore()
const showFilterDialog = ref(false)
const selectedCategories = ref<number[]>([])

const filteredProducts = computed(() => {
  if (!selectedCategories.value.length) return products
  return products.filter((product: Product) => selectedCategories.value.includes(product.categoryId))
})

const toggleCategory = (categoryId: number) => {
  if (selectedCategories.value.includes(categoryId)) {
    selectedCategories.value = selectedCategories.value.filter((id) => id !== categoryId)
  } else {
    selectedCategories.value.push(categoryId)
  }
}

const selectCategoryAndCloseDialog = (categoryId: number) => {
  toggleCategory(categoryId)
  showFilterDialog.value = false
}

const clearFilter = () => {
  selectedCategories.value = []
  showFilterDialog.value = false
}

const addToCart = (product: Product) => {
  cartStore.addItem({
    id: product.id,
    name: product.name,
    price: product.price,
    image: product.image,
  })
  showNotification(`${product.name} добавлен в корзину`)
}
</script>

<style lang="scss" scoped></style>
