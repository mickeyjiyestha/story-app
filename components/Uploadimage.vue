<template>
  <div class="upload-container">
    <div class="upload-box" @click="triggerFileInput">
      <input
        type="file"
        accept="image/*"
        class="upload-input"
        @change="handleFileChange"
        ref="fileInput"
      />
      <div class="upload-content">
        <div class="upload-icon">
          <i class="fa-solid fa-image"></i>
        </div>
        <span class="upload-text">Choose image</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const emit = defineEmits(["update:modelValue"]);
const fileInput = ref(null);

const handleFileChange = (event) => {
  const selectedFile = event.target.files[0];
  if (selectedFile) {
    emit("update:modelValue", selectedFile); // Emit file yang dipilih
  } else {
    emit("update:modelValue", null); // Emit null jika tidak ada file yang dipilih
  }
};

const triggerFileInput = () => {
  fileInput.value.click(); // Memicu klik pada input file
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
