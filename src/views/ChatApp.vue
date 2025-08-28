<template>
  <div class="h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
    <Navbar 
      :mobile-menu-open="mobileMenuOpen"
      @navigate="navigate"
      @toggle-mobile-menu="toggleMobileMenu"
    />
    <main class="flex-1 overflow-hidden">
      <template v-if="currentPage === 'Profile'">
        <Profile />
      </template>
      <template v-else-if="currentPage === 'Archived'">
        <ArchivedList 
          :rooms="chat.archivedRooms.value" 
          :current-user="chat.currentUser.value"
          @select-room="chat.selectRoom"
          @unarchive-room="chat.unarchiveRoom"
          @delete-room="chat.deleteRoom"
        />
      </template>
      <template v-else>
        <div v-if="!chat.currentRoom.value" class="h-full">
          <ChatRoomList 
            :rooms="filteredRooms" 
            :current-user="chat.currentUser.value"
            @select-room="chat.selectRoom"
            @archive-room="chat.archiveRoom"
            @delete-room="chat.deleteRoom"
          />
        </div>
        <div v-else class="h-full">
          <ChatWindow 
            :room="chat.currentRoom.value" 
            :current-user="chat.currentUser.value"
            @go-back="chat.goBack"
            @send-message="chat.sendMessage"
          />
        </div>
      </template>
    </main>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import Navbar from '@/components/Navbar.vue'
import ChatRoomList from '@/components/chat/ChatRoomList.vue'
import ArchivedList from '@/components/chat/ArchivedList.vue'
import ChatWindow from '@/components/chat/ChatWindow.vue'
import Profile from '@/views/Profile.vue'
import { useChat } from '@/composables/useChat.js'
import { useTheme } from '@/composables/useTheme.js'
import chatData from '@/data/dummy.json'

const chat = useChat()
useTheme()

const currentPage = ref('All chat')
const mobileMenuOpen = ref(false)

const navigate = (page) => {
  currentPage.value = page
  mobileMenuOpen.value = false
  if (page !== 'All chat' && page !== 'Group' && page !== 'Archived') {
    chat.goBack()
  }
}

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const filteredRooms = computed(() => {
  if (currentPage.value === 'Group') {
    return chat.rooms.value.filter(room => room.type === 'group')
  }
  return chat.rooms.value
})

onMounted(() => {
  chat.currentUser.value = chatData.current_user
  chat.rooms.value = chatData.rooms
})
</script>