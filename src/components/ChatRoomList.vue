<template>
  <div class="chat-room-list">
    <div class="header">
      <div class="user-info">
        <img :src="currentUser.avatar_url" :alt="currentUser.name" class="avatar">
        <div class="user-details">
          <h2>{{ currentUser.name }}</h2>
          <span class="user-role">{{ getRoleName(currentUser.role) }}</span>
        </div>
      </div>
    </div>
    
    <div class="rooms-container">
      <h3>Chat Rooms</h3>
      <div class="rooms-list">
        <div 
          v-for="room in rooms" 
          :key="room.id"
          class="room-item"
          @click="$emit('selectRoom', room)"
        >
          <div class="room-avatar">
            <img :src="getRoomAvatarUrl(room)" :alt="getRoomDisplayName(room)">
            <span v-if="room.unread_count > 0" class="unread-badge">{{ room.unread_count }}</span>
          </div>
          
          <div class="room-info">
            <div class="room-header">
              <h4>{{ getRoomDisplayName(room) }}</h4>
              <span class="timestamp">{{ formatTime(getLastMessage(room).created_at) }}</span>
            </div>
            
            <div class="last-message">
              <span class="message-preview">
                <span v-if="getLastMessage(room).type !== 'text'" class="media-indicator">
                  {{ getMediaIndicator(getLastMessage(room).type) }}
                </span>
                {{ getLastMessage(room).content }}
              </span>
            </div>
            
            <div class="participants-status">
              <div class="online-indicators">
                <UserPresence 
                  v-for="participant in room.participants" 
                  :key="participant.id"
                  :user="participant"
                  :compact="true"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserPresence from './UserPresence.vue'

export default {
  name: 'ChatRoomList',
  components: {
    UserPresence
  },
  props: {
    rooms: Array,
    currentUser: Object
  },
  emits: ['selectRoom'],
  methods: {
    getRoleName(role) {
      const roles = { 0: 'Admin', 1: 'Agent', 2: 'Customer', 3: 'Regular User' }
      return roles[role] || 'Unknown'
    },
    formatTime(timestamp) {
      const date = new Date(timestamp)
      const now = new Date()
      const diffHours = (now - date) / (1000 * 60 * 60)
      
      if (diffHours < 1) return 'now'
      if (diffHours < 24) return `${Math.floor(diffHours)}h ago`
      return date.toLocaleDateString()
    },
    getMediaIndicator(type) {
      const indicators = {
        image: '📷',
        video: '🎥', 
        document: '📄'
      }
      return indicators[type] || ''
    },
    getRoomDisplayName(room) {
      if (room.type === 'group') {
        return room.name
      }
      // For single chat, show the other participant's name
      const otherParticipant = room.participants.find(p => p.id !== this.currentUser.id)
      return otherParticipant ? otherParticipant.name : room.name
    },
    getLastMessage(room) {
      if (room.type === 'group') {
        return room.last_message
      }
      // For single chat, prefer showing messages from the other person
      const messagesFromOthers = room.messages.filter(m => m.sender_id !== this.currentUser.id)
      if (messagesFromOthers.length > 0) {
        // Return the most recent message from other participants
        return messagesFromOthers[messagesFromOthers.length - 1]
      }
      // Fallback to regular last message if no messages from others
      return room.last_message
    },
    getRoomAvatarUrl(room) {
      if (room.type === 'group') {
        return room.image_url
      }
      // For single chat, show the other participant's avatar
      const otherParticipant = room.participants.find(p => p.id !== this.currentUser.id)
      return otherParticipant ? otherParticipant.avatar_url : room.image_url
    }
  }
}
</script>