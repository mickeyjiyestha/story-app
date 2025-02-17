<template>
  <link
    rel="stylesheet"
    href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
  />
  <div class="d-flex" v-if="story">
    <div class="card" style="cursor: pointer" @click="navigateToStory">
      <div class="image-container">
        <img
          :src="getImageUrl(story.images?.[0]?.url || '')"
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
        <div class="footer-card">
          <img
            :src="getUserAvatarUrl(story.user.avatar)"
            class="profile-pic rounded-circle"
            alt="Profile Picture"
          />
          <div>
            <h5 class="mb-0">{{ story.user.username || "Guest" }}</h5>
          </div>
          <div class="d-flex align-items-center ml-auto">
            <p class="mb-0 p-date">{{ story.created_at }}</p>
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
import { useAuthStore } from "#build/imports";

const router = useRouter();
const authStore = useAuthStore();
const config = useRuntimeConfig();
const isBookmarked = ref(false);

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
  return url
    ? `${config.public.apiBaseUrl}${url}`
    : "/path/to/default-image.jpg";
};

// Fungsi untuk mendapatkan URL avatar
const getUserAvatarUrl = (avatar) => {
  if (!avatar) return "/path/to/default-avatar.jpg";
  if (avatar.startsWith("http")) return avatar;
  return `${config.public.apiBaseUrl}${avatar}`;
};

const truncateContent = (content) => {
  if (!content) return "No content available";
  return content.length > 200 ? content.slice(0, 200) + "..." : content;
};

const toggleBookmark = () => {
  isBookmarked.value = !isBookmarked.value; // Toggle status bookmark
  handleBookmark(); // Panggil fungsi bookmark
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

const navigateToStory = () => {
  if (authStore.isAuthenticated) {
    router.push({ path: `/detail`, query: { storyId: props.story.id } });
  } else {
    router.push("/login");
  }
};
</script>

<style scoped>
.card-image {
  border-radius: 15px;
  width: 547px;
  height: 427px;
}
.card {
  border: none;
  width: 547px;
}

.white-background {
  background-color: white !important; /* Warna putih */
}

.card-title {
  padding-left: 0;
  padding-right: 0;
}
.footer-card {
  display: flex;
  align-items: center;
  font-size: 16px;
}
.profile-pic {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}
.category {
  background-color: #f0f5ed;
  color: #466543;
  padding: 5px 10px;
  border-radius: 5px;
}

.image-container {
  position: relative;
}

.bookmark-icon {
  position: absolute;
  bottom: 40px;
  right: 30px;
  background-color: #466543;
  border-radius: 100%;
  padding: 10px;
  cursor: pointer;
}

/* Mobile Responsive Styles */
@media screen and (max-width: 768px) {
  .card {
    width: 100%;
    margin: 0;
  }

  .card-image {
    width: 100%;
    height: 300px;
    object-fit: cover;
  }

  .footer-card {
    flex-wrap: wrap;
    gap: 10px;
    font-size: 14px;
  }

  .card-body {
    padding: 15px;
  }

  .card-title {
    font-size: 16px;
  }

  .card-text {
    font-size: 14px;
  }

  .bookmark-icon {
    bottom: 20px;
    right: 20px;
    padding: 8px;
  }

  .d-flex.align-items-center.ml-auto {
    width: 100%;
    margin-left: 0 !important;
    justify-content: space-between;
    margin-top: 10px;
  }

  .category {
    padding: 4px 8px;
    font-size: 12px;
  }

  .p-date {
    font-size: 12px;
  }
}

/* Small Mobile Devices */
@media screen and (max-width: 480px) {
  .card-image {
    height: 200px;
  }

  .profile-pic {
    width: 30px;
    height: 30px;
  }

  .footer-card {
    font-size: 12px;
  }

  .bookmark-icon {
    bottom: 15px;
    right: 15px;
    padding: 6px;
  }

  .card-body {
    padding: 12px;
  }
}
</style>
