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
        <bookmark class="bookmark-icon"></bookmark>
      </div>
      <div class="card-body">
        <h5 class="card-title">{{ story.title || "Untitled" }}</h5>
        <p class="card-text">{{ truncateContent(story.content) }}</p>
        <div class="footer-card">
          <img
            :src="story.user.avatar || '/path/to/default-avatar.jpg'"
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

const router = useRouter();

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
  const apiBaseUrl = "https://b39d-103-100-175-121.ngrok-free.app";
  return `${apiBaseUrl}${url}`;
};

const truncateContent = (content) => {
  if (!content) return "No content available";
  return content.length > 200 ? content.slice(0, 200) + "..." : content;
};

const navigateToStory = () => {
  router.push({ path: `/detail`, query: { storyId: props.story.id } });
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
