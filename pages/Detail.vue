<template>
  <WebHeader />
  <div class="hero d-flex p-3">
    <nuxt-link to="/">
      <p class="first-hero-child">Home</p>
    </nuxt-link>
    <p class="hero-child">/</p>
    <p class="hero-child">{{ story?.title || "Untitled" }}</p>
  </div>
  <div class="detail-container">
    <div class="story-header">
      <div class="container-bookmark">
        <p class="date">{{ story?.created_at || "Date not available" }}</p>
        <div class="bookmark-icon">
          <bookmark></bookmark>
        </div>
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
      <div class="similar-header">
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
      <div class="modal-controls">
        <button
          class="nav-button prev"
          @click="prevImage"
          :disabled="currentImageIndex === 0"
        >
          ❮
        </button>
        <button
          class="nav-button next"
          @click="nextImage"
          :disabled="currentImageIndex === story.images.length - 1"
        >
          ❯
        </button>
      </div>
    </div>

    <footer class="footer">
      <hr />
      <div class="footer-content">
        <p>PT. Timedoor Indonesia. All right reserved</p>
        <div class="social-icons">
          <img src="@/assets/fb.png" alt="Facebook" />
          <img src="@/assets/yt.png" alt="YouTube" />
          <img src="@/assets/ig.png" alt="Instagram" />
        </div>
      </div>
    </footer>
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

const openImageModal = (index) => {
  currentImageIndex.value = index; // Pastikan ini benar
  showImageModal.value = true; // Tampilkan modal
};

const toggleImageModal = () => {
  currentImageIndex.value = 0; // Set index ke 0 untuk gambar utama
  showImageModal.value = true; // Tampilkan modal
};

const nextImage = () => {
  if (currentImageIndex.value < story.value.images.length - 1) {
    currentImageIndex.value++;
  }
};

const prevImage = () => {
  if (currentImageIndex.value > 0) {
    currentImageIndex.value--;
  }
};

const getImageUrl = (url) => {
  const apiBaseUrl = "https://b39d-103-100-175-121.ngrok-free.app"; // Base URL API
  return `${apiBaseUrl}${url}`;
};

const fetchStoryDetail = async (id) => {
  const apiBaseUrl = "https://b39d-103-100-175-121.ngrok-free.app"; // Base URL API

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
/* Desktop Styles - Unchanged */
.custom-hr {
  width: 90%;
  margin: 20px auto;
  border: 1px solid #ccc;
}

.hero {
  background-color: #f0f5ed;
  padding: 15px 50px;
}

.hero-child {
  margin-left: 30px;
  font-size: 20px;
}

.first-hero-child {
  font-size: 20px;
  text-decoration: none;
  color: black;
}

.first-hero-child:hover {
  color: #466543;
}

.detail-container {
  max-width: 1440px;
  margin: 0 auto;
  padding: 20px;
}

.story-header {
  text-align: center;
  margin-bottom: 40px;
}

.container-bookmark {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin-bottom: 20px;
}

.bookmark-icon {
  position: absolute;
  right: 20px;
  background-color: #466543;
  border-radius: 50%;
  padding: 8px;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.bookmark-icon:hover {
  transform: translateY(-5px);
}

.story-title {
  font-size: 48px;
  font-family: "Playfair Display", serif;
  margin-bottom: 30px;
}

.date {
  font-size: 18px;
  color: #666;
}

.author {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-size: 18px;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.story-content-container {
  display: flex;
  gap: 40px;
  margin-bottom: 40px;
}

.main-image-container {
  flex: 0 0 50%;
  cursor: pointer;
}

.main-image {
  width: 100%;
  border-radius: 15px;
  object-fit: cover;
}

.story-content {
  flex: 1;
  font-size: 16px;
  line-height: 1.8;
}

.image-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  margin: 40px 0;
}

.image-item {
  cursor: pointer;
}

.image-item img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 10px;
  transition: opacity 0.3s ease;
}

.image-item img:hover {
  opacity: 0.8;
}

.similar-stories {
  margin: 60px 0;
}

.text-comedy {
  font-family: "Playfair Display", serif;
  font-size: 36px;
  margin-bottom: 20px;
}

.card-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
  padding: 20px 0;
}

.image-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-image {
  max-width: 90%;
  max-height: 90vh;
  object-fit: contain;
}

.modal-controls {
  position: absolute;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
}

.nav-button {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  padding: 15px 25px;
  border-radius: 50%;
  cursor: pointer;
  transition: background 0.3s ease;
}

.nav-button:hover {
  background: rgba(255, 255, 255, 0.3);
}

.nav-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.close {
  position: absolute;
  top: 20px;
  right: 30px;
  color: white;
  font-size: 40px;
  cursor: pointer;
  z-index: 1001;
}

.footer {
  margin-top: 60px;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
}

.social-icons {
  display: flex;
  gap: 20px;
}

.social-icons img {
  width: 24px;
  height: 24px;
}

/* Mobile Responsive Styles */
@media screen and (max-width: 768px) {
  .hero {
    padding: 10px 20px;
  }

  .hero-child {
    margin-left: 15px;
    font-size: 16px;
  }

  .container-bookmark {
    padding: 0 15px;
  }

  .bookmark-icon {
    right: 15px;
    padding: 6px;
  }

  .story-title {
    font-size: 32px;
    padding: 0 20px;
  }

  .date {
    font-size: 16px;
  }

  .story-content-container {
    flex-direction: column;
    gap: 20px;
  }

  .main-image-container {
    flex: none;
  }

  .main-image {
    height: 300px;
  }

  .story-content {
    padding: 0 20px;
    font-size: 15px;
  }

  .image-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 15px;
    padding: 0 20px;
  }

  .image-item img {
    height: 150px;
  }

  .text-comedy {
    font-size: 28px;
    padding: 0 20px;
  }

  .card-container {
    grid-template-columns: 1fr;
    padding: 20px;
  }

  .nav-button {
    padding: 10px 20px;
  }

  .footer-content {
    flex-direction: column;
    gap: 20px;
    text-align: center;
  }
}

@media screen and (max-width: 480px) {
  .bookmark-icon {
    padding: 5px;
    right: 10px;
  }

  .story-title {
    font-size: 24px;
  }

  .date {
    font-size: 14px;
  }

  .author {
    font-size: 14px;
  }

  .avatar {
    width: 32px;
    height: 32px;
  }

  .main-image {
    height: 250px;
  }

  .story-content {
    font-size: 14px;
  }

  .image-grid {
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 10px;
  }

  .image-item img {
    height: 120px;
  }

  .text-comedy {
    font-size: 24px;
  }

  .nav-button {
    padding: 8px 16px;
  }
}
</style>
