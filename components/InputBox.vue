<template>
  <div class="input-container">
    <input
      :value="modelValue"
      :type="type"
      :placeholder="placeholder"
      class="input-field"
      @input="updateValue"
      :disabled="disabled"
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
  disabled: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits();

const updateValue = (event) => {
  emit("update:modelValue", event.target.value);
};
</script>

<style scoped>
.input-container {
  width: 100%;
  margin-bottom: 1rem;
}

.input-field {
  width: 100%;
  height: 48px;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.375rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.input-field:focus {
  color: #495057;
  background-color: #fff;
  border-color: #80bdff;
  outline: 0;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

.input-field:disabled {
  background-color: #e9ecef;
  opacity: 1;
}

.input-field::placeholder {
  color: #6c757d;
  opacity: 0.65;
}
</style>
