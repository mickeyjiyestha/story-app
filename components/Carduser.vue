<template>
  <link
    rel="stylesheet"
    href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
  />
  <div class="d-flex" v-if="story">
    <div class="card mt-3" style="cursor: pointer" @click="navigateToStory">
      <div class="image-container position-relative">
        <img
          :src="getImageUrl(story.images[0].url)"
          class="card-img-top card-image"
          alt="Story Image"
        />
        <bookmark class="bookmark-icon"></bookmark>
        <delete
          class="delete-icon"
          @click.stop="deleteStory(story.id)"
        ></delete>
        <Edit
          class="edit-icon"
          @click.stop="navigateToEditStory(story.id)"
        ></Edit>
      </div>
      <div class="card-body">
        <h5 class="card-title">{{ story.title || "Untitled" }}</h5>
        <p class="card-text">{{ truncateContent(story.content) }}</p>
      </div>
      <div class="footer-card d-flex align-items-center">
        <div class="category">
          <p class="mb-0">{{ story.category.name }}</p>
        </div>
        <div class="d-flex align-items-center ml-auto">
          <p class="mb-0 p-date">{{ story.created_at }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Script remains unchanged
import { defineProps } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/authStore";
import axios from "axios";

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

const router = useRouter();

const getImageUrl = (url) => {
  const apiBaseUrl = "https://cbdf-103-100-175-121.ngrok-free.app";
  return `${apiBaseUrl}${url}`;
};

const truncateContent = (content) => {
  if (!content) return "No content available";
  return content.length > 200 ? content.slice(0, 200) + "..." : content;
};

const navigateToStory = () => {
  router.push({ path: `/detail`, query: { storyId: props.story.id } });
};

const navigateToEditStory = (storyId) => {
  router.push({ path: `/addstory`, query: { storyId } });
};

const deleteStory = async (storyId) => {
  try {
    const token = useAuthStore().token;

    if (!token) {
      console.error("No authentication token found.");
      return;
    }

    const response = await axios.delete(
      `https://cbdf-103-100-175-121.ngrok-free.app/api/stories/${storyId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Story deleted:", response.data);
    location.reload();
  } catch (error) {
    console.error(
      "Error deleting story:",
      error.response ? error.response.data : error.message
    );
  }
};
</script>

<style scoped>
/* Desktop styles remain unchanged */
.p-date {
  font-size: 20px;
  white-space: nowrap;
  margin-left: auto;
}

.p-username {
  font-size: 16px;
  margin-left: 10px;
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
  margin-right: 110px;
  margin-bottom: 20px;
  cursor: pointer;
}

.delete-icon {
  position: absolute;
  bottom: 10px;
  right: 10px;
  background-color: #466543;
  border-radius: 50%;
  padding: 8px;
  margin-right: 20px;
  margin-bottom: 20px;
  cursor: pointer;
}

.edit-icon {
  position: absolute;
  bottom: 10px;
  right: 10px;
  background-color: #466543;
  border-radius: 50%;
  padding: 8px;
  margin-right: 200px;
  margin-bottom: 20px;
  cursor: pointer;
}

/* Tablet Responsive Styles */
@media screen and (max-width: 1024px) {
  .card {
    margin-left: 20px;
    margin-right: 20px;
  }

  .card-image {
    min-width: 100%;
    min-height: 400px;
  }
}

/* Mobile Responsive Styles */
@media screen and (max-width: 768px) {
  .card {
    margin-left: 10px;
    margin-right: 10px;
  }

  .card-image {
    min-height: 300px;
    min-width: 100%;
  }

  .card-title {
    font-size: 16px;
  }

  .card-text {
    font-size: 14px;
  }

  .category {
    font-size: 16px;
  }

  .p-date {
    font-size: 16px;
  }

  .footer-card {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }

  .bookmark-icon,
  .delete-icon,
  .edit-icon {
    padding: 6px;
    margin-bottom: 10px;
  }

  .bookmark-icon {
    margin-right: 80px;
  }

  .edit-icon {
    margin-right: 140px;
  }
}

/* Small Mobile Devices */
@media screen and (max-width: 480px) {
  .card-image {
    min-height: 200px;
  }

  .card-title {
    font-size: 14px;
  }

  .card-text {
    font-size: 12px;
  }

  .category {
    font-size: 14px;
  }

  .p-date {
    font-size: 14px;
  }

  .bookmark-icon,
  .delete-icon,
  .edit-icon {
    padding: 4px;
    margin-bottom: 8px;
  }

  .bookmark-icon {
    margin-right: 60px;
  }

  .edit-icon {
    margin-right: 100px;
  }
}
</style>
