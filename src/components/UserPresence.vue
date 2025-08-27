<template>
  <div :class="['user-presence', { compact }]">
    <div class="avatar-container">
      <img :src="user.avatar_url" :alt="user.name" class="avatar">
      <div :class="['status-indicator', { online: user.is_online }]"></div>
    </div>
    
    <div v-if="showName || !compact" class="user-info">
      <span class="user-name">{{ user.name }}</span>
      <span v-if="!user.is_online" class="last-seen">
        Last seen {{ formatLastSeen(user.last_active) }}
      </span>
      <span v-else class="online-status">Online</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserPresence',
  props: {
    user: Object,
    compact: {
      type: Boolean,
      default: false
    },
    showName: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    formatLastSeen(timestamp) {
      const date = new Date(timestamp)
      const now = new Date()
      const diffMinutes = (now - date) / (1000 * 60)
      
      if (diffMinutes < 1) return 'just now'
      if (diffMinutes < 60) return `${Math.floor(diffMinutes)}m ago`
      
      const diffHours = diffMinutes / 60
      if (diffHours < 24) return `${Math.floor(diffHours)}h ago`
      
      const diffDays = diffHours / 24
      if (diffDays < 7) return `${Math.floor(diffDays)}d ago`
      
      return date.toLocaleDateString()
    }
  }
}
</script>