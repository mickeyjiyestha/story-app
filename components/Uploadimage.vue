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
      <div v-if="!files.length" class="upload-content">
        <div class="upload-icon">
          <i class="fa-solid fa-image"></i>
        </div>
        <span class="upload-text">Choose images</span>
      </div>
      <div v-else class="preview-grid">
        <div v-for="(file, index) in files" :key="index" class="preview-item">
          <img
            :src="getPreviewUrl(file)"
            :alt="file.name"
            class="preview-image"
          />
          <div class="preview-overlay">
            <span class="file-name">{{ file.name }}</span>
            <button class="remove-btn" @click.stop="removeFile(index)">
              <i class="fa-solid fa-times"></i>
            </button>
          </div>
        </div>
        <div class="add-more" @click.stop="triggerFileInput">
          <i class="fa-solid fa-plus"></i>
          <span>Add More</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onBeforeUnmount } from "vue";

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["update:modelValue", "imageDeleted"]);
const fileInput = ref(null);
const files = ref([]);

// Watch untuk menangani nilai awal dan perubahan dari parent
watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue && Array.isArray(newValue) && files.value.length === 0) {
      files.value = newValue.map((file) => {
        if (typeof file === "string") {
          return {
            url: file,
            name: file.split("/").pop() || "Image",
            isExisting: true,
          };
        } else if (file.url) {
          return {
            url: file.url,
            name: file.url.split("/").pop() || "Image",
            isExisting: true,
            id: file.id, // Menyimpan ID gambar
          };
        }
        return {
          file,
          preview: URL.createObjectURL(file),
          name: file.name,
          isNew: true,
        };
      });
    }
  },
  { immediate: true }
);

const handleFileChange = (event) => {
  const selectedFiles = Array.from(event.target.files);

  selectedFiles.forEach((file) => {
    const isDuplicate = files.value.some((f) => f.name === file.name);
    if (!isDuplicate) {
      const preview = URL.createObjectURL(file);
      files.value.push({
        file,
        preview,
        name: file.name,
        isNew: true,
      });
    }
  });

  event.target.value = "";
  updateModelValue();
};

const getPreviewUrl = (file) => {
  if (file.isExisting) {
    return file.url;
  }
  return file.preview;
};

const triggerFileInput = () => {
  fileInput.value.click();
};

const removeFile = (index) => {
  const file = files.value[index];

  // Jika file yang dihapus adalah file yang sudah ada (memiliki ID)
  if (file.isExisting && file.id) {
    emit("imageDeleted", file.id);
  }

  if (file.preview) {
    URL.revokeObjectURL(file.preview);
  }

  files.value.splice(index, 1);
  updateModelValue();
};

const updateModelValue = () => {
  const value = files.value.map((f) => {
    if (f.isExisting) {
      return {
        url: f.url,
        id: f.id,
      };
    }
    return f.file;
  });
  emit("update:modelValue", value);
};

onBeforeUnmount(() => {
  files.value.forEach((file) => {
    if (file.preview) {
      URL.revokeObjectURL(file.preview);
    }
  });
});
</script>

<style scoped>
.upload-container {
  width: 100%;
  max-width: 800px;
}

.upload-box {
  border: 2px dashed #ccc;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  cursor: pointer;
  position: relative;
  min-height: 200px;
  background: #f8f9fa;
  transition: all 0.3s ease;
}

.upload-box:hover {
  border-color: #466543;
  background: #f0f5ed;
}

.upload-input {
  display: none;
}

.upload-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
}

.upload-icon {
  font-size: 48px;
  color: #466543;
  margin-bottom: 10px;
}

.upload-text {
  font-size: 16px;
  color: #666;
}

.preview-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 15px;
  padding: 10px;
}

.preview-container {
  margin-top: 20px;
}

.preview-item {
  position: relative;
  aspect-ratio: 1;
  border-radius: 8px;
  overflow: hidden;
}

.preview-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
}

.preview-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.7);
  padding: 8px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.preview-item:hover .preview-overlay {
  opacity: 1;
}

.file-name {
  color: white;
  font-size: 12px;
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.remove-btn {
  position: absolute;
  top: 5px;
  right: 5px;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #dc3545;
  font-size: 14px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.preview-item:hover .remove-btn {
  opacity: 1;
}

.remove-btn:hover {
  background: rgba(255, 255, 255, 1);
  transform: scale(1.1);
}

.add-more {
  border: 2px dashed #ccc;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  aspect-ratio: 1;
  cursor: pointer;
  transition: all 0.3s ease;
}

.add-more:hover {
  border-color: #466543;
  background: #f0f5ed;
}

.add-more i {
  font-size: 24px;
  color: #466543;
  margin-bottom: 5px;
}

.add-more span {
  font-size: 14px;
  color: #666;
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
