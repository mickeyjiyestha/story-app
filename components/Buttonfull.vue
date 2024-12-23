<template>
  <button class="buttonfull">{{ buttonText }}</button>
</template>

<script setup>
defineProps({
  buttonText: {
    type: String,
    required: true,
  },
});
</script>

<style scoped>
.buttonfull {
  background-color: #466543;
  color: white;
  padding: 15px 30px;
  font-size: 18px;
  cursor: pointer;
  border: none;
  border-radius: 8px;
}
</style>
