<template>
  <WebHeader />
  <div class="hero d-flex p-3">
    <p class="first-hero-child">Home</p>
    <p class="hero-child">/</p>
    <p class="hero-child">{{ story?.title || "Untitled" }}</p>
  </div>
  <div class="detail-container">
    <div class="story-header">
      <div class="d-flex container-bookmark">
        <p class="date date-content">
          {{ story?.created_at || "Date not available" }}
        </p>
        <bookmark class="bookmark-icon"></bookmark>
      </div>
      <h1 class="story-title">{{ story?.title || "Untitled" }}</h1>
      <div class="author">
        <img :src="story?.user?.avatar" alt="Author Avatar" class="avatar" />
        <p>{{ story?.user?.username || "Unknown" }}</p>
      </div>
    </div>

    <div class="story-content-container">
      <div class="main-image-container" @click="toggleImageModal">
        <img
          v-if="story?.images.length > 0"
          :src="getImageUrl(story.images[0]?.url)"
          alt="Main Story Image"
          class="main-image"
        />
      </div>
      <div class="story-content">
        <p v-for="(paragraph, index) in formattedContent" :key="index">
          {{ paragraph }}
        </p>
      </div>
    </div>

    <div class="image-grid">
      <div
        v-for="(image, index) in story?.images.slice(1)"
        :key="index"
        class="image-item"
        @click="openImageModal(index + 1)"
      >
        <img :src="getImageUrl(image.url)" alt="Story Image" />
      </div>
    </div>

    <div class="similar-stories">
      <div class="d-flex justify-content-between">
        <h1 class="text-comedy">Similar Story</h1>
      </div>
      <div class="latest-container">
        <hr class="custom-hr" />
      </div>
      <div class="card-container">
        <div
          v-for="(similarStory, index) in similarStories"
          :key="similarStory.id"
          class="first-card"
        >
          <Card
            :story="similarStory"
            :imageSrc="getImageUrl(similarStory.images[0]?.url)"
            :profilePic="similarStory.user.avatar"
            :link="`/story/${similarStory.id}`"
          ></Card>
        </div>
      </div>
    </div>

    <div v-if="showImageModal" class="image-modal">
      <span class="close" @click="showImageModal = false">&times;</span>
      <img
        :src="getImageUrl(story.images[currentImageIndex]?.url)"
        alt="Story Image"
        class="modal-image"
      />
      <button @click="prevImage" :disabled="currentImageIndex === 0">
        ❮ Prev
      </button>
      <button
        @click="nextImage"
        :disabled="currentImageIndex === story.images.length - 1"
      >
        Next ❯
      </button>
    </div>
    <hr />
    <div class="d-flex p-3 justify-content-between">
      <p class="ml-5">PT. Timedoor Indonesia. All right reserved</p>
      <div class="logo-container">
        <img src="@/assets/fb.png" class="mr-3" alt="" />
        <img src="@/assets/yt.png" class="mr-3" alt="" />
        <img src="@/assets/ig.png" class="mr-3" alt="" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router"; // Import useRoute
import { useAuthStore } from "@/stores/authStore"; // Adjust the import path
import axios from "axios";
import Card from "@/components/Card.vue"; // Pastikan untuk mengimpor komponen Card

const route = useRoute(); // Initialize route
const story = ref(null); // Initialize story object as null
const formattedContent = ref([]); // Initialize formatted content
const similarStories = ref([]); // Initialize similar stories
const currentImageIndex = ref(0); // State untuk menyimpan indeks gambar saat ini
const showImageModal = ref(false); // State untuk menampilkan modal gambar

const getImageUrl = (url) => {
  const apiBaseUrl = "https://e016-103-19-231-196.ngrok-free.app"; // Base URL API
  return `${apiBaseUrl}${url}`;
};

const fetchStoryDetail = async (id) => {
  const apiBaseUrl = "https://e016-103-19-231-196.ngrok-free.app"; // Base URL API

  try {
    const response = await axios.get(
      `${apiBaseUrl}/api/stories/${id}`, // Fetch story detail
      {
        headers: {
          Authorization: `Bearer ${useAuthStore().token}`, // Include the token in the request headers
          "ngrok-skip-browser-warning": "69420",
        },
      }
    );

    if (response.data && response.data.data) {
      story.value = response.data.data.stories; // Update story with fetched data
      similarStories.value = response.data.data.simmilarStories; // Ambil cerita yang mirip
      formatContent(story.value.content); // Format the content into paragraphs
    } else {
      console.error("Unexpected response structure:", response.data);
    }
  } catch (error) {
    console.error("Error fetching story detail:", error);
  }
};

