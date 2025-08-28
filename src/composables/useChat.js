import { ref, computed } from 'vue'

export function useChat() {
  const loading = ref(true)
  const currentRoom = ref(null)
  const rooms = ref([])
  const archivedRooms = ref([])
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
    
    const newLastMessage = {
      id: message.id,
      content: message.content,
      type: message.type,
      created_at: message.created_at
    }
    
    currentRoom.value.last_message = newLastMessage

    // Update the room in the main rooms list to trigger reactivity
    const roomIndex = rooms.value.findIndex(r => r.id === currentRoom.value.id)
    if (roomIndex !== -1) {
      rooms.value[roomIndex] = {
        ...rooms.value[roomIndex],
        last_message: newLastMessage
      }
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

  const archiveRoom = (roomId) => {
    const roomIndex = rooms.value.findIndex(r => r.id === roomId)
    if (roomIndex !== -1) {
      const room = rooms.value[roomIndex]
      archivedRooms.value.push(room)
      rooms.value.splice(roomIndex, 1)
    }
  }

  const unarchiveRoom = (roomId) => {
    const roomIndex = archivedRooms.value.findIndex(r => r.id === roomId)
    if (roomIndex !== -1) {
      const room = archivedRooms.value[roomIndex]
      rooms.value.push(room)
      archivedRooms.value.splice(roomIndex, 1)
    }
  }

  const deleteRoom = (roomId) => {
    rooms.value = rooms.value.filter(r => r.id !== roomId)
    archivedRooms.value = archivedRooms.value.filter(r => r.id !== roomId)
  }

  return {
    loading,
    currentRoom,
    rooms,
    archivedRooms,
    currentUser,
    otherParticipants,
    selectRoom,
    goBack,
    markRoomAsRead,
    sendMessage,
    archiveRoom,
    unarchiveRoom,
    deleteRoom
  }
}