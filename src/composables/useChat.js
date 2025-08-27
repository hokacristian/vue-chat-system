import { ref, computed } from 'vue'

export function useChat() {
  const currentRoom = ref(null)
  const rooms = ref([])
  const currentUser = ref(null)

  const otherParticipants = computed(() => {
    if (!currentRoom.value) return []
    return currentRoom.value.participants.filter(p => p.id !== currentUser.value?.id)
  })

  const selectRoom = (room) => {
    currentRoom.value = room
    markRoomAsRead(room)
  }

  const goBack = () => {
    currentRoom.value = null
  }

  const markRoomAsRead = (room) => {
    // Reset unread count to 0 when opening the room
    room.unread_count = 0
    
    // Mark all unread messages from other users as read
    const currentTime = new Date().toISOString()
    room.messages.forEach(message => {
      if (message.sender_id !== currentUser.value?.id && 
          (message.status === 'sent' || message.status === 'delivered')) {
        message.status = 'read'
        message.read_at = currentTime
      }
    })
  }

  const sendMessage = (messageData) => {
    if (!currentRoom.value) return

    const message = {
      id: Date.now(),
      type: messageData.type,
      content: messageData.content,
      sender_id: currentUser.value.id,
      status: 'sent',
      created_at: new Date().toISOString(),
      read_at: null,
      file_url: messageData.file_url || null,
      file_name: messageData.file_name || null,
      file_size: messageData.file_size || null
    }

    currentRoom.value.messages.push(message)
    currentRoom.value.last_message = {
      id: message.id,
      content: message.content,
      type: message.type,
      created_at: message.created_at
    }

    simulateMessageStatus(message)
  }

  const simulateMessageStatus = (message) => {
    setTimeout(() => {
      message.status = 'delivered'
      setTimeout(() => {
        message.status = 'read'
        message.read_at = new Date().toISOString()
      }, 5000)
    }, 2000)
  }

  return {
    currentRoom,
    rooms,
    currentUser,
    otherParticipants,
    selectRoom,
    goBack,
    markRoomAsRead,
    sendMessage
  }
}