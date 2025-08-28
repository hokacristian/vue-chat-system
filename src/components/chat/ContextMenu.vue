<template>
  <div 
    v-if="show"
    class="absolute z-10 w-48 py-2 mt-2 bg-white rounded-md shadow-xl dark:bg-gray-700"
    :style="{ top: y + 'px', left: x + 'px' }"
  >
    <a 
      v-for="item in items"
      :key="item.label"
      href="#" 
      @click.prevent="$emit('select', item.event)" 
      class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
      :class="{ 'text-red-600 dark:text-red-500': item.danger }"
    >
      {{ item.label }}
    </a>
  </div>
</template>

<script setup>
const props = defineProps({
  show: Boolean,
  x: Number,
  y: Number,
  items: Array
})

defineEmits(['select'])
</script>
