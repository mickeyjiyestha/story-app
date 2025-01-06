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
      <img
        src="../asset/icon/iconSuccess.png"
        alt="Success"
        class="checkmark me-2"
      />
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

    <div class="search-container mt-5">
      <div class="search-box">
        <input type="text" class="search-input" placeholder="Search Story" />
        <i class="fas fa-search search-icon"></i>
      </div>
    </div>

    <div class="d-flex justify-content-center mt-5 mb-5">
      <img src="@/assets/logo_home.svg" alt="" />
    </div>

    <!-- Latest Story  -->
    <div>
      <div class="d-flex justify-content-between">
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
        <div v-for="(story, index) in stories" :key="index" class="first-card">
          <Card
            :story="story"
            :imageSrc="story.image"
            :profilePic="story.profilePic"
          ></Card>
        </div>
      </div>
    </div>

    <!--  Comedy -->
    <div>
      <div class="d-flex justify-content-between">
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

      <!-- Kontainer untuk kartu -->
      <div class="card-container-comedy d-flex">
        <div class="first-card">
          <CardBig
            :imageSrc="comedyImage"
            :profilePic="mickeyImage"
            class="card-home"
          ></CardBig>
        </div>
        <div class="sec-card-comedy">
          <Cardsmall
            :imageSrc="comedyImage2"
            :profilePic="mickeyImage"
          ></Cardsmall>
          <Cardsmall
            :imageSrc="comedyImage3"
            :profilePic="mickeyImage"
          ></Cardsmall>
        </div>
      </div>
    </div>

    <!-- Romance -->
    <div>
      <div class="d-flex justify-content-between">
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
        <div class="first-card">
          <Card
            :imageSrc="romanceImage"
            :profilePic="mickeyImage"
            class="card-home"
          ></Card>
        </div>
        <div class="sec-card">
          <Card
            :imageSrc="romanceImage2"
            :profilePic="mickeyImage"
            class="card-home"
          ></Card>
        </div>
        <div class="sec-card">
          <Card
            :imageSrc="romanceImage3"
            :profilePic="mickeyImage"
            class="card-home"
          ></Card>
        </div>
      </div>
    </div>

    <!--  Horror -->
    <div>
      <div class="d-flex justify-content-between">
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

      <!-- Kontainer untuk kartu -->
      <div class="card-container-comedy d-flex">
        <div class="first-card">
          <CardBig
            :imageSrc="horrorImage"
            :profilePic="mickeyImage"
            class="card-home"
          ></CardBig>
        </div>
        <div class="sec-card-comedy">
          <Cardsmall
            :imageSrc="horrorImage2"
            :profilePic="mickeyImage"
          ></Cardsmall>
          <Cardsmall
            :imageSrc="horrorImage3"
            :profilePic="mickeyImage"
          ></Cardsmall>
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
        <Buttoncategory class="btn-category"></Buttoncategory>
        <Buttoncategory class="btn-category"></Buttoncategory>
        <Buttoncategory class="btn-category"></Buttoncategory>
        <Buttoncategory class="btn-category"></Buttoncategory>
        <Buttoncategory class="btn-category"></Buttoncategory>
        <Buttoncategory class="btn-category"></Buttoncategory>
      </div>
      <hr />
      <div class="d-flex p-3 justify-content-between">
        <p class="ml-5">PT. Timedoor Indonesia. All right reserved</p>
        <div class="logo-container">
          <img src="@/assets/fb.png" class="mr-3" alt="" />
          <img src="@/assets/yt.png" class="mr-3" alt="" />
          <img src="@/assets/ig.png" class="mr-3" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from "vue";
import { useAuthStore } from "@/stores/authStore";
import { fetchAllStories } from "@/services/apiService";

const authStore = useAuthStore();
const isAuthenticated = computed(() => authStore.isAuthenticated);
const user = authStore.user;

// Modal visibility
const showLoginModal = ref(false);

// Stories state
const stories = ref([]);
const apiBaseUrl = "https://fbec-103-100-175-121.ngrok-free.app"; // Ganti dengan URL API Anda
const token = authStore.token; // Asumsikan Anda memiliki token di authStore

// Close modal
const closeLoginModal = () => {
  showLoginModal.value = false;
};

onMounted(async () => {
  try {
    const storiesData = await fetchAllStories(token, apiBaseUrl); // Ambil data stories langsung
    console.log("API Response:", storiesData); // Log data stories untuk memastikan isinya

    // Validasi jika data stories ada
    if (storiesData && Array.isArray(storiesData)) {
      stories.value = storiesData; // Set data stories ke variabel stories
      console.log("Valid Stories:", stories.value); // Debugging: Log stories yang sudah di-set
    } else {
      console.error("No stories found in the response.");
    }
  } catch (error) {
    console.error("Failed to fetch stories:", error);
  }
});

// Simulasi login berhasil
const onLoginSuccess = () => {
  showLoginModal.value = true;
};

// Tampilkan modal jika sudah login
if (isAuthenticated.value) {
  onLoginSuccess();
}
</script>

<style scoped>
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
}

.sec-card {
  margin-left: 20px;
}

.latest-container h1 {
  margin-left: 100px;
}

.first-card {
  margin-left: 100px;
  margin-right: 200px;
}

.card-container {
  display: flex;
  overflow-x: auto; /* Izinkan pengguliran horizontal */
  overflow-y: hidden; /* Sembunyikan pengguliran vertikal */
  padding: 10px 0;
  margin-bottom: 10px;
  scrollbar-width: none;
}

.card-container::-webkit-scrollbar {
  display: none;
}

.card-home {
  margin-left: 20px;
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
</style>
