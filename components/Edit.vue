<template>
  <div class="bookmark">
    <img src="@/assets/editIcon.png" alt="Edit" class="responsive-image" />
  </div>
</template>

<style scoped>
.bookmark {
  display: flex;
  justify-content: center;
  align-items: center;
}

.responsive-image {
  max-width: 100%;
  height: auto;
}

/* Media query untuk layar kecil (mobile) */
@media (max-width: 768px) {
  .bookmark {
    width: 50px; /* Sesuaikan ukuran sesuai kebutuhan */
  }
}
</style>
