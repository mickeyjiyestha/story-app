<template>
  <div class="upload-container">
    <div class="upload-box" @click="triggerFileInput">
      <input
        type="file"
        accept="image/*"
        class="upload-input"
        @change="handleFileChange"
        ref="fileInput"
        multiple
      />
      <div class="upload-content">
        <div class="upload-icon">
          <i class="fa-solid fa-image"></i>
        </div>
        <span class="upload-text">Choose images</span>
      </div>
    </div>
    <div class="preview-container" v-if="files.length">
      <div v-for="(file, index) in files" :key="index" class="preview-item">
        <!-- Tampilkan gambar yang sudah ada dari server -->
        <img
          v-if="file.url"
          :src="file.url"
          alt="Existing Image"
          class="preview-image"
        />
        <!-- Tampilkan pratinjau gambar baru dari lokal -->
        <img v-else :src="file.preview" alt="Preview" class="preview-image" />
        <span class="file-name">{{ file.name }}</span>
        <button class="remove-btn" @click="removeFile(index)">Remove</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const emit = defineEmits(["update:modelValue"]);
const fileInput = ref(null);
const files = ref([]);

const handleFileChange = (event) => {
  const selectedFiles = Array.from(event.target.files);

  const newFiles = selectedFiles.filter(
    (newFile) => !files.value.some((f) => f.name === newFile.name)
  );

  files.value.push(
    ...newFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      name: file.name,
    }))
  );

  emit(
    "update:modelValue",
    files.value.map((f) => f.file || f.url) // Kirim file baru atau URL gambar yang sudah ada
  );
};

const triggerFileInput = () => {
  fileInput.value.click();
};

const removeFile = (index) => {
  files.value.splice(index, 1);
  emit(
    "update:modelValue",
    files.value.map((f) => f.file || f.url)
  );
};
</script>

<style scoped>
.upload-container {
  width: 100%;
  max-width: 400px;
}

.upload-box {
  width: 400px;
  height: 400px;
  border: 2px solid #ccc;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: relative;
}

.upload-input {
  display: none;
}

.upload-content {
  text-align: center;
}

.upload-icon {
  font-size: 40px;
  color: #999;
}

.upload-text {
  display: block;
  margin-top: 10px;
  color: #999;
}

.preview-container {
  margin-top: 20px;
}

.preview-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.preview-image {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 4px;
  margin-right: 10px;
}

.file-name {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.remove-btn {
  padding: 5px 10px;
  background-color: #ff4444;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

/* Mobile Responsive Styles */
@media screen and (max-width: 768px) {
  .upload-container {
    max-width: 100%;
    padding: 0 15px;
  }

  .upload-box {
    width: 100%;
    height: 300px;
  }

  .upload-icon {
    font-size: 32px;
  }

  .upload-text {
    font-size: 14px;
  }

  .preview-item {
    flex-direction: column;
    text-align: center;
  }

  .preview-image {
    width: 100%;
    height: 200px;
    margin-right: 0;
    margin-bottom: 10px;
  }

  .file-name {
    margin-bottom: 10px;
  }

  .remove-btn {
    width: 100%;
    padding: 8px;
  }
}

@media screen and (max-width: 480px) {
  .upload-box {
    height: 200px;
  }

  .upload-icon {
    font-size: 28px;
  }

  .preview-image {
    height: 150px;
  }
}
</style>
