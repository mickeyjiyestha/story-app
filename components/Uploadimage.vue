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
        <img
          :src="getPreviewUrl(file)"
          :alt="file.name"
          class="preview-image"
        />
        <span class="file-name">{{ file.name }}</span>
        <button class="remove-btn" @click="removeFile(index)">Remove</button>
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
