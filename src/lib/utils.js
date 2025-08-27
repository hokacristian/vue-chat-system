export const formatTime = (timestamp) => {
  const date = new Date(timestamp)
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

export const formatRelativeTime = (timestamp) => {
  const date = new Date(timestamp)
  const now = new Date()
  const diffHours = (now - date) / (1000 * 60 * 60)
  
  if (diffHours < 1) return 'now'
  if (diffHours < 24) return `${Math.floor(diffHours)}h ago`
  return date.toLocaleDateString()
}

export const formatLastSeen = (timestamp) => {
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

export const formatFileSize = (bytes) => {
  if (!bytes) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

export const getFileType = (file) => {
  const extension = file.name.split('.').pop().toLowerCase()
  if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(extension)) return 'image'
  if (['mp4', 'webm', 'ogg', 'avi'].includes(extension)) return 'video'
  return 'document'
}

export const getMediaIndicator = (type) => {
  const indicators = {
    image: '📷',
    video: '🎥', 
    document: '📄'
  }
  return indicators[type] || ''
}

export const getRoleName = (role) => {
  const roles = { 0: 'Admin', 1: 'Agent', 2: 'Customer', 3: 'Regular User' }
  return roles[role] || 'Unknown'
}