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
        <div class="bookmark-icon" @click.stop="handleBookmark">
          <bookmark></bookmark>
        </div>
      </div>
      <div class="card-body">
        <h5 class="card-title">{{ story.title || "Untitled" }}</h5>
        <p class="card-text">{{ truncateContent(story.content) }}</p>
      </div>
      <div class="footer-card">
        <div class="user-info">
          <img
            :src="story.user.avatar || '/path/to/default-avatar.jpg'"
            class="profile-pic rounded-circle"
            alt="Profile Picture"
          />
          <div class="user-details">
            <h5 class="mb-0 username">{{ story.user.username || "Guest" }}</h5>
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

const router = useRouter();
const authStore = useAuthStore();

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
  const apiBaseUrl = "https://2cda-103-19-231-235.ngrok-free.app";
  return `${apiBaseUrl}${url}`;
};

const truncateContent = (content) => {
  if (!content) return "No content available";
  if (window.innerWidth <= 768) {
    return content.length > 100 ? content.slice(0, 100) + "..." : content;
  }
  return content.length > 200 ? content.slice(0, 200) + "..." : content;
};

const navigateToStory = () => {
  router.push({ path: `/detail`, query: { storyId: props.story.id } });
};

const handleBookmark = async () => {
  const apiBaseUrl = "https://2cda-103-19-231-235.ngrok-free.app";
  const token = authStore.token;
  const storyId = props.story.id;

  try {
    const response = await fetch(`${apiBaseUrl}/api/bookmarks/${storyId}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

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
.card-image:hover {
  opacity: 0.5;
}

.image-container:hover .bookmark-icon {
  transform: translateY(-10px);
}

.card:hover .card-title {
  color: green;
}

.card-image {
  border-radius: 15px;
  min-height: 500px;
  min-width: 500px;
  object-fit: cover;
}

.card {
  border: none;
  width: 100%;
  margin: 0 auto;
  background: #ffffff;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.card-title {
  margin-bottom: 10px;
  font-size: 25px;
  font-weight: bold;
  color: #333;
}

.card-text {
  font-size: 14px;
  color: #6c757d;
  line-height: 1.5;
}

.card-body {
  padding: 20px;
}

.footer-card {
  padding: 15px 20px;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.user-details {
  display: flex;
  flex-direction: column;
}

.profile-pic {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.username {
  font-size: 16px;
  color: #333;
  font-weight: 600;
}

.date {
  font-size: 14px;
  color: #666;
}

.category {
  background-color: #f0f5ed;
  color: #466543;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
}

.image-container {
  position: relative;
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
  .card {
    width: 100%;
    margin: 10px 0;
    border-radius: 12px;
  }

  .card-image {
    min-height: 200px;
    min-width: 100%;
    border-radius: 12px 12px 0 0;
  }

  .card-body {
    padding: 15px;
  }

  .card-title {
    font-size: 18px;
    margin-bottom: 8px;
  }

  .card-text {
    font-size: 13px;
    line-height: 1.4;
    margin-bottom: 0;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .footer-card {
    padding: 12px 15px;
    flex-direction: column;
    gap: 10px;
  }

  .user-info {
    width: 100%;
  }

  .profile-pic {
    width: 32px;
    height: 32px;
  }

  .username {
    font-size: 14px;
  }

  .date {
    font-size: 12px;
  }

  .category {
    width: 100%;
    text-align: center;
    padding: 6px 12px;
    font-size: 12px;
    background-color: #f0f5ed;
    border-radius: 15px;
  }

  .bookmark-icon {
    bottom: 10px;
    right: 10px;
    padding: 10px;
    background-color: rgba(70, 101, 67, 0.95);
    transform: scale(1.1);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  }

  .bookmark-icon:active {
    transform: scale(1.05);
    background-color: rgba(70, 101, 67, 1);
  }
}

/* Untuk layar yang sangat kecil */
@media screen and (max-width: 480px) {
  .card {
    margin: 8px 0;
  }

  .card-image {
    min-height: 180px;
  }

  .card-body {
    padding: 12px;
  }

  .card-title {
    font-size: 16px;
  }

  .card-text {
    font-size: 12px;
    -webkit-line-clamp: 2;
  }

  .footer-card {
    padding: 10px 12px;
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
    padding: 4px 10px;
    font-size: 11px;
  }

  .bookmark-icon {
    padding: 8px;
    transform: scale(1);
  }
}
</style>
