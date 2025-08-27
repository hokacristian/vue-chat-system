<template>
  <div class="message-input">
    <div class="input-container">
      <button @click="toggleAttachments" class="attach-btn">📎</button>
      
      <div v-if="showAttachments" class="attachments-popup">
        <label class="attach-option">
          📷 Image
          <input type="file" accept="image/*" @change="handleFileUpload" hidden>
        </label>
        <label class="attach-option">
          🎥 Video  
          <input type="file" accept="video/*" @change="handleFileUpload" hidden>
        </label>
        <label class="attach-option">
          📄 Document
          <input type="file" accept=".pdf,.doc,.docx,.txt,.xls,.xlsx" @change="handleFileUpload" hidden>
        </label>
      </div>

      <div v-if="selectedFile" class="file-preview">
        <span>{{ selectedFile.name }}</span>
        <button @click="removeFile" class="remove-file">×</button>
      </div>

      <textarea
        v-model="messageText"
        @keydown.enter.exact.prevent="sendMessage"
        @keydown.enter.shift.exact.prevent="messageText += '\n'"
        placeholder="Type a message..."
        rows="1"
        ref="messageInput"
      ></textarea>
      
      <button @click="sendMessage" :disabled="!canSend" class="send-btn">
        ➤
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MessageInput',
  emits: ['sendMessage'],
  data() {
    return {
      messageText: '',
      selectedFile: null,
      showAttachments: false
    }
  },
  computed: {
    canSend() {
      return this.messageText.trim() || this.selectedFile
    }
  },
  methods: {
    sendMessage() {
      if (!this.canSend) return

      const messageData = {
        type: this.selectedFile ? this.getFileType(this.selectedFile) : 'text',
        content: this.messageText.trim() || (this.selectedFile ? `Sent ${this.selectedFile.name}` : ''),
        file_url: this.selectedFile ? this.createFileURL(this.selectedFile) : null,
        file_name: this.selectedFile?.name || null,
        file_size: this.selectedFile?.size || null
      }

      this.$emit('sendMessage', messageData)
      this.clearInput()
    },
    toggleAttachments() {
      this.showAttachments = !this.showAttachments
    },
    handleFileUpload(event) {
      const file = event.target.files[0]
      if (file) {
        this.selectedFile = file
        this.showAttachments = false
      }
      event.target.value = ''
    },
    removeFile() {
      this.selectedFile = null
    },
    clearInput() {
      this.messageText = ''
      this.selectedFile = null
      this.showAttachments = false
    },
    getFileType(file) {
      const extension = file.name.split('.').pop().toLowerCase()
      if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(extension)) return 'image'
      if (['mp4', 'webm', 'ogg', 'avi'].includes(extension)) return 'video'
      return 'document'
    },
    createFileURL(file) {
      return URL.createObjectURL(file)
    }
  },
  mounted() {
    document.addEventListener('click', (e) => {
      if (!this.$el.contains(e.target)) {
        this.showAttachments = false
      }
    })
  }
}
</script>