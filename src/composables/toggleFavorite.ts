import { storeToRefs } from "pinia"
import type { Product } from "src/models/types"
import { useFavoritesStore } from "src/stores"
import { showNotification } from "src/utils/notify"
import { computed } from "vue"

const favoritesStore = useFavoritesStore()

const { isFavorite } = storeToRefs(favoritesStore)

export default function toggleFavorite (product: Product) {
  if (!product) return

  const isFav = computed(() => product? isFavorite.value(product.id) : false)

  favoritesStore.toggleFavorite(product)

  showNotification(
    `${product.name} ${isFav.value ? 'добавлен в' : 'удален из' } Избранное`,
    isFav.value ? 'positive' : 'negative' ,
  )
}
