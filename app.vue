<template>
  <NuxtPage />
</template>

<script setup>
import { useAuthStore } from "@/stores/authStore";

const authStore = useAuthStore();
authStore.loadToken();
</script>
