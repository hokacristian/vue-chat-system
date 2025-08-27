<template>
  <div class="flex-shrink-0 bg-white border-t border-gray-200 p-4">
    <!-- File preview if selected -->
    <div v-if="selectedFile" class="mb-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-2">
          <div class="text-2xl">
            {{ getFileIcon(selectedFile) }}
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium text-gray-900 truncate">
              {{ selectedFile.name }}
            </p>
            <p class="text-xs text-gray-500">
              {{ formatFileSize(selectedFile.size) }}
            </p>
          </div>
        </div>
        <button 
          @click="removeFile" 
          class="p-1 rounded-full hover:bg-gray-200 transition-colors duration-200"
        >
          <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    </div>

    <!-- Input area -->
    <div class="flex items-end space-x-2">
      <!-- Attachment button -->
      <div class="relative">
        <button 
          @click="showAttachments = !showAttachments"
          class="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors duration-200"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path>
          </svg>
        </button>

        <!-- Attachment options -->
        <div 
          v-if="showAttachments" 
          class="absolute bottom-full left-0 mb-2 bg-white border border-gray-200 rounded-lg shadow-lg py-2 min-w-[150px]"
        >
          <label class="flex items-center px-3 py-2 hover:bg-gray-50 cursor-pointer transition-colors duration-200">
            <span class="mr-3">📷</span>
            <span class="text-sm text-gray-700">Image</span>
            <input type="file" accept="image/*" @change="handleFileUpload" class="hidden">
          </label>
          
          <label class="flex items-center px-3 py-2 hover:bg-gray-50 cursor-pointer transition-colors duration-200">
            <span class="mr-3">🎥</span>
            <span class="text-sm text-gray-700">Video</span>
            <input type="file" accept="video/*" @change="handleFileUpload" class="hidden">
          </label>
          
          <label class="flex items-center px-3 py-2 hover:bg-gray-50 cursor-pointer transition-colors duration-200">
            <span class="mr-3">📄</span>
            <span class="text-sm text-gray-700">Document</span>
            <input type="file" accept=".pdf,.doc,.docx,.txt,.xls,.xlsx" @change="handleFileUpload" class="hidden">
          </label>
        </div>
      </div>

      <!-- Text input -->
      <div class="flex-1">
        <textarea
          v-model="messageText"
          @keydown.enter.exact.prevent="sendMessage"
          @keydown.enter.shift.exact.prevent="messageText += '\n'"
          placeholder="Type a message..."
          rows="1"
          class="w-full px-4 py-2 border border-gray-300 rounded-full resize-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 max-h-32"
          style="min-height: 40px;"
        ></textarea>
      </div>

      <!-- Send button -->
      <button 
        @click="sendMessage" 
        :disabled="!canSend"
        :class="[
          'p-2 rounded-full transition-all duration-200 flex items-center justify-center',
          canSend 
            ? 'bg-primary-500 text-white hover:bg-primary-600 transform hover:scale-105' 
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        ]"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { getFileType, formatFileSize } from '@/lib/utils.js'

const emit = defineEmits(['sendMessage'])

const messageText = ref('')
const selectedFile = ref(null)
const showAttachments = ref(false)

const canSend = computed(() => {
  return messageText.value.trim() || selectedFile.value
})

const sendMessage = () => {
  if (!canSend.value) return

  const messageData = {
    type: selectedFile.value ? getFileType(selectedFile.value) : 'text',
    content: messageText.value.trim() || (selectedFile.value ? `Sent ${selectedFile.value.name}` : ''),
    file_url: selectedFile.value ? URL.createObjectURL(selectedFile.value) : null,
    file_name: selectedFile.value?.name || null,
    file_size: selectedFile.value?.size || null
  }

  emit('sendMessage', messageData)
  clearInput()
}

const handleFileUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    selectedFile.value = file
    showAttachments.value = false
  }
  event.target.value = ''
}

const removeFile = () => {
  selectedFile.value = null
}

const clearInput = () => {
  messageText.value = ''
  selectedFile.value = null
  showAttachments.value = false
}

const getFileIcon = (file) => {
  const type = getFileType(file)
  const icons = {
    image: '🖼️',
    video: '🎬',
    document: '📄'
  }
  return icons[type] || '📄'
}

const handleClickOutside = (e) => {
  if (!e.target.closest('.relative')) {
    showAttachments.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>