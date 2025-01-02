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
        <img :src="file.preview" alt="Preview" class="preview-image" />
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

  // Tambahkan file baru ke dalam daftar file yang sudah ada, pastikan tidak ada duplikat
  const newFiles = selectedFiles.filter(
    (newFile) => !files.value.some((f) => f.file.name === newFile.name)
  );

  files.value.push(
    ...newFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      name: file.name,
    }))
  );

  // Emit semua file yang dipilih
  emit(
    "update:modelValue",
    files.value.map((f) => f.file)
  );
};

const triggerFileInput = () => {
  fileInput.value.click(); // Memicu klik pada input file
};

const removeFile = (index) => {
  files.value.splice(index, 1); // Hapus file dari daftar
  emit(
    "update:modelValue",
    files.value.map((f) => f.file)
  );
};
</script>

<style scoped>
.upload-container {
  width: 100%;
  max-width: 400px;
}

.upload-box {
  width: 400px; /* Atur lebar */
  height: 400px; /* Atur tinggi */
  border: 2px solid #ccc; /* Garis bersambung */
  border-radius: 8px;
  display: flex; /* Menggunakan Flexbox */
  flex-direction: column; /* Mengatur arah kolom */
  justify-content: center; /* Menyusun konten di tengah secara vertikal */
  align-items: center; /* Menyusun konten di tengah secara horizontal */
  cursor: pointer;
  position: relative;
}

.upload-input {
  display: none; /* Sembunyikan input file */
}

.upload-content {
  text-align: center; /* Menyusun teks di tengah */
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
</style>
