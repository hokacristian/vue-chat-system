<template>
  <div class="flex flex-col h-full bg-white dark:bg-gray-800" @click="hideContextMenu">
    <!-- Header -->
    <div class="flex-shrink-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
      <h2 class="text-lg font-medium text-gray-900 dark:text-white">Archived Chats</h2>
    </div>

    <!-- Chats Section -->
    <div class="flex-1 overflow-y-auto px-4 py-2 space-y-1">
      <template v-if="loading">
        <SkeletonLoader v-for="n in 5" :key="n" />
      </template>
      <template v-else>
        <div v-if="!rooms || rooms.length === 0" class="flex items-center justify-center h-full">
          <p class="text-gray-500 dark:text-gray-400">There are no archived chats at the moment.</p>
        </div>
        <div 
          v-else
          v-for="room in rooms" 
          :key="room.id"
          class="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors duration-200"
          @click.stop="$emit('selectRoom', room)"
          @contextmenu.prevent="showContextMenu($event, room)"
        >
          <div class="relative flex-shrink-0">
            <img 
              :src="getRoomAvatarUrl(room, currentUser)" 
              :alt="getRoomDisplayName(room, currentUser)"
              class="avatar-md"
            >
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
import { ref, reactive } from 'vue'
import { useRoom } from '@/composables/useRoom.js'
import { formatRelativeTime, getMediaIndicator } from '@/lib/utils.js'
import ContextMenu from './ContextMenu.vue'
import ConfirmationDialog from './ConfirmationDialog.vue'
import SkeletonLoader from './SkeletonLoader.vue'

const props = defineProps({
  rooms: Array,
  currentUser: Object,
  loading: Boolean
})

const emit = defineEmits(['selectRoom', 'unarchive-room', 'delete-room'])

const { getRoomDisplayName, getRoomAvatarUrl, getLastMessage } = useRoom()

const contextMenu = reactive({
  show: false,
  x: 0,
  y: 0,
  selectedRoom: null
})

const contextMenuItems = [
  { label: 'Unarchive', event: 'unarchive' },
  { label: 'Delete', event: 'delete', danger: true }
]

const confirmation = reactive({
  show: false,
  title: '',
  message: '',
  action: null
})

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

const onContextMenuSelect = (event) => {
  if (event === 'unarchive') {
    onUnarchive()
  } else if (event === 'delete') {
    onDelete()
  }
}

const onUnarchive = () => {
  if (contextMenu.selectedRoom) {
    emit('unarchive-room', contextMenu.selectedRoom.id)
    hideContextMenu()
  }
}

const onDelete = () => {
  if (contextMenu.selectedRoom) {
    confirmation.show = true
    confirmation.title = 'Delete Chat'
    confirmation.message = 'Are you sure you want to permanently delete this chat?'
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