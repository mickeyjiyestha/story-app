<template>
  <div class="bookmark">
    <img
      :src="isBookmarked ? blackBookmark : defaultBookmark"
      alt="Bookmark"
      class="responsive-image"
    />
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  isBookmarked: {
    type: Boolean,
    required: true,
  },
});

const defaultBookmark = new URL("@/assets/bookmark.png", import.meta.url).href;
const blackBookmark = new URL("@/assets/saved-bookmark.png", import.meta.url)
  .href;

console.log("Default Bookmark:", defaultBookmark);
console.log("Black Bookmark:", blackBookmark);
</script>

<style scoped>
.bookmark {
  display: flex;
  justify-content: center;
  align-items: center;
}

.responsive-image {
  max-width: 650%;
  height: auto;
  opacity: 1 !important;
  display: block !important;
}

/* Media query untuk layar kecil (mobile) */
@media (max-width: 768px) {
  .bookmark {
    width: 50px; /* Sesuaikan ukuran sesuai kebutuhan */
  }
}
</style>
