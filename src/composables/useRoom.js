export function useRoom() {
  const getRoomDisplayName = (room, currentUser) => {
    if (room.type === 'group') {
      return room.name
    }
    // For single chat, show the other participant's name
    const otherParticipant = room.participants.find(p => p.id !== currentUser.id)
    return otherParticipant ? otherParticipant.name : room.name
  }

  const getRoomAvatarUrl = (room, currentUser) => {
    if (room.type === 'group') {
      return room.image_url
    }
    // For single chat, show the other participant's avatar
    const otherParticipant = room.participants.find(p => p.id !== currentUser.id)
    return otherParticipant ? otherParticipant.avatar_url : room.image_url
  }

  const getLastMessage = (room, currentUser) => {
    if (room.type === 'group') {
      return room.last_message
    }
    // For single chat, prefer showing messages from the other person
    const messagesFromOthers = room.messages.filter(m => m.sender_id !== currentUser.id)
    if (messagesFromOthers.length > 0) {
      // Return the most recent message from other participants
      return messagesFromOthers[messagesFromOthers.length - 1]
    }
    // Fallback to regular last message if no messages from others
    return room.last_message
  }

  const getSender = (room, senderId) => {
    return room.participants.find(p => p.id === senderId)
  }

  return {
    getRoomDisplayName,
    getRoomAvatarUrl,
    getLastMessage,
    getSender
  }
}