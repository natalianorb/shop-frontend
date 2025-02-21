<template>
  <q-drawer
    v-model="isOpen"
    side="right"
    elevated
    behavior="mobile"
    class="cart-drawer"
    :breakpoint="500"
  >
    <q-list padding>
      <q-item-label header>Корзина</q-item-label>

      <template v-if="!isEmpty">
        <q-item v-for="item in items" :key="item.id">
          <q-item-section avatar>
            <q-img :src="item.image" :ratio="1" width="50px" />
          </q-item-section>

          <q-item-section>
            <q-item-label>{{ item.name }}</q-item-label>
            <q-item-label caption>{{ formatPrice(item.price) }}</q-item-label>
          </q-item-section>

          <q-item-section side>
            <div class="row items-center">
              <q-btn
                flat
                round
                dense
                icon="remove"
                @click="updateQuantity(item.id, Math.max(0, item.quantity - 1))"
              />
              <span class="q-mx-sm">{{ item.quantity }}</span>
              <q-btn
                flat
                round
                dense
                icon="add"
                @click="updateQuantity(item.id, item.quantity + 1)"
              />
            </div>
          </q-item-section>
        </q-item>

        <q-separator spaced />

        <q-item>
          <q-item-section>
            <q-item-label>Итого:</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-item-label>{{ formatPrice(totalAmount) }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-item>
          <q-btn color="primary" label="Оформить заказ" class="full-width" @click="checkout" />
        </q-item>
      </template>

      <template v-else>
        <q-item>
          <q-item-section class="text-center">
            <q-item-label>Корзина пуста</q-item-label>
          </q-item-section>
        </q-item>
      </template>
    </q-list>
  </q-drawer>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useCartStore } from 'src/stores'
import { formatPrice } from 'src/utils/format'

const cartStore = useCartStore()

const isOpen = computed({
  get: () => cartStore.isOpen,
  set: (value) => (cartStore.isOpen = value),
})

const items = computed(() => cartStore.items)
const isEmpty = computed(() => cartStore.isEmpty)
const totalAmount = computed(() => cartStore.totalAmount)

const updateQuantity = (itemId: number, quantity: number) => {
  if (quantity === 0) {
    cartStore.removeItem(itemId)
  } else {
    cartStore.updateQuantity(itemId, quantity)
  }
}

const checkout = () => {
  // Implement checkout logic
  console.log('Checkout:', items.value)
}
</script>

<style lang="scss" scoped></style>
