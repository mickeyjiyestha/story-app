<template>
  <link
    rel="stylesheet"
    href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
  />
  <div class="card-wrapper" v-if="story">
    <div class="card" style="cursor: pointer" @click="navigateToStory">
      <div class="image-container position-relative">
        <img
          :src="getImageUrl(story.images[0]?.url)"
          class="card-img-top card-image"
          alt="Story Image"
        />
        <div class="bookmark-icon" @click.stop="handleBookmark">
          <bookmark :class="{ 'bookmark-icon-black': isBookmarked }"></bookmark>
        </div>
      </div>
      <div class="card-body">
        <h5 class="card-title text-truncate">
          {{ story.title || "Untitled" }}
        </h5>
        <p class="card-text">{{ truncateContent(story.content) }}</p>
      </div>
      <div class="footer-card">
        <div class="user-info">
          <img
            :src="getUserAvatarUrl(story.user.avatar)"
            class="profile-pic rounded-circle"
            alt="Profile Picture"
          />
          <div class="user-details">
            <h5 class="mb-0 username text-truncate">
              {{ story.user.username || "Guest" }}
            </h5>
            <p class="mb-0 date">{{ story.created_at }}</p>
          </div>
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
import { useRuntimeConfig } from "#app";

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

    if (response.ok) {
      alert("Story bookmarked successfully!");
    } else {
      const errorData = await response.json();
      alert(`Failed to bookmark story: ${errorData.message}`);
    }
  } catch (error) {
    console.error("Error bookmarking story:", error);
    alert("An error occurred while bookmarking the story.");
  }
};
</script>

<style scoped>
/* Desktop Styles */
.card-wrapper {
  width: 500px;
  flex-shrink: 0;
  margin: 0 15px;
}

.card-image:hover {
  opacity: 0.5;
}

.image-container:hover .bookmark-icon {
  transform: translateY(-10px);
}

.card:hover .card-title {
  color: green;
}

.image-container {
  position: relative;
  width: 100%;
  height: 500px;
  overflow: hidden;
}

.card-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 15px 15px 0 0;
}

.card {
  border: none;
  width: 100%;
  height: auto;
  background: #ffffff;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
}

.card-title {
  margin-bottom: 10px;
  font-size: 25px;
  font-weight: bold;
  color: #333;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}

.card-text {
  font-size: 14px;
  color: #6c757d;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  height: 63px;
}

.card-body {
  padding: 15px;
  flex: 0 0 auto;
}

.footer-card {
  padding: 12px 15px;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 8px;
  max-width: 60%;
}

.user-details {
  display: flex;
  flex-direction: column;
  min-width: 0;
  flex: 1;
}

.profile-pic {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
}

.username {
  font-size: 20px;
  color: #333;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.date {
  font-size: 14px;
  color: #666;
}

.category {
  background-color: #f0f5ed;
  color: #466543;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 20px;
  font-weight: 500;
  white-space: nowrap;
}

.bookmark-icon {
  position: absolute;
  bottom: 30px;
  right: 20px;
  background-color: rgba(70, 101, 67, 0.9);
  border-radius: 50%;
  padding: 8px;
  cursor: pointer;
  transform: translateY(0);
  transition: all 0.3s ease;
  backdrop-filter: blur(4px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 10;
}

.bookmark-icon:active {
  transform: scale(0.95);
}

/* Media Queries untuk Mobile */
@media screen and (max-width: 768px) {
  .card-wrapper {
    width: 280px;
    margin: 0 10px;
  }

  .image-container {
    width: 280px;
    height: 280px;
  }

  .card-body {
    padding: 12px;
  }

  .card-title {
    font-size: 16px;
    margin-bottom: 8px;
  }

  .card-text {
    font-size: 13px;
    line-height: 1.4;
    margin-bottom: 0;
    height: auto;
    max-height: 54px;
  }

  .footer-card {
    padding: 10px 12px;
    flex-direction: column;
    gap: 8px;
    align-items: flex-start;
  }

  .user-info {
    width: 100%;
    max-width: 100%;
  }

  .profile-pic {
    width: 28px;
    height: 28px;
  }

  .username {
    font-size: 13px;
  }

  .date {
    font-size: 11px;
  }

  .category {
    width: 100%;
    text-align: center;
    padding: 4px 10px;
    font-size: 11px;
  }

  .bookmark-icon {
    bottom: 10px;
    right: 10px;
    padding: 6px;
  }
}

/* Untuk layar yang sangat kecil */
@media screen and (max-width: 480px) {
  .card-wrapper {
    width: 260px;
    margin: 0 8px;
  }

  .image-container {
    width: 260px;
    height: 260px;
  }

  .card-title {
    font-size: 15px;
  }

  .card-text {
    font-size: 12px;
    max-height: 48px;
  }

  .footer-card {
    padding: 8px 10px;
  }

  .profile-pic {
    width: 24px;
    height: 24px;
  }

  .username {
    font-size: 12px;
  }

  .date {
    font-size: 10px;
  }

  .category {
    padding: 3px 8px;
    font-size: 10px;
  }
}
</style>