const formatContent = (content) => {
  const sentences = content
    .split(".")
    .map((sentence) => sentence.trim())
    .filter((sentence) => sentence);

  const paragraphs = [];
  const sentencesPerParagraph = 4; // Ubah ke 6 jika ingin 6 kalimat per paragraf
  for (let i = 0; i < sentences.length; i += sentencesPerParagraph) {
    paragraphs.push(
      sentences.slice(i, i + sentencesPerParagraph).join(". ") + "."
    );
  }

  formattedContent.value = paragraphs; // Simpan paragraf yang diformat
};

// Fetch story detail on component mount
onMounted(() => {
  const storyId = route.query.storyId; // Get story ID from query params
  fetchStoryDetail(storyId);
});

// Watch for changes in the route query to fetch new story details
watch(
  () => route.query.storyId,
  (newStoryId) => {
    if (newStoryId) {
      fetchStoryDetail(newStoryId);
      window.scrollTo(0, 0);
    }
  }
);
</script>

<style scoped>
.custom-hr {
  width: 90%;
  margin: 20px auto;
  border: 1px solid #ccc;
}

.bookmark-icon {
  position: absolute;
  margin-left: 1750px;
  background-color: #466543;
  border-radius: 50%;
  padding: 8px;
  cursor: pointer;
  transform: translateY(0); /* Posisi awal */
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1); /* Animasi lebih smooth */
  margin-top: 30px;
}

.hero {
  background-color: #f0f5ed;
}

.hero-child {
  margin-left: 30px;
  font-size: 20px;
}

.container-bookmark p {
  margin-left: 850px;
}

.text-comedy {
  font-family: Playfair Display, sans-serif;
  font-weight: 500;
  font-size: 45px;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
  margin-bottom: 40px;
  margin-top: 70px;
  margin-left: 100px;
}

.first-hero-child {
  margin-left: 5%;
  font-size: 20px;
}

.detail-container {
  padding: 20px;
  margin: auto;
}

.story-header {
  text-align: center;
  margin-bottom: 20px;
}

.story-title {
  font-size: 70px;
  margin: 0;
  font-family: Playfair Display, serif;
  margin-bottom: 50px;
}

.date {
  font-size: 23px;
  margin-top: 27px;
  margin-bottom: 40px;
}

.author {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 40px;
  font-size: 20px;
}

.author p {
  margin-bottom: 25px;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
  margin-bottom: 20px;
}

.story-content-container {
  display: flex; /* Menggunakan Flexbox untuk mengatur gambar dan konten */
  align-items: flex-start; /* Menjaga gambar dan konten sejajar di bagian atas */
  margin-left: 100px; /* Jarak dari kiri untuk keseluruhan konten */
}

.main-image-container {
  cursor: pointer;
  margin-right: 20px; /* Jarak antara gambar utama dan konten */
}

.main-image {
  width: 600px; /* Atur lebar gambar utama */
  height: auto;
  border-radius: 15px; /* Ubah nilai ini untuk mengatur kelengkungan sudut */
}

.story-content {
  flex: 1; /* Konten mengambil sisa ruang yang tersedia */
  font-size: 16px;
  line-height: 1.5;
  margin-left: 40px;
  margin-right: 50px;
}

.image-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(177px, 1fr));
  gap: 10px; /* Jarak antara gambar */
  margin-top: 20px; /* Jarak antara gambar utama dan gambar lainnya */
  margin-left: 110px;
}

.image-item {
  cursor: pointer;
}

.image-item img {
  width: 100%;
  height: auto;
  border-radius: 10px; /* Sudut melengkung */
}

.similar-stories {
  margin-top: 40px; /* Jarak antara detail cerita dan cerita yang mirip */
}

.card-container {
  display: flex;
  margin-right: 10px;
  overflow-x: auto;
  overflow-y: hidden;
  padding: 0 35px;
  margin-bottom: 10px;
  scrollbar-width: none;
  margin-right: 100px;
}

.first-card {
  margin-bottom: 100px;
  margin-left: 60px; /* Jarak antara kartu cerita */
}

/* Gaya untuk modal gambar */
.image-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-image {
  max-width: 90%;
  max-height: 90%;
}

.close {
  position: absolute;
  top: 20px;
  right: 30px;
  color: white;
  font-size: 30px;
  cursor: pointer;
}
</style>
