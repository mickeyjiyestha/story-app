<template>
  <div>
    <link
      href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap"
      rel="stylesheet"
    />
    <link
      href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=DM+Sans:wght@400;700&display=swap"
      rel="stylesheet"
    />
    <link
      rel="stylesheet"
      href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
    />
    <link
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
      rel="stylesheet"
    />
  </div>

  <!-- Modal untuk login success -->
  <div v-if="showLoginModal" class="modal">
    <div class="modal-content">
      <img src="" alt="Success" class="checkmark me-2" />
      <p class="modal-message my-auto">You have successfully logged in.</p>
      <i class="fa-solid fa-xmark close ms-5" @click="closeLoginModal"></i>
    </div>
  </div>
  <WebHeader></WebHeader>

  <div>
    <div v-if="isAuthenticated">
      <h2 class="text-welcome text-center mt-5">Hi, {{ user.username }}.</h2>
    </div>
    <h1 class="text-welcome text-center mt-2">Welcome To Story Time</h1>
    <p class="text-opening text-center mt-5">
      The world's most-loved social storytelling platform. Story time connects a
      global community of 90 million readers and writers
    </p>
    <p class="text-opening text-center">through the power of story.</p>

    <div class="search-container">
      <div class="search-box">
        <input
          type="text"
          class="search-input"
          placeholder="Search Story"
          v-model="searchKeyword"
          @keyup.enter="searchStories"
        />
        <i class="fas fa-search search-icon" @click="searchStories"></i>
      </div>
    </div>

    <div class="d-flex justify-content-center mt-5 mb-5">
      <img src="@/assets/logo_home.svg" alt="" class="logo-home" />
    </div>

    <!-- Latest Story  -->
    <div>
      <div class="d-flex justify-content-between section-header">
        <h1 class="text-latest">Latest Story</h1>
        <nuxt-link to="/allstory">
          <p class="text-explore">
            Explore More <i class="fa-solid fa-arrow-right"></i>
          </p>
        </nuxt-link>
      </div>
      <div class="latest-container">
        <hr class="custom-hr" />
      </div>

      <div class="card-container">
        <div
          v-for="(story, index) in categoryLatest"
          :key="index"
          class="first-card"
        >
          <Card
            :story="story"
            :imageSrc="story.image"
            :profilePic="story.profilePic"
            :link="`/story/${story.id}`"
          ></Card>
        </div>
      </div>
    </div>

    <!--  Comedy -->
    <div>
      <div class="d-flex justify-content-between section-header">
        <h1 class="text-comedy">Comedy</h1>
        <nuxt-link to="/allstory">
          <p class="text-explore">
            Explore More <i class="fa-solid fa-arrow-right"></i>
          </p>
        </nuxt-link>
      </div>
      <div class="latest-container">
        <hr class="custom-hr" />
      </div>

      <div class="card-container-comedy d-flex">
        <div class="first-card">
          <CardBig :story="categoryComedy[0]" class="card-home"></CardBig>
        </div>
        <div class="sec-card-comedy">
          <Cardsmall :story="categoryComedy[1]"></Cardsmall>
          <Cardsmall :story="categoryComedy[2]"></Cardsmall>
        </div>
      </div>
    </div>

    <!-- Romance -->
    <div>
      <div class="d-flex justify-content-between section-header">
        <h1 class="text-romance">Romance</h1>
        <nuxt-link to="/allstory">
          <p class="text-explore">
            Explore More <i class="fa-solid fa-arrow-right"></i>
          </p>
        </nuxt-link>
      </div>
      <div class="latest-container">
        <hr class="custom-hr" />
      </div>

      <div class="card-container">
        <div
          v-for="(story, index) in categoryRomance.slice(0, 3)"
          :key="index"
          class="first-card"
        >
          <Card
            :story="story"
            :imageSrc="story.image"
            :profilePic="story.profilePic"
            :link="`/story/${story.id}`"
          ></Card>
        </div>
      </div>
    </div>

    <!--  Horror -->
    <div>
      <div class="d-flex justify-content-between section-header">
        <h1 class="text-horror">Horror</h1>
        <nuxt-link to="/allstory">
          <p class="text-explore">
            Explore More <i class="fa-solid fa-arrow-right"></i>
          </p>
        </nuxt-link>
      </div>
      <div class="latest-container">
        <hr class="custom-hr" />
      </div>

      <div class="card-container-comedy d-flex">
        <div class="first-card">
          <CardBig :story="categoryHorror[0]" class="card-home"></CardBig>
        </div>
        <div class="sec-card-comedy">
          <Cardsmall :story="categoryHorror[1]"></Cardsmall>
          <Cardsmall :story="categoryHorror[2]"></Cardsmall>
        </div>
      </div>
    </div>

    <!-- Categories -->
    <div>
      <h1 class="text-horror">More Categories</h1>
      <div class="latest-container">
        <hr class="custom-hr" />
      </div>
      <div class="d-flex container-category">
        <Buttoncategory
          class="btn-category"
          :label="'Adventure'"
        ></Buttoncategory>
        <Buttoncategory
          class="btn-category"
          :label="'Fiction'"
        ></Buttoncategory>
        <Buttoncategory
          class="btn-category"
          :label="'Fantasy'"
        ></Buttoncategory>
        <Buttoncategory class="btn-category" :label="'Drama'"></Buttoncategory>
        <Buttoncategory
          class="btn-category"
          :label="'Heartfelt'"
        ></Buttoncategory>
        <Buttoncategory
          class="btn-category"
          :label="'Mystery'"
        ></Buttoncategory>
      </div>
      <hr />
      <div class="footer-content d-flex p-3 justify-content-between">
        <p class="copyright ml-5">PT. Timedoor Indonesia. All right reserved</p>
        <div class="logo-container">
          <img src="@/assets/fb.png" class="social-icon mr-3" alt="Facebook" />
          <img src="@/assets/yt.png" class="social-icon mr-3" alt="YouTube" />
          <img src="@/assets/ig.png" class="social-icon mr-3" alt="Instagram" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from "vue";
