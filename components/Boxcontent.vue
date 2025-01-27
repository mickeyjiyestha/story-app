<template>
  <div class="input-container">
    <div class="toolbar">
      <button class="toolbar-button">B</button>
      <button class="toolbar-button">I</button>
      <button class="toolbar-button">U</button>
      <button class="toolbar-button">🔗</button>
      <button class="toolbar-button">☰</button>
      <button class="toolbar-button">🔄</button>
    </div>
    <textarea
      :value="modelValue"
      :placeholder="placeholder"
      class="input-field"
      @input="updateValue"
    ></textarea>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    required: true,
  },
});

const emit = defineEmits();

const updateValue = (event) => {
  emit("update:modelValue", event.target.value); // Emit event untuk mengupdate nilai
};
</script>

<style scoped>
.input-container {
  width: 100%;
  max-width: 1700px;
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
}

.toolbar {
  display: flex;
  background-color: white;
  padding: 10px;
}

.toolbar-button {
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
  margin-right: 10px;
}

.toolbar-button:hover {
  color: #007bff;
}

.input-field {
  width: 100%;
  min-height: 150px; /* Tinggi textarea */
  padding: 12px;
  font-size: 16px;
  border: none;
  outline: none;
  box-sizing: border-box;
  resize: none; /* Nonaktifkan resize */
}

.input-field::placeholder {
  color: #999;
}
</style>
