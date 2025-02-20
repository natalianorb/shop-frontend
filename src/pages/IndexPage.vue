<template>
  <q-page class="q-pa-sm q-pt-md">
    <CategoryList
      :categories="categories"
      :selected-id="selectedCategory"
      @select="selectCategory"
      @show-filter="showFilterDialog = true"
    />

    <ProductGrid :products="filteredProducts" @add-to-cart="addToCart" />

    <q-dialog v-model="showFilterDialog">
      <q-card style="min-width: 300px">
        <q-card-section>
          <div class="text-h6">Выберите категорию</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-list>
            <q-item
              v-for="category in categories"
              :key="category.id"
              clickable
              v-ripple
              @click="selectCategoryAndCloseDialog(category.id)"
            >
              <q-item-section>
                <q-item-label>{{ category.name }}</q-item-label>
              </q-item-section>
              <q-item-section avatar>
                <q-icon v-if="selectedCategory === category.id" name="check" color="primary" />
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            v-if="selectedCategory !== null"
            flat
            label="Очистить"
            color="primary"
            @click="clearFilter"
          />
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
const selectedCategory = ref<number | null>(null)

const filteredProducts = computed(() => {
  if (!selectedCategory.value) return products
  return products.filter((product: Product) => product.categoryId === selectedCategory.value)
})

const selectCategory = (categoryId: number) => {
  selectedCategory.value = selectedCategory.value === categoryId ? null : categoryId
}

const selectCategoryAndCloseDialog = (categoryId: number) => {
  selectCategory(categoryId)
  showFilterDialog.value = false
}

const clearFilter = () => {
  selectedCategory.value = null
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
