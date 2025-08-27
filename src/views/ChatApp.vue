<template>
  <div class="h-screen bg-gray-50">
    <div v-if="!chat.currentRoom.value" class="h-full">
      <ChatRoomList 
        :rooms="chat.rooms.value" 
        :current-user="chat.currentUser.value"
        @select-room="chat.selectRoom" 
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
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import ChatRoomList from '@/components/chat/ChatRoomList.vue'
import ChatWindow from '@/components/chat/ChatWindow.vue'
import { useChat } from '@/composables/useChat.js'
import chatData from '@/data/dummy.json'

const chat = useChat()

onMounted(() => {
  chat.currentUser.value = chatData.current_user
  chat.rooms.value = chatData.rooms
})
</script>