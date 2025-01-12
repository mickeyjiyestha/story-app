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
        <Edit class="edit-icon"></Edit>
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
import { defineProps } from "vue";
import { useRouter } from "vue-router"; // Import useRouter
import { useAuthStore } from "@/stores/authStore"; // Adjust the import path
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

const router = useRouter(); // Initialize router

const getImageUrl = (url) => {
  const apiBaseUrl = "https://e016-103-19-231-196.ngrok-free.app";
  return `${apiBaseUrl}${url}`;
};

const truncateContent = (content) => {
  if (!content) return "No content available";
  return content.length > 200 ? content.slice(0, 200) + "..." : content;
};

const navigateToStory = () => {
  router.push({ path: `/detail`, query: { storyId: props.story.id } }); // Navigate to detail page
};

const deleteStory = async (storyId) => {
  try {
    const token = useAuthStore().token; // Retrieve the token from the Pinia store

    if (!token) {
      console.error("No authentication token found.");
      return; // Exit the function if no token is found
    }

    // Make the DELETE request to the API
    const response = await axios.delete(
      `https://e016-103-19-231-196.ngrok-free.app/api/stories/${storyId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the request headers
        },
      }
    );

    console.log("Story deleted:", response.data);

    // Refresh the page after successful deletion
    location.reload(); // This will refresh the entire page
  } catch (error) {
    console.error(
      "Error deleting story:",
      error.response ? error.response.data : error.message
    );
  }
};
</script>

<style scoped>
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
</style>
