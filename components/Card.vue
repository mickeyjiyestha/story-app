<template>
  <link
    rel="stylesheet"
    href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
  />
  <div class="d-flex" v-if="story">
    <div
      class="card"
      style="width: 18rem; cursor: pointer"
      @click="navigateToStory"
    >
      <div class="image-container position-relative">
        <img
          :src="getImageUrl(story.images[0].url)"
          class="card-img-top card-image"
          alt="Story Image"
        />
        <bookmark class="bookmark-icon"></bookmark>
        <!-- <delete class=""></delete> -->
      </div>
      <div class="card-body">
        <h5 class="card-title">{{ story.title || "Untitled" }}</h5>
        <p class="card-text">{{ truncateContent(story.content) }}</p>
        <div class="footer-card d-flex align-items-center">
          <img
            :src="story.user.avatar || '/path/to/default-avatar.jpg'"
            class="profile-pic rounded-circle"
            alt="Profile Picture"
          />
          <div class="ml-2 mr-3">
            <p class="mb-0">{{ story.user.username || "Guest" }}</p>
          </div>
          <div class="d-flex align-items-center ml-auto">
            <p class="mb-0 mr-3">
              {{ new Date(story.created_at).toLocaleDateString() }}
            </p>
            <div class="category">
              <p class="mb-0">{{ story.category.name }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

defineProps({
  story: {
    type: Object,
    required: true,
  },
  user: {
    type: Object,
    required: true,
  },
});

// Fungsi untuk mendapatkan URL gambar lengkap
const getImageUrl = (url) => {
  const apiBaseUrl = "https://23bd-103-100-175-121.ngrok-free.app"; // Ganti dengan URL API Anda
  return `${apiBaseUrl}${url}`;
};

// Fungsi untuk mendapatkan nama kategori berdasarkan ID
const getCategoryName = (categoryId) => {
  const categories = {
    1: "Romance",
    2: "Fantasy",
    3: "Adventure",
    4: "Horror",
  };
  return categories[categoryId] || "Unknown";
};

const truncateContent = (content) => {
  if (!content) return "No content available";
  return content.length > 60 ? content.slice(0, 60) + "..." : content;
};

const navigateToStory = () => {
  router.push(`/detail`);
};
</script>

<style scoped>
.card-image {
  border-radius: 15px; /* Mengatur border radius untuk gambar */
  width: 547px;
  height: 500px;
}

.card {
  border: none; /* Menghilangkan border pada card */
  width: 547px; /* Mengatur lebar card menjadi 547px */
}

.card-title {
  padding-left: 0; /* Menghilangkan padding kiri */
  padding-right: 0; /* Menghilangkan padding kanan */
}

.footer-card {
  display: flex;
  align-items: center; /* Menyelaraskan elemen secara vertikal */
  font-size: 16px; /* Ukuran font untuk footer */
}

.profile-pic {
  width: 40px; /* Lebar gambar profil */
  height: 40px; /* Tinggi gambar profil */
  border-radius: 50%; /* Membuat gambar profil menjadi bulat */
  margin-right: 10px; /* Jarak antara gambar dan nama */
}

.category {
  background-color: #f0f5ed;
  color: #466543;
  padding: 5px 10px; /* Memberikan padding pada kategori */
  border-radius: 5px; /* Membulatkan sudut kategori */
}

/* Menambahkan style untuk container gambar */
.image-container {
  position: relative; /* Membuat elemen bookmark bisa diposisikan relatif terhadap gambar */
}

/* Posisi bookmark di pojok kanan bawah */
.bookmark-icon {
  position: absolute;
  bottom: 40px; /* Menempatkan bookmark di bagian bawah */
  left: 400px;
  background-color: #466543;
  border-radius: 100%; /* Membuat bentuk bookmark melingkar */
  padding: 10px; /* Padding untuk memperbesar ikon */
  cursor: pointer; /* Menambahkan kursor pointer saat hover */
}
</style>
