<template>
  <button class="btn" :style="{ backgroundColor: backgroundColor }">
    {{ label }}
  </button>
</template>

<style scoped>
.btn {
  color: #466543;
  border: none;
  padding: 40px 40px; /* Ubah padding untuk memperluas jarak */
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 30px;
  margin: 4px 2px;
  cursor: pointer;
  transition: background-color 0.3s ease; /* Efek transisi halus */
}
</style>

<script setup>
import { defineProps } from "vue";

defineProps({
  label: {
    type: String,
    default: "Button", // Nilai default jika prop label tidak diberikan
  },
  backgroundColor: {
    type: String,
    default: "#f0f5ed", // Warna abu-abu sebagai default
  },
});
</script>