import { useAuthStore } from "@/stores/authStore";
import {
  fetchAllStories,
  fetchStoriesByKeyword,
  fetchStoriesByLatest,
  fetchStoriesByRomance,
  fetchStoriesByComedy,
  fetchStoriesByHorror,
} from "@/services/apiService";
import { useRouter } from "vue-router";

const router = useRouter();

const authStore = useAuthStore();
const isAuthenticated = computed(() => authStore.isAuthenticated);
const user = authStore.user;

const showLoginModal = ref(false);

const stories = ref([]);
const categoryLatest = ref([]);
const categoryRomance = ref([]);
const categoryComedy = ref([]);
const categoryHorror = ref([]);
const searchKeyword = ref("");
const searchResults = ref([]);

const apiBaseUrl = "https://2105-103-100-175-121.ngrok-free.app";
const token = authStore.token;

// Close modal
const closeLoginModal = () => {
  showLoginModal.value = false;
};

const searchStories = async () => {
  if (searchKeyword.value.trim()) {
    try {
      const results = await fetchStoriesByKeyword(searchKeyword.value);

      if (results && results.data && Array.isArray(results.data.stories)) {
        searchResults.value = results.data.stories;
        console.log("Search Results:", searchResults.value);

        router.push({
          path: "/allstory",
          query: { keyword: searchKeyword.value },
        });
      } else {
        console.error("No search results found.");
        searchResults.value = [];
      }
    } catch (error) {
      console.error("Error during searchStories execution:", error);
    }
  }
};

onMounted(async () => {
  try {
    // Fetch semua cerita
    const storiesData = await fetchAllStories(token, apiBaseUrl);
    if (storiesData && Array.isArray(storiesData)) {
      stories.value = storiesData;
      console.log("Fetched All Stories:", stories.value);
    } else {
      console.error("No stories found in the response.");
    }

    // Fetch cerita berdasarkan kategori
    const categoryStories = await fetchStoriesByLatest(1);
    if (categoryStories && Array.isArray(categoryStories)) {
      categoryLatest.value = categoryStories;
      console.log("Fetched Stories By Latest:", categoryLatest.value);
    } else {
      console.error("No stories found for the specified category.");
    }

    const storiesByRomance = await fetchStoriesByRomance(2);
    if (storiesByRomance && Array.isArray(storiesByRomance)) {
      categoryRomance.value = storiesByRomance;
      console.log("Fetched Stories By Romance:", categoryRomance.value);
    } else {
      console.error("No stories found for the specified category.");
    }

    const storiesByComedy = await fetchStoriesByComedy(3);
    if (storiesByComedy && Array.isArray(storiesByComedy)) {
      categoryComedy.value = storiesByComedy;
      console.log("Fetched Stories By Comedy:", categoryComedy.value);
    } else {
      console.error("No stories found for the specified category.");
    }

    const storiesByHorror = await fetchStoriesByHorror(1);
    if (storiesByHorror && Array.isArray(storiesByHorror)) {
      categoryHorror.value = storiesByHorror;
      console.log("Fetched Stories By Horror:", categoryHorror.value);
    } else {
      console.error("No stories found for the specified category.");
    }
  } catch (error) {
    console.error("Error during onMounted execution:", error);
  }
});

const onLoginSuccess = () => {
  showLoginModal.value = true;
};

if (isAuthenticated.value) {
  onLoginSuccess();
}
</script>

<style scoped>
.first-card {
  margin-left: 90px;
}

.container-category {
  margin-left: 100px;
}

