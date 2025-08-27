<template>
  <div class="media-preview">
    <div v-if="message.type === 'image'" class="image-preview">
      <img :src="message.file_url" :alt="message.file_name" @click="openFullscreen">
      <div class="file-info">
        <span class="file-name">{{ message.file_name }}</span>
        <span class="file-size">{{ formatFileSize(message.file_size) }}</span>
      </div>
    </div>

    <div v-else-if="message.type === 'video'" class="video-preview">
      <video 
        :src="message.file_url" 
        controls 
        preload="metadata"
        @loadedmetadata="onVideoLoaded"
      >
        Your browser does not support video playback.
      </video>
      <div class="file-info">
        <span class="file-name">{{ message.file_name }}</span>
        <span class="file-size">{{ formatFileSize(message.file_size) }}</span>
      </div>
    </div>

    <div v-else-if="message.type === 'document'" class="document-preview">
      <div class="document-icon">
        📄
      </div>
      <div class="document-details">
        <div class="file-info">
          <span class="file-name">{{ message.file_name }}</span>
          <span class="file-size">{{ formatFileSize(message.file_size) }}</span>
        </div>
        <a :href="message.file_url" target="_blank" class="download-link">
          Download
        </a>
      </div>
    </div>

    <div class="message-text" v-if="message.content">
      {{ message.content }}
    </div>

    <div v-if="showFullscreen" class="fullscreen-overlay" @click="closeFullscreen">
      <img :src="message.file_url" :alt="message.file_name" class="fullscreen-image">
      <button class="close-fullscreen" @click="closeFullscreen">×</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MediaPreview',
  props: {
    message: Object
  },
  data() {
    return {
      showFullscreen: false
    }
  },
  methods: {
    formatFileSize(bytes) {
      if (!bytes) return '0 B'
      const k = 1024
      const sizes = ['B', 'KB', 'MB', 'GB']
      const i = Math.floor(Math.log(bytes) / Math.log(k))
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
    },
    openFullscreen() {
      if (this.message.type === 'image') {
        this.showFullscreen = true
      }
    },
    closeFullscreen() {
      this.showFullscreen = false
    },
    onVideoLoaded(event) {
      const video = event.target
      video.style.maxHeight = '300px'
    }
  }
}
</script>