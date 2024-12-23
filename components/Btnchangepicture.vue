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
  width: 200px;
  height: 60px;
  background-color: transparent;
  color: #466543;
  padding: 15px 30px;
  font-size: 20px;
  cursor: pointer;
  border: 2px solid #466543;
  border-radius: 8px;
}
</style>
