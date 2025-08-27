<template>
  <div class="chat-window">
    <div class="chat-header">
      <button @click="$emit('goBack')" class="back-btn">←</button>
      <div class="room-info">
        <img :src="getRoomAvatarUrl()" :alt="getRoomDisplayName()" class="room-avatar">
        <div>
          <h3>{{ getRoomDisplayName() }}</h3>
          <div class="participants-status">
            <UserPresence 
              v-for="participant in otherParticipants" 
              :key="participant.id"
              :user="participant"
              :showName="room.type === 'single'"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="messages-container" ref="messagesContainer">
      <MessageItem
        v-for="message in room.messages"
        :key="message.id"
        :message="message"
        :currentUser="currentUser"
        :isOwn="message.sender_id === currentUser.id"
        :sender="getSender(message.sender_id)"
      />
    </div>

    <MessageInput @sendMessage="$emit('sendMessage', $event)" />
  </div>
</template>

<script>
import MessageItem from './MessageItem.vue'
import MessageInput from './MessageInput.vue'
import UserPresence from './UserPresence.vue'

export default {
  name: 'ChatWindow',
  components: {
    MessageItem,
    MessageInput,
    UserPresence
  },
  props: {
    room: Object,
    currentUser: Object
  },
  emits: ['goBack', 'sendMessage'],
  computed: {
    otherParticipants() {
      return this.room.participants.filter(p => p.id !== this.currentUser.id)
    }
  },
  methods: {
    getSender(senderId) {
      return this.room.participants.find(p => p.id === senderId)
    },
    scrollToBottom() {
      this.$nextTick(() => {
        const container = this.$refs.messagesContainer
        if (container) {
          container.scrollTop = container.scrollHeight
        }
      })
    },
    getRoomDisplayName() {
      if (this.room.type === 'group') {
        return this.room.name
      }
      // For single chat, show the other participant's name
      const otherParticipant = this.room.participants.find(p => p.id !== this.currentUser.id)
      return otherParticipant ? otherParticipant.name : this.room.name
    },
    getRoomAvatarUrl() {
      if (this.room.type === 'group') {
        return this.room.image_url
      }
      // For single chat, show the other participant's avatar
      const otherParticipant = this.room.participants.find(p => p.id !== this.currentUser.id)
      return otherParticipant ? otherParticipant.avatar_url : this.room.image_url
    }
  },
  mounted() {
    this.scrollToBottom()
  },
  updated() {
    this.scrollToBottom()
  }
}
</script>