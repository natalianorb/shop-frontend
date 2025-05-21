<template>
  <q-layout view="hHh lpR fff">
    <q-header elevated class="bg-white text-black">
      <q-toolbar class="justify-between">
        <!-- <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" /> -->

        <div class="full-width q-pa-xs">
          <div class="text-uppercase text-body2">Доставить по адресу</div>
          <div>{{ address }}</div>
        </div>
        <q-btn
          dense
          flat
          round
          icon="shopping_cart"
          aria-label="Cart"
          @click="cartStore.toggleCart"
        >
          <q-badge v-if="cartStore.totalItems" color="primary" floating>
            {{ cartStore.totalItems }}
          </q-badge>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" side="left" overlay behavior="mobile" elevated>
      <!-- drawer content -->
    </q-drawer>

    <CartDrawer />

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { useUserStore } from 'src/stores/user-store'
import { useCartStore } from 'src/stores'
import CartDrawer from 'src/components/cart/CartDrawer.vue'

const leftDrawerOpen = ref(false)
const userStore = useUserStore()
const { address } = storeToRefs(userStore)
const cartStore = useCartStore()

// function toggleLeftDrawer() {
//   leftDrawerOpen.value = !leftDrawerOpen.value
// }
</script>
