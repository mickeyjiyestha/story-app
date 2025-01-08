<template>
  <button class="btn">{{ label }}</button>
</template>

<style scoped>
.btn {
  background-color: #f0f5ed;
  color: #466543;
  border: none;
  padding: 40px 40px; /* Ubah padding untuk memperluas jarak */
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  font-size: 20px;
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
    default: "#f0f5ed", // Nilai default warna latar belakang
  },
});
</script>
