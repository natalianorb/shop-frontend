<template>
  <div class="categories-section q-mb-md">
    <div class="row">
      <q-scroll-area horizontal class="col" style="height: 46px">
        <div class="row no-wrap q-py-xs">
          <div v-for="category in categories" :key="category.id" class="q-mr-md">
            <q-btn :label="category.name" :color="isSelected(category.id) ? 'accent' : 'white'" text-color="black"
              @click="$emit('select', category.id)" rounded no-caps class="category-btn" />
          </div>
        </div>
      </q-scroll-area>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Category } from 'src/models/types'

const props = defineProps<{
  categories: Category[]
  selectedIds: number[]
}>()

defineEmits<{
  (e: 'select', id: number): void
  (e: 'show-filter'): void
}>()

function isSelected(id: number): boolean {
  return props.selectedIds.includes(id)
}
</script>

<style scoped>
.category-btn {
  height: 36px;
  white-space: nowrap;
}

.see-all-btn {
  text-transform: none;
}
</style>
