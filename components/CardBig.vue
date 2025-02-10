<template>
  <div v-if="story" class="d-flex">
    <div class="card" style="cursor: pointer" @click="navigateToStory">
      <div class="image-container position-relative">
        <img
          :src="getImageUrl(story.images?.[0]?.url)"
          class="card-img-top card-image"
          alt="Story Image"
        />
        <bookmark class="bookmark-icon"></bookmark>
      </div>
      <div class="card-body">
        <h5 class="card-title">{{ story.title || "Untitled" }}</h5>
        <p class="card-text">{{ truncateContent(story.content) }}</p>
      </div>
      <div class="footer-card d-flex align-items-center">
        <img
          :src="getUserAvatarUrl(story.user?.avatar)"
          class="profile-pic rounded-circle"
          alt="Profile Picture"
        />
        <div class="ml-2 p-username">
          <h5 class="mb-0">{{ story.user?.username || "Guest" }}</h5>
        </div>
        <div class="d-flex align-items-center ml-auto">
          <p class="mb-0 p-date">{{ formatDate(story.created_at) }}</p>
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
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/authStore";

const router = useRouter();
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
  const apiBaseUrl = "https://2ee9-103-100-175-121.ngrok-free.app";
  return url ? `${apiBaseUrl}${url}` : "/path/to/default-image.jpg";
};

const truncateContent = (content) => {
  if (!content) return "No content available";
  return content.length > 200 ? content.slice(0, 200) + "..." : content;
};

const formatDate = (date) => {
  if (!date) return "N/A";
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(date).toLocaleDateString(undefined, options);
};

const getUserAvatarUrl = (avatar) => {
  if (!avatar) return "/path/to/default-avatar.jpg";
  if (avatar.startsWith("http")) return avatar;
  return `${config.public.apiBaseUrl}${avatar}`;
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

.card-image {
  border-radius: 15px;
  min-height: 500px;
  min-width: 500px;
  object-fit: cover;
}

.card-image:hover {
  opacity: 0.5;
}

.image-container:hover .bookmark-icon {
  transform: translateY(-10px);
}

.card {
  border: none;
  width: 100%;
  margin: 0 auto;
  margin-left: 90px;
}

.card-title {
  margin-bottom: 10px;
  font-size: 18px;
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
  bottom: 10px;
  right: 10px;
  background-color: #466543;
  border-radius: 50%;
  padding: 8px;
  cursor: pointer;
  transform: translateY(0);
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Mobile Responsive Styles */
@media screen and (max-width: 768px) {
  .card {
    margin-left: 0;
    margin-right: 0;
    width: 100%;
  }

  .card-image {
    min-height: 300px;
    min-width: 100%;
  }

  .footer-card {
    flex-wrap: wrap;
    gap: 10px;
  }

  .p-date {
    font-size: 14px;
    order: 3;
    width: 100%;
    text-align: left;
    margin-left: 0;
  }

  .category {
    font-size: 14px;
    order: 4;
    margin-left: 0;
    width: 100%;
  }

  .p-username {
    font-size: 16px;
  }

  .card-title {
    font-size: 16px;
  }

  .card-text {
    font-size: 14px;
  }
}

/* Small Mobile Devices */
@media screen and (max-width: 480px) {
  .card-image {
    min-height: 200px;
  }

  .profile-pic {
    width: 30px;
    height: 30px;
  }

  .p-username {
    font-size: 14px;
  }

  .category {
    font-size: 12px;
  }
}
</style>