.btn-category {
  margin-right: 20px;
}

.text-horror {
  font-family: Playfair Display, sans-serif;
  font-weight: 500;
  font-size: 45px;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
  margin-bottom: 40px;
  margin-top: 70px;
  margin-left: 100px;
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

.text-romance {
  font-family: Playfair Display, sans-serif;
  font-weight: 500;
  font-size: 45px;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
  margin-bottom: 40px;
  margin-top: 70px;
  margin-left: 100px;
}

.sec-card-comedy {
  margin-left: 40px;
}

.card-container-comedy {
  height: auto;
  width: auto;
  margin-right: 150px;
}

.sec-card {
  margin-left: 20px;
}

.latest-container h1 {
  margin-left: 100px;
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

.card {
  border: none;
  width: 300px;
  margin: 0;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.card-container::-webkit-scrollbar {
  display: none;
}

.text-welcome {
  font-family: Playfair Display, sans-serif;
  font-weight: 800;
  font-size: 60px;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
}

.text-explore {
  font-family: DM Sans, sans-serif;
  font-size: 25px;
  margin-right: 100px;
  margin-top: 100px;
  float: left;
  text-decoration: none;
  color: black;
}

.text-latest {
  font-family: Playfair Display, sans-serif;
  font-weight: 500;
  font-size: 45px;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
  margin-bottom: 40px;
  margin-top: 70px;
  margin-left: 100px;
}

.text-opening {
  font-family: DM Sans, sans-serif;
  font-size: 23px;
  color: #4b4b4b;
}

.search-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 0 20px;
}

.search-box {
  position: relative;
  width: 100%;
  max-width: 600px;
}

.search-input {
  width: 100%;
  padding: 12px 20px;
  font-size: 1em;
  border: 2px solid #ddd;
  border-radius: 10px;
  outline: none;
  padding-left: 40px;
  transition: border-color 0.3s;
}

.search-input:focus {
  border-color: #1e90ff;
}

.search-icon {
  position: absolute;
  right: 25px;
  top: 50%;
  transform: translateY(-50%);
  color: #888;
  font-size: 1.2em;
  pointer-events: none;
}

.custom-hr {
  width: 90%;
  margin: 20px auto;
  border: 1px solid #ccc;
}

.modal {
  display: flex;
  justify-content: center;
  align-items: start;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
}

.modal-content {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  margin: 2% auto;
  padding: 20px;
  border: none;
  max-width: 400px;
  text-align: center;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.modal-message {
  font-size: 15px;
  color: #333;
  font-weight: 600;
}

.close {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
}

/* Tablet Responsive Styles */
@media screen and (max-width: 1024px) {
  .card-container-comedy {
    flex-direction: column;
    margin-right: 20px;
  }

  .sec-card-comedy {
    margin-left: 90px;
    margin-top: 20px;
  }

  .text-explore {
    margin-right: 20px;
  }

  .container-category {
    flex-wrap: wrap;
    justify-content: center;
    margin-left: 0;
    padding: 0 20px;
  }
}

/* Mobile Responsive Styles */
@media screen and (max-width: 768px) {
  .text-welcome {
    font-size: 40px;
    padding: 0 20px;
  }

  .text-opening {
    font-size: 18px;
    padding: 0 20px;
  }

  .section-header {
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 20px;
  }

  .text-latest,
  .text-comedy,
  .text-romance,
  .text-horror {
    font-size: 35px;
    margin-left: 20px;
    margin-bottom: 10px;
    margin-top: 40px;
  }

  .text-explore {
    font-size: 18px;
    margin: 0 0 0 20px;
  }

  .first-card {
    margin-left: 20px;
  }

  .sec-card-comedy {
    margin-left: 20px;
  }

  .card-container {
    margin-right: 20px;
    padding: 0 10px;
  }

  .logo-home {
    max-width: 80%;
    height: auto;
  }

  .footer-content {
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 20px;
  }

  .copyright {
    margin: 0 0 15px 0;
  }

  .social-icon {
    width: 30px;
    height: auto;
    margin: 0 10px;
  }

  .btn-category {
    margin: 5px;
  }
}

/* Small Mobile Devices */
@media screen and (max-width: 480px) {
  .text-welcome {
    font-size: 32px;
  }

  .text-opening {
    font-size: 16px;
  }

  .text-latest,
  .text-comedy,
  .text-romance,
  .text-horror {
    font-size: 28px;
  }

  .search-box {
    max-width: 100%;
  }

  .search-input {
    font-size: 14px;
  }

  .modal-content {
    width: 90%;
    padding: 15px;
  }

  .first-card {
    margin-left: 10px;
  }

  .sec-card-comedy {
    margin-left: 10px;
  }

  .social-icon {
    width: 25px;
    margin: 0 8px;
  }
}
</style>
