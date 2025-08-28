<template>
  <div class="p-6 bg-white dark:bg-gray-800 h-full">
    <ProfileSkeletonLoader v-if="loading" />
    <div v-else-if="currentUser">
      <div class="flex items-center space-x-4">
        <img 
          :src="currentUser.avatar_url" 
          :alt="currentUser.name" 
          class="w-24 h-24 rounded-full"
        >
        <div class="flex-1 min-w-0">
          <h1 class="text-2xl font-bold text-gray-900 dark:text-white truncate">
            {{ currentUser.name }}
          </h1>
          <p class="text-sm text-gray-500 dark:text-gray-400">{{ getRoleName(currentUser.role) }}</p>
        </div>
      </div>
      
      <div class="mt-8 space-y-6">
        <div>
          <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">Email</h3>
          <p class="mt-1 text-lg text-gray-900 dark:text-white">{{ currentUser.id }}</p>
        </div>
        <div>
          <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">Phone</h3>
          <p class="mt-1 text-lg text-gray-900 dark:text-white">(123) 456-7890</p>
        </div>
        <div>
          <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">Social</h3>
          <div class="mt-1 flex space-x-4">
            <a href="#" class="text-gray-400 hover:text-gray-500">
              <span class="sr-only">Twitter</span>
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
            <a href="#" class="text-gray-400 hover:text-gray-500">
              <span class="sr-only">LinkedIn</span>
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fill-rule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clip-rule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
      </div>
      
      <div class="mt-8">
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
  </div>
</template>

<script setup>
import { useTheme } from '@/composables/useTheme.js'
import { getRoleName } from '@/lib/utils.js'
import ProfileSkeletonLoader from '@/components/chat/ProfileSkeletonLoader.vue'

const props = defineProps({
  currentUser: Object,
  loading: Boolean
})

const { theme, toggleTheme } = useTheme()
</script>
