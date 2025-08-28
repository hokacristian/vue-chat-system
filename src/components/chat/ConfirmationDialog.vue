<template>
  <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-sm">
      <h3 class="text-lg font-medium text-gray-900 dark:text-white">{{ title }}</h3>
      <p class="mt-2 text-sm text-gray-600 dark:text-gray-300">{{ message }}</p>
      <div class="mt-4 flex justify-end space-x-2">
        <button @click="$emit('cancel')" class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600">Cancel</button>
        <button @click="$emit('confirm')" class="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700">Confirm</button>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  show: Boolean,
  title: String,
  message: String
})

defineEmits(['confirm', 'cancel'])
</script>
