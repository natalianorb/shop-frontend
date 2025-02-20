import { defineStore } from 'pinia'
import { LocalStorage } from 'quasar'

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  image: string
}

interface CartState {
  items: CartItem[]
  isOpen: boolean
}

export const useCartStore = defineStore('cart', {
  state: (): CartState => ({
    items: LocalStorage.getItem('cartItems') || [],
    isOpen: false,
  }),

  getters: {
    totalItems: (state) => state.items.reduce((sum, item) => sum + item.quantity, 0),
    totalAmount: (state) => state.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    isEmpty: (state) => state.items.length === 0,
  },

  actions: {
    addItem(item: Omit<CartItem, 'quantity'>) {
      const existingItem = this.items.find((i) => i.id === item.id)

      if (existingItem) {
        existingItem.quantity++
      } else {
        this.items.push({ ...item, quantity: 1 })
      }

      this.saveToStorage()
      this.isOpen = true
    },

    removeItem(itemId: number) {
      const index = this.items.findIndex((item) => item.id === itemId)
      if (index > -1) {
        this.items.splice(index, 1)
        this.saveToStorage()
      }
    },

    updateQuantity(itemId: number, quantity: number) {
      const item = this.items.find((i) => i.id === itemId)
      if (item) {
        item.quantity = quantity
        this.saveToStorage()
      }
    },

    clearCart() {
      this.items = []
      this.saveToStorage()
    },

    toggleCart() {
      this.isOpen = !this.isOpen
    },

    saveToStorage() {
      LocalStorage.set('cartItems', this.items)
    },
  },
})
