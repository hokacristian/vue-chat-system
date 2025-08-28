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

  const getLastMessage = (room) => {
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