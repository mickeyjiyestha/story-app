<template>
  <link
    rel="stylesheet"
    href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
  />
  <div class="d-flex" v-if="story">
    <div class="card" style="cursor: pointer" @click="navigateToStory">
      <div class="image-container position-relative">
        <img
          :src="getImageUrl(story.images[0].url)"
          class="card-img-top card-image"
          alt="Story Image"
        />
        <div
          class="bookmark-icon"
          :class="{ 'white-background': isBookmarked }"
          @click.stop="handleBookmark"
        >
          <bookmark
            :isBookmarked="isBookmarked"
            @click.stop="toggleBookmark"
          ></bookmark>
        </div>
      </div>
      <div class="card-body">
        <h5 class="card-title">{{ story.title || "Untitled" }}</h5>
        <p class="card-text">{{ truncateContent(story.content) }}</p>
      </div>
      <div class="footer-card d-flex align-items-center">
        <img
          :src="getUserAvatarUrl(story.user.avatar)"
          class="profile-pic rounded-circle"
          alt="Profile Picture"
        />
        <div class="ml-2 p-username">
          <h5 class="mb-0">{{ story.user.username || "Guest" }}</h5>
        </div>
        <div class="d-flex align-items-center ml-auto">
          <p class="mb-0 p-date">{{ story.created_at }}</p>
        </div>
        <div class="category">
          <p class="mb-0">{{ story.category?.name || "Uncategorized" }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/authStore";
import { useRuntimeConfig } from "#app";

const router = useRouter();
const isBookmarked = ref(false);
const authStore = useAuthStore();
const config = useRuntimeConfig();

const props = defineProps({
  story: {
    type: Object,
    required: true,
  },
  user: {
    type: Object,
    required: true,
  },
});

const getImageUrl = (url) => {
  if (!url) return "/path/to/default-image.jpg";
  if (url.startsWith("http")) return url;
  return `${config.public.apiBaseUrl}${url}`;
};

const getUserAvatarUrl = (avatar) => {
  if (!avatar) return "/path/to/default-avatar.jpg";
  if (avatar.startsWith("http")) return avatar;
  return `${config.public.apiBaseUrl}${avatar}`;
};

const truncateContent = (content) => {
  if (!content) return "No content available";
  if (window.innerWidth <= 768) {
    return content.length > 100 ? content.slice(0, 100) + "..." : content;
  }
  return content.length > 200 ? content.slice(0, 200) + "..." : content;
};

const toggleBookmark = () => {
  if (authStore.isAuthenticated) {
    isBookmarked.value = !isBookmarked.value; // Toggle status bookmark
    handleBookmark(); // Panggil fungsi bookmark
  } else {
    router.push("/login");
  }
};

const navigateToStory = () => {
  if (authStore.isAuthenticated) {
    router.push({ path: `/detail`, query: { storyId: props.story.id } });
  } else {
    router.push("/login");
  }
};

const handleBookmark = async () => {
  const token = authStore.token;
  const storyId = props.story.id;

  try {
    const response = await fetch(
      `${config.public.apiBaseUrl}/api/bookmarks/${storyId}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "69420",
        },
      }
    );
  } catch (error) {
    console.error("Error bookmarking story:", error);
    alert("An error occurred while bookmarking the story.");
  }
};
</script>

<style scoped>
.p-date {
  font-size: 14px;
  white-space: nowrap;
  margin-left: auto;
  font-size: 20px;
}

.p-username {
  font-size: 20%;
  margin-left: 10px;
}

.card-image:hover {
  opacity: 0.5;
}

.image-container:hover .bookmark-icon {
  transform: translateY(-10px); /* Naik ke atas */
}

.card:hover .card-title {
  color: green;
}

.white-background {
  background-color: white !important;
}

.card-image {
  border-radius: 10px;
  min-height: 500px;
  min-width: 500px;
  object-fit: cover;
}

.card {
  border: none;
  width: 550px;
  margin: 0 auto;
}

.card-title {
  margin-bottom: 10px;
  font-size: 25px;
  font-weight: bold;
}

.card-text {
  font-size: 14px;
  color: #6c757d;
  line-height: 1.5;
}

.footer-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
}

.profile-pic {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.category {
  background-color: #f0f5ed;
  color: #466543;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 20px;
  margin-left: 15px;
}

.image-container {
  position: relative;
}

.bookmark-icon {
  position: absolute;
  bottom: 30px;
  right: 20px;
  background-color: #466543;
  border-radius: 50%;
  padding: 8px;
  cursor: pointer;
  transform: translateY(0); /* Posisi awal */
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1); /* Animasi lebih smooth */
}
</style>
