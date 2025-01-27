<template>
  <div class="input-container">
    <input
      :value="modelValue"
      :type="type"
      :placeholder="placeholder"
      class="input-field"
      @input="updateValue"
    />
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
  type: {
    type: String,
    default: "text",
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
  max-width: 600px; /* Maximum width for larger screens */
  margin: 0 auto; /* Center the container */
  display: flex; /* Use flexbox for centering */
  justify-content: center; /* Center horizontally */
}

.input-field {
  width: 100%;
  min-width: 300px; /* Minimum width for mobile devices */
  max-width: 680px; /* Maximum width for desktop */
  min-height: 50px; /* Adjusted minimum height for better mobile appearance */
  padding: 12px;
  font-size: 16px;
  border: 2px solid #ccc;
  border-radius: 8px;
  outline: none;
  box-sizing: border-box;
  transition: border-color 0.3s ease-in-out;
}

.input-field:focus {
  border-color: #007bff;
}

.input-field::placeholder {
  color: #999;
}
</style>
