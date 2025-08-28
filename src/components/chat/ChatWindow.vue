<template>
  <div class="flex flex-col h-full bg-white dark:bg-gray-900">
    <!-- Header -->
    <div class="flex-shrink-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
      <div class="flex items-center space-x-3">
        <button 
          @click="$emit('goBack')" 
          class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
        >
          <svg class="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
        </button>
        
        <div class="relative flex-shrink-0">
          <img 
            :src="getRoomAvatarUrl(room, currentUser)" 
            :alt="getRoomDisplayName(room, currentUser)" 
            class="avatar-md"
          >
          <div v-if="room.type === 'single' && otherParticipant?.is_online" 
               class="status-indicator status-online"></div>
        </div>
        
        <div class="flex-1 min-w-0">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white truncate">
            {{ getRoomDisplayName(room, currentUser) }}
          </h2>
          <div v-if="room.type === 'single'" class="text-sm text-gray-500 dark:text-gray-400">
            <span v-if="otherParticipant?.is_online" class="text-green-600">
              Online
            </span>
            <span v-else>
              Last seen {{ formatLastSeen(otherParticipant?.last_active) }}
            </span>
          </div>
          <div v-else class="text-sm text-gray-500 dark:text-gray-400">
            {{ room.participants.length }} participants
          </div>
        </div>
        
        <!-- Options button -->
        <button class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
          <svg class="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path>
          </svg>
        </button>
      </div>
    </div>

    <!-- Messages -->
    <div 
      ref="messagesContainer" 
      class="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-gray-50 dark:bg-gray-800"
    >
      <MessageItem
        v-for="message in room.messages"
        :key="message.id"
        :message="message"
        :current-user="currentUser"
        :is-own="message.sender_id === currentUser.id"
        :sender="getSender(room, message.sender_id)"
        :show-avatar="room.type === 'group'"
      />
    </div>

    <!-- Message Input -->
    <div class="flex-shrink-0">
      <MessageInput @send-message="handleSendMessage" />
    </div>
  </div>
</template>

<script setup>
import { computed, nextTick, ref, watch } from 'vue'
import MessageItem from '@/components/chat/MessageItem.vue'
import MessageInput from '@/components/chat/MessageInput.vue'
import { useRoom } from '@/composables/useRoom.js'
import { formatLastSeen } from '@/lib/utils.js'

const props = defineProps({
  room: Object,
  currentUser: Object
})

const emit = defineEmits(['goBack', 'sendMessage'])

const messagesContainer = ref(null)

const { getRoomDisplayName, getRoomAvatarUrl, getSender } = useRoom()

const otherParticipant = computed(() => {
  if (props.room?.type !== 'single') return null
  return props.room.participants.find(p => p.id !== props.currentUser?.id)
})

const scrollToBottom = () => {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
  })
}

const handleSendMessage = (messageData) => {
  emit('sendMessage', messageData)
  scrollToBottom()
}

watch(() => props.room?.messages?.length, () => {
  scrollToBottom()
}, { immediate: true })
</script>