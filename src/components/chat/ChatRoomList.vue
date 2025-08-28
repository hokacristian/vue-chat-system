<template>
  <div class="flex flex-col h-full bg-white dark:bg-gray-800" @click="hideContextMenu">
    <!-- Chats Section -->
    <div class="flex-1 overflow-hidden">
      <div class="px-6 py-4 border-b border-gray-100 dark:border-gray-700">
        <h2 class="text-lg font-medium text-gray-900 dark:text-white">Chats</h2>
        <div class="mt-2">
          <input 
            type="text" 
            v-model="searchQuery"
            placeholder="Search chats..."
            class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          />
        </div>
      </div>
      
      <div class="flex-1 overflow-y-auto px-4 py-2 space-y-1">
        <template v-if="loading">
          <SkeletonLoader v-for="n in 5" :key="n" />
        </template>
        <template v-else>
          <div 
            v-for="room in filteredRooms" 
            :key="room.id"
            class="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors duration-200"
            @click.stop="$emit('selectRoom', room)"
            @contextmenu.prevent="showContextMenu($event, room)"
            @touchstart="onTouchStart($event, room)"
            @touchend="onTouchEnd"
          >
            <div class="relative flex-shrink-0">
              <img 
                :src="getRoomAvatarUrl(room, currentUser)" 
                :alt="getRoomDisplayName(room, currentUser)"
                class="avatar-md"
              >
              <div v-if="room.unread_count > 0" 
                   class="absolute -top-1 -right-1 bg-primary-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                {{ room.unread_count > 99 ? '99+' : room.unread_count }}
              </div>
            </div>
            
            <div class="flex-1 min-w-0">
              <div class="flex items-center justify-between mb-1">
                <h3 class="text-sm font-semibold text-gray-900 dark:text-white truncate">
                  {{ getRoomDisplayName(room, currentUser) }}
                </h3>
                <span class="text-xs text-gray-500 dark:text-gray-400 flex-shrink-0">
                  {{ formatRelativeTime(getLastMessage(room).created_at) }}
                </span>
              </div>
              
              <div class="flex items-center space-x-1">
                <span 
                  v-if="getLastMessage(room).type !== 'text'" 
                  class="text-sm"
                >
                  {{ getMediaIndicator(getLastMessage(room).type) }}
                </span>
                <p class="text-sm text-gray-600 dark:text-gray-300 truncate">
                  {{ getLastMessage(room).content }}
                </p>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
    <ContextMenu 
      :show="contextMenu.show" 
      :x="contextMenu.x" 
      :y="contextMenu.y"
      :items="contextMenuItems"
      @select="onContextMenuSelect"
    />
    <ConfirmationDialog
      :show="confirmation.show"
      :title="confirmation.title"
      :message="confirmation.message"
      @confirm="onConfirm"
      @cancel="onCancel"
    />
  </div>
</template>

<script setup>
import { ref, computed, reactive } from 'vue'
import { useRoom } from '@/composables/useRoom.js'
import { formatRelativeTime, getRoleName, getMediaIndicator } from '@/lib/utils.js'
import ContextMenu from './ContextMenu.vue'
import ConfirmationDialog from './ConfirmationDialog.vue'
import SkeletonLoader from './SkeletonLoader.vue'

const props = defineProps({
  rooms: Array,
  currentUser: Object,
  loading: Boolean
})

const emit = defineEmits(['selectRoom', 'archive-room', 'delete-room'])

const { getRoomDisplayName, getRoomAvatarUrl, getLastMessage } = useRoom()

const searchQuery = ref('')

const filteredRooms = computed(() => {
  if (!props.rooms) return []
  if (!searchQuery.value) {
    return props.rooms
  }
  return props.rooms.filter(room => {
    const roomName = getRoomDisplayName(room, props.currentUser).toLowerCase()
    return roomName.includes(searchQuery.value.toLowerCase())
  })
})

const contextMenu = reactive({
  show: false,
  x: 0,
  y: 0,
  selectedRoom: null
})

const contextMenuItems = [
  { label: 'Archive', event: 'archive' },
  { label: 'Delete', event: 'delete', danger: true }
]

const confirmation = reactive({
  show: false,
  title: '',
  message: '',
  action: null
})

let touchTimer = null

const showContextMenu = (event, room) => {
  hideContextMenu()
  contextMenu.show = true
  contextMenu.x = event.clientX
  contextMenu.y = event.clientY
  contextMenu.selectedRoom = room
}

const hideContextMenu = () => {
  contextMenu.show = false
}

const onTouchStart = (event, room) => {
  touchTimer = setTimeout(() => {
    showContextMenu(event.touches[0], room)
  }, 500) // 500ms for long press
}

const onTouchEnd = () => {
  if (touchTimer) {
    clearTimeout(touchTimer)
    touchTimer = null
  }
}

const onContextMenuSelect = (event) => {
  if (event === 'archive') {
    onArchive()
  } else if (event === 'delete') {
    onDelete()
  }
}

const onArchive = () => {
  if (contextMenu.selectedRoom) {
    confirmation.show = true
    confirmation.title = 'Archive Chat'
    confirmation.message = 'Are you sure you want to archive this chat?'
    confirmation.action = () => {
      emit('archive-room', contextMenu.selectedRoom.id)
    }
    hideContextMenu()
  }
}

const onDelete = () => {
  if (contextMenu.selectedRoom) {
    confirmation.show = true
    confirmation.title = 'Delete Chat'
    confirmation.message = 'Are you sure you want to delete this chat?'
    confirmation.action = () => {
      emit('delete-room', contextMenu.selectedRoom.id)
    }
    hideContextMenu()
  }
}

const onConfirm = () => {
  if (confirmation.action) {
    confirmation.action()
  }
  onCancel()
}

const onCancel = () => {
  confirmation.show = false
  confirmation.title = ''
  confirmation.message = ''
  confirmation.action = null
}
</script>