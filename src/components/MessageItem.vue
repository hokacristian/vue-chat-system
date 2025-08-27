<template>
  <div :class="['message-item', { 'own-message': isOwn }]">
    <div v-if="!isOwn && sender" class="sender-avatar">
      <img :src="sender.avatar_url" :alt="sender.name">
    </div>
    
    <div class="message-content">
      <div v-if="!isOwn && sender" class="sender-name">{{ sender.name }}</div>
      
      <div class="message-bubble">
        <div v-if="message.type === 'text'" class="text-message">
          {{ message.content }}
        </div>
        
        <MediaPreview 
          v-else
          :message="message"
        />
      </div>
      
      <div class="message-meta">
        <span class="timestamp">{{ formatTime(message.created_at) }}</span>
        <div v-if="isOwn" class="message-status">
          <span v-if="message.status === 'sent'">✓</span>
          <span v-else-if="message.status === 'delivered'">✓✓</span>
          <span v-else-if="message.status === 'read'" class="read">✓✓</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MediaPreview from './MediaPreview.vue'

export default {
  name: 'MessageItem',
  components: {
    MediaPreview
  },
  props: {
    message: Object,
    currentUser: Object,
    isOwn: Boolean,
    sender: Object
  },
  methods: {
    formatTime(timestamp) {
      const date = new Date(timestamp)
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  }
}
</script>