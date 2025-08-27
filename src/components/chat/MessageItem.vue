<template>
  <div :class="['flex', isOwn ? 'justify-end' : 'justify-start']">
    <div :class="['flex space-x-2 max-w-xs sm:max-w-md lg:max-w-lg', isOwn ? 'flex-row-reverse space-x-reverse' : '']">
      <!-- Avatar for other users -->
      <div v-if="!isOwn && showAvatar" class="flex-shrink-0">
        <img 
          :src="sender?.avatar_url" 
          :alt="sender?.name" 
          class="avatar-sm"
        >
      </div>
      
      <!-- Message bubble -->
      <div class="flex flex-col">
        <!-- Sender name for group chats -->
        <div v-if="!isOwn && showAvatar" class="px-3 pb-1">
          <span class="text-xs font-medium text-gray-600">{{ sender?.name }}</span>
        </div>
        
        <!-- Message content -->
        <div :class="['chat-bubble', isOwn ? 'chat-bubble-own' : 'chat-bubble-other']">
          <div v-if="message.type === 'text'">
            {{ message.content }}
          </div>
          
          <MediaPreview 
            v-else
            :message="message"
            :is-own="isOwn"
          />
        </div>
        
        <!-- Message meta info -->
        <div :class="['flex items-center gap-2 px-3 pt-1', isOwn ? 'justify-end' : 'justify-start']">
          <span class="text-xs text-gray-400">
            {{ formatTime(message.created_at) }}
          </span>
          
          <!-- Message status for own messages -->
          <div v-if="isOwn" class="message-status">
            <svg v-if="message.status === 'sent'" class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
            </svg>
            
            <div v-else-if="message.status === 'delivered'" class="flex">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
              </svg>
              <svg class="w-4 h-4 -ml-1" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
              </svg>
            </div>
            
            <div v-else-if="message.status === 'read'" class="flex message-status-read">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
              </svg>
              <svg class="w-4 h-4 -ml-1" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import MediaPreview from '@/components/chat/MediaPreview.vue'
import { formatTime } from '@/lib/utils.js'

defineProps({
  message: Object,
  currentUser: Object,
  isOwn: Boolean,
  sender: Object,
  showAvatar: {
    type: Boolean,
    default: true
  }
})
</script>