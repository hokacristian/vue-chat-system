<template>
  <div class="media-preview">
    <!-- Image Preview -->
    <div v-if="message.type === 'image'" class="space-y-2">
      <div class="relative group cursor-pointer" @click="openFullscreen">
        <img 
          :src="message.file_url" 
          :alt="message.file_name" 
          class="rounded-lg max-w-full h-auto max-h-64 object-cover transition-transform duration-200 group-hover:scale-[1.02]"
        >
        <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-200 rounded-lg flex items-center justify-center">
          <svg class="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"></path>
          </svg>
        </div>
      </div>
      
      <div class="flex items-center justify-between text-xs text-gray-500">
        <span class="font-medium">{{ message.file_name }}</span>
        <span>{{ formatFileSize(message.file_size) }}</span>
      </div>
      
      <div v-if="message.content" class="text-sm" :class="isOwn ? 'text-white' : 'text-gray-800'">
        {{ message.content }}
      </div>
    </div>

    <!-- Video Preview -->
    <div v-else-if="message.type === 'video'" class="space-y-2">
      <video 
        :src="message.file_url" 
        controls 
        preload="metadata"
        class="rounded-lg max-w-full h-auto max-h-64"
        style="background-color: #000;"
      >
        Your browser does not support video playback.
      </video>
      
      <div class="flex items-center justify-between text-xs text-gray-500">
        <span class="font-medium">{{ message.file_name }}</span>
        <span>{{ formatFileSize(message.file_size) }}</span>
      </div>
      
      <div v-if="message.content" class="text-sm" :class="isOwn ? 'text-white' : 'text-gray-800'">
        {{ message.content }}
      </div>
    </div>

    <!-- Document Preview -->
    <div v-else-if="message.type === 'document'" class="space-y-2">
      <div class="flex items-center space-x-3 p-3 rounded-lg" :class="isOwn ? 'bg-white bg-opacity-20' : 'bg-gray-50 border border-gray-200'">
        <div class="flex-shrink-0">
          <div class="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
          </div>
        </div>
        
        <div class="flex-1 min-w-0">
          <p class="text-sm font-medium truncate" :class="isOwn ? 'text-white' : 'text-gray-900'">
            {{ message.file_name }}
          </p>
          <p class="text-xs" :class="isOwn ? 'text-white text-opacity-80' : 'text-gray-500'">
            {{ formatFileSize(message.file_size) }}
          </p>
        </div>
        
        <a 
          :href="message.file_url" 
          target="_blank" 
          class="flex-shrink-0 p-2 rounded-lg transition-colors duration-200"
          :class="isOwn ? 'hover:bg-white hover:bg-opacity-20 text-white' : 'hover:bg-gray-100 text-gray-600'"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
        </a>
      </div>
      
      <div v-if="message.content" class="text-sm" :class="isOwn ? 'text-white' : 'text-gray-800'">
        {{ message.content }}
      </div>
    </div>

    <!-- Fullscreen Image Modal -->
    <div 
      v-if="showFullscreen" 
      class="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
      @click="closeFullscreen"
    >
      <div class="relative max-w-full max-h-full">
        <img 
          :src="message.file_url" 
          :alt="message.file_name" 
          class="max-w-full max-h-full object-contain"
        >
        <button 
          @click="closeFullscreen"
          class="absolute top-4 right-4 p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-75 transition-colors duration-200"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { formatFileSize } from '@/lib/utils.js'

const props = defineProps({
  message: Object,
  isOwn: {
    type: Boolean,
    default: false
  }
})

const showFullscreen = ref(false)

const openFullscreen = () => {
  if (props.message.type === 'image') {
    showFullscreen.value = true
  }
}

const closeFullscreen = () => {
  showFullscreen.value = false
}
</script>