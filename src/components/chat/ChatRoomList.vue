<template>
  <div class="flex flex-col h-full bg-white">
    <!-- Header -->
    <div class="flex-shrink-0 bg-white border-b border-gray-200 px-6 py-4">
      <div class="flex items-center space-x-3">
        <div class="relative">
          <img 
            :src="currentUser?.avatar_url" 
            :alt="currentUser?.name" 
            class="avatar-lg"
          >
          <div class="status-indicator status-online"></div>
        </div>
        <div class="flex-1 min-w-0">
          <h1 class="text-xl font-semibold text-gray-900 truncate">
            {{ currentUser?.name }}
          </h1>
          <p class="text-sm text-gray-500">{{ getRoleName(currentUser?.role) }}</p>
        </div>
      </div>
    </div>

    <!-- Chats Section -->
    <div class="flex-1 overflow-hidden">
      <div class="px-6 py-4 border-b border-gray-100">
        <h2 class="text-lg font-medium text-gray-900">Chats</h2>
      </div>
      
      <div class="flex-1 overflow-y-auto px-4 py-2 space-y-1">
        <div 
          v-for="room in rooms" 
          :key="room.id"
          class="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors duration-200"
          @click="$emit('selectRoom', room)"
        >
          <div class="relative flex-shrink-0">
            <img 
              :src="getRoomAvatarUrl(room, currentUser)" 
              :alt="getRoomDisplayName(room, currentUser)"
              class="avatar-md"
            >
            <div v-if="room.unread_count > 0" 
                 class="absolute -top-1 -right-1 bg-primary-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
              {{ room.unread_count > 99 ? '99+' : room.unread_count }}
            </div>
          </div>
          
          <div class="flex-1 min-w-0">
            <div class="flex items-center justify-between mb-1">
              <h3 class="text-sm font-semibold text-gray-900 truncate">
                {{ getRoomDisplayName(room, currentUser) }}
              </h3>
              <span class="text-xs text-gray-500 flex-shrink-0">
                {{ formatRelativeTime(getLastMessage(room, currentUser).created_at) }}
              </span>
            </div>
            
            <div class="flex items-center space-x-1">
              <span 
                v-if="getLastMessage(room, currentUser).type !== 'text'" 
                class="text-sm"
              >
                {{ getMediaIndicator(getLastMessage(room, currentUser).type) }}
              </span>
              <p class="text-sm text-gray-600 truncate">
                {{ getLastMessage(room, currentUser).content }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Online Users Indicator -->
    <div class="flex-shrink-0 px-6 py-3 bg-gray-50 border-t border-gray-200">
      <div class="flex items-center space-x-2">
        <div class="w-2 h-2 bg-green-500 rounded-full"></div>
        <span class="text-xs text-gray-600">{{ getOnlineCount() }} online</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoom } from '@/composables/useRoom.js'
import { formatRelativeTime, getRoleName, getMediaIndicator } from '@/lib/utils.js'

const props = defineProps({
  rooms: Array,
  currentUser: Object
})

const emit = defineEmits(['selectRoom'])

const { getRoomDisplayName, getRoomAvatarUrl, getLastMessage } = useRoom()

const getOnlineCount = () => {
  if (!props.rooms) return 0
  const onlineUsers = new Set()
  
  props.rooms.forEach(room => {
    room.participants.forEach(participant => {
      if (participant.is_online && participant.id !== props.currentUser?.id) {
        onlineUsers.add(participant.id)
      }
    })
  })
  
  return onlineUsers.size
}
</script>