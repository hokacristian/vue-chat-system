<template>
  <nav class="bg-white dark:bg-gray-800 shadow-md">
    <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
      <div class="relative flex items-center justify-between h-16">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <!-- Mobile menu button-->
          <button @click="$emit('toggle-mobile-menu')" type="button" class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 dark:text-gray-200 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
            <span class="sr-only">Open main menu</span>
            <svg class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg class="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
          <div class="hidden sm:block sm:ml-6">
            <div class="flex space-x-4">
              <a 
                href="#" 
                @click.prevent="$emit('navigate', 'All chat')" 
                :class="['px-3 py-2 rounded-md text-sm font-medium', currentPage === 'All chat' ? 'bg-gray-900 text-white' : 'text-gray-800 dark:text-gray-300 hover:bg-gray-700 hover:text-white']"
                aria-current="page"
              >
                All chat
              </a>
              <a 
                href="#" 
                @click.prevent="$emit('navigate', 'Group')" 
                :class="['px-3 py-2 rounded-md text-sm font-medium', currentPage === 'Group' ? 'bg-gray-900 text-white' : 'text-gray-800 dark:text-gray-300 hover:bg-gray-700 hover:text-white']"
              >
                Group
              </a>
              <a 
                href="#" 
                @click.prevent="$emit('navigate', 'Archived')" 
                :class="['px-3 py-2 rounded-md text-sm font-medium', currentPage === 'Archived' ? 'bg-gray-900 text-white' : 'text-gray-800 dark:text-gray-300 hover:bg-gray-700 hover:text-white']"
              >
                Archived
              </a>
              <a 
                href="#" 
                @click.prevent="$emit('navigate', 'Profile')" 
                :class="['px-3 py-2 rounded-md text-sm font-medium', currentPage === 'Profile' ? 'bg-gray-900 text-white' : 'text-gray-800 dark:text-gray-300 hover:bg-gray-700 hover:text-white']"
              >
                Profile
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile menu, show/hide based on menu state. -->
    <div v-if="mobileMenuOpen" class="sm:hidden" id="mobile-menu">
      <div class="px-2 pt-2 pb-3 space-y-1">
        <a 
          href="#" 
          @click.prevent="$emit('navigate', 'All chat')" 
          :class="['block px-3 py-2 rounded-md text-base font-medium', currentPage === 'All chat' ? 'bg-gray-900 text-white' : 'text-gray-800 dark:text-gray-300 hover:bg-gray-700 hover:text-white']"
          aria-current="page"
        >
          All chat
        </a>
        <a 
          href="#" 
          @click.prevent="$emit('navigate', 'Group')" 
          :class="['block px-3 py-2 rounded-md text-base font-medium', currentPage === 'Group' ? 'bg-gray-900 text-white' : 'text-gray-800 dark:text-gray-300 hover:bg-gray-700 hover:text-white']"
        >
          Group
        </a>
        <a 
          href="#" 
          @click.prevent="$emit('navigate', 'Archived')" 
          :class="['block px-3 py-2 rounded-md text-base font-medium', currentPage === 'Archived' ? 'bg-gray-900 text-white' : 'text-gray-800 dark:text-gray-300 hover:bg-gray-700 hover:text-white']"
        >
          Archived
        </a>
        <a 
          href="#" 
          @click.prevent="$emit('navigate', 'Profile')" 
          :class="['block px-3 py-2 rounded-md text-base font-medium', currentPage === 'Profile' ? 'bg-gray-900 text-white' : 'text-gray-800 dark:text-gray-300 hover:bg-gray-700 hover:text-white']"
        >
          Profile
        </a>
      </div>
    </div>
  </nav>
</template>

<script setup>
defineProps({
  mobileMenuOpen: Boolean,
  currentPage: String
})
defineEmits(['navigate', 'toggle-mobile-menu'])
</script>
