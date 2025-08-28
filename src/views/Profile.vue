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
          <p class="text-sm text-gray-500 dark:text-gray-400 flex items-center space-x-1">
            <UserIcon class="w-4 h-4" />
            <span>{{ getRoleName(currentUser.role) }}</span>
          </p>
        </div>
      </div>
      
      <div class="mt-8 space-y-6">
        <!-- Email -->
        <div>
          <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">Email</h3>
          <p class="mt-1 text-lg text-gray-900 dark:text-white flex items-center space-x-2">
            <MailIcon class="w-5 h-5 text-gray-500" />
            <span>{{ currentUser.id }}</span>
          </p>
        </div>

        <!-- Phone -->
        <div>
          <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">Phone</h3>
          <p class="mt-1 text-lg text-gray-900 dark:text-white flex items-center space-x-2">
            <PhoneIcon class="w-5 h-5 text-gray-500" />
            <span>(123) 456-7890</span>
          </p>
        </div>

        <!-- Social -->
        <div>
          <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">Social</h3>
          <div class="mt-1 flex flex-col space-y-2">
            <a href="https://www.linkedin.com/in/hokacsa/" target="_blank" class="flex items-center space-x-2 text-primary-500 hover:underline">
              <LinkedinIcon class="w-5 h-5" />
              <span>LinkedIn: hokacsa</span>
            </a>
            <a href="https://github.com/hokacristian" target="_blank" class="flex items-center space-x-2 text-primary-500 hover:underline">
              <GithubIcon class="w-5 h-5" />
              <span>GitHub: hokacristian</span>
            </a>
            <a href="https://www.hokacristian.dev" target="_blank" class="flex items-center space-x-2 text-primary-500 hover:underline">
              <GlobeIcon class="w-5 h-5" />
              <span>Website: hokacristian.dev</span>
            </a>
          </div>
        </div>
      </div>
      
      <!-- Theme -->
      <div class="mt-8">
        <h2 class="text-lg font-medium text-gray-900 dark:text-white">Theme Settings</h2>
        <div class="mt-4 flex items-center justify-between">
          <span class="text-sm text-gray-600 dark:text-gray-300 flex items-center space-x-2">
            <MoonIcon v-if="theme === 'dark'" class="w-5 h-5" />
            <SunIcon v-else class="w-5 h-5" />
            <span>Enable Dark Mode</span>
          </span>
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

// import icon dari lucide-vue-next
import { MailIcon, PhoneIcon, UserIcon, LinkedinIcon, GithubIcon, GlobeIcon, MoonIcon, SunIcon } from 'lucide-vue-next'

const props = defineProps({
  currentUser: Object,
  loading: Boolean
})

const { theme, toggleTheme } = useTheme()
</script>
