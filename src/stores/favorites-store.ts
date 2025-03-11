import { defineStore } from 'pinia'
import { LocalStorage } from 'quasar'
import type { Product } from 'src/models/types'

interface FavoritesState {
  items: Product[]
}

export const useFavoritesStore = defineStore('favorites', {
  state: (): FavoritesState => ({
    items: LocalStorage.getItem('favoriteItems') || [],
  }),

  getters: {
    isFavorite: (state) => (productId: number) => state.items.some((item) => item.id === productId),
  },

  actions: {
    toggleFavorite(product: Product) {
      const index = this.items.findIndex((item) => item.id === product.id)

      if (index === -1) {
        this.items.push(product)
      } else {
        this.items.splice(index, 1)
      }

      this.saveToStorage()
    },

    saveToStorage() {
      LocalStorage.set('favoriteItems', this.items)
    },
  },
})
