<template>
  <div class="p-6 bg-white dark:bg-gray-800 h-full">
    <div class="flex items-center space-x-4">
      <img 
        :src="currentUser?.avatar_url" 
        :alt="currentUser?.name" 
        class="avatar-xl"
      >
      <div class="flex-1 min-w-0">
        <h1 class="text-2xl font-semibold text-gray-900 dark:text-white truncate">
          {{ currentUser?.name }}
        </h1>
        <p class="text-sm text-gray-500 dark:text-gray-400">{{ getRoleName(currentUser?.role) }}</p>
      </div>
    </div>
    
    <div class="mt-6">
      <h2 class="text-lg font-medium text-gray-900 dark:text-white">Theme Settings</h2>
      <div class="mt-4 flex items-center justify-between">
        <span class="text-sm text-gray-600 dark:text-gray-300">Enable Dark Mode</span>
        <button 
          @click="toggleTheme"
          class="relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-200 ease-in-out"
          :class="theme === 'dark' ? 'bg-primary-600' : 'bg-gray-200'"
        >
          <span
            class="inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-200 ease-in-out"
            :class="theme === 'dark' ? 'translate-x-6' : 'translate-x-1'"
          ></span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useTheme } from '@/composables/useTheme.js'
import { useChat } from '@/composables/useChat.js'
import { getRoleName } from '@/lib/utils.js'

const { theme, toggleTheme } = useTheme()
const { currentUser } = useChat()
</script>
