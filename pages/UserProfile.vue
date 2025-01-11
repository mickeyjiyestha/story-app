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

    <WebHeader></WebHeader>

    <div class="hero d-flex">
      <div>
        <img :src="avatar" class="profile-pic" alt="Profile Picture" />
      </div>
      <div>
        <p class="name">{{ name || "Guest" }}</p>
        <p class="email">{{ email || "No email available" }}</p>
        <div class="description-container">
          <p class="description">
            {{ about || "No description available." }}
          </p>
        </div>
      </div>
      <div class="button-container">
        <Buttonfull
          :buttonText="'Edit Profile'"
          @click="openModal"
        ></Buttonfull>
      </div>
    </div>

    <div class="d-flex container-menu">
      <Buttoncategory label="My Story" backgroundColor="#d9f8c4" />
      <Buttoncategory label="Bookmark" backgroundColor="#f8d9e0" />
    </div>

    <div class="d-flex mt-5 bottom-container justify-content-between">
      <div class="story align-items-center sticky-story">
        <h1>Write your story</h1>
        <div class="container-p">
          <p>
            Share your unique bla bla lorem ipsum Share your unique bla bla
            lorem ipsum
          </p>
        </div>
        <Buttonfull :buttonText="'Write Now'" @click="addStory"></Buttonfull>
      </div>
      <div>
        <div class="card-container" v-if="stories.length > 0">
          <div
            v-for="(story, index) in stories"
            :key="story.id"
            class="first-card"
          >
            <Carduser
              :story="story"
              :imageSrc="story.image"
              :profilePic="story.profilePic"
              @deleteStory="handleDeleteStory"
            ></Carduser>
          </div>
        </div>
        <div v-else class="containernostories">
          <h1 class="nostories-h1">No Stories Yet</h1>
          <p class="nostories-p">
            You haven't shared any stories yet. Start your fitness journey
            today!
          </p>
          <img src="@/assets/noStoies.svg" alt="" />
        </div>
      </div>
    </div>

    <!-- Pagination at the bottom -->
    <div v-if="hasMoreStories" class="pagination-container">
      <Pagination
        :totalPages="totalPages"
        :currentPage="currentPage"
        :onPageChange="loadStories"
      />
    </div>

    <!-- Modal for Edit Profile -->
    <div
      class="modal fade"
      id="editProfileModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="editProfileModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-xl" role="document">
        <div class="modal-content">
          <div>
            <button
              type="button"
              class="close"
              @click="closeModal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body d-flex" style="min-height: 600px">
            <div class="w-100">
              <div class="container-title">
                <h1 class="modal-title" id="editProfileModalLabel">
                  Edit Profile
                </h1>
              </div>
              <div class="d-flex">
                <div class="profile-modal">
                  <img
                    id="profile-pic-modal"
                    :src="avatar"
                    class="profile-pic"
                    alt="Profile Picture"
                  />
                </div>
                <Btnchangepicture
                  :buttonText="'Change Picture'"
                  class="btn-change-picture"
                  @click="triggerFileInput"
                ></Btnchangepicture>
                <input
                  type="file"
                  id="profile-pic-upload-modal"
                  accept="image/*"
                  style="display: none"
                  @change="updateProfilePicture"
                />
              </div>
              <div class="mt-4 container-left">
                <label for="name" class="">Name</label>
                <input-box
                  v-model="name"
                  :placeholder="user?.name || 'Guest'"
                ></input-box>
              </div>
              <div class="mt-4 container-left">
                <label for="email">Email</label>
                <input-box
                  v-model="email"
                  :value="user?.email || 'No email available'"
                  disabled
                ></input-box>
              </div>
              <div class="mt-4 container-left">
                <label for="description" class="">Description</label>
                <input-box
                  v-model="about"
                  :placeholder="user?.about || 'No description available'"
                ></input-box>
              </div>
              <div class="d-flex mt-5">
                <div class="container-cancel">
                  <Buttonfull
                    :buttonText="'Cancel'"
                    @click="closeModal"
                  ></Buttonfull>
                </div>
                <div>
                  <Buttonfull
                    :buttonText="'Update Profile'"
                    @click="updateProfile"
                  ></Buttonfull>
                </div>
              </div>
            </div>
            <div class="w-100">
              <div class="container-right">
                <h1>Change password</h1>
              </div>
              <div class="mt-4">
                <label for="password">Old Password</label>
                <input-box
                  v-model="password"
                  placeholder="Enter your old password"
                ></input-box>
              </div>
              <div class="mt-4">
                <label for="password">New Password</label>
                <input-box
                  v-model="newPassword"
                  placeholder="Enter your new password"
                ></input-box>
              </div>
              <div class="mt-4">
                <label for="password">Confirm New Password</label>
                <input-box
                  v-model="confirm_password"
                  placeholder="Enter your new password"
                ></input-box>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/authStore";
import axios from "axios";
import {
  fetchUserData,
  profilePicture,
  fetchUserStories,
} from "@/services/apiService";
import { add } from "@tensorflow/tfjs";

const router = useRouter();
const authStore = useAuthStore();
const user = authStore.user;

const name = ref("");
const email = ref("");
const about = ref("");
const avatar = ref("");
const password = ref("");
const newPassword = ref("");
const confirm_password = ref("");

const stories = ref([]); // Menyimpan data cerita
const currentPage = ref(1); // Track current page
const totalPages = ref(1); // Inisialisasi totalPages dengan 1
const hasMoreStories = ref(true); // Track if there are more stories

const addStory = () => {
  router.push("/addstory");
};

// Function to trigger file input for changing profile picture
const triggerFileInput = () => {
  const fileInput = document.getElementById("profile-pic-upload-modal");
  if (fileInput) {
    fileInput.click();
  }
};

// Function to update profile picture
const updateProfilePicture = async (event) => {
  const file = event.target.files[0];
  if (file) {
    try {
      const response = await profilePicture(file, authStore.token); // Use the new API method

      // Check if the response contains the relative URL
      const relativeUrl = response.data.data.url; // Assuming this is the relative path
      const baseUrl = useRuntimeConfig().public.apiBaseUrl; // Access the base URL from Nuxt config
      console.log("Base URL:", baseUrl); // Log the base URL
      const newAvatarUrl = `${baseUrl}${relativeUrl}`; // Concatenate base URL with the relative path
      avatar.value = newAvatarUrl;

      // Update avatar in store
      authStore.setUser({
        ...authStore.user,
        avatar: newAvatarUrl,
      });

      console.log("Uploaded image URL:", avatar.value);
    } catch (error) {
      console.error(
        "Error uploading image:",
        error.response ? error.response.data : error.message
      );
    }
  }
};

// Function to open the edit profile modal
const openModal = () => {
  console.log("Opening modal");
  const modalElement = document.getElementById("editProfileModal");
  const modal = new bootstrap.Modal(modalElement);
  modal.show();
};

// Function to close the edit profile modal
const closeModal = () => {
  console.log("Closing modal");
  const modalElement = document.getElementById("editProfileModal");
  const modal = new bootstrap.Modal(modalElement);
  modal.hide();
  modalElement.style.display = "none";
  const backdrop = document.querySelector(".modal-backdrop");
  if (backdrop) {
    backdrop.remove();
  }
};

// Function to update user profile
const updateProfile = async () => {
  console.log("Updating profile", {
    name: name.value,
    about: about.value,
    avatar: avatar.value,
  });

  const userId = user.id; // Ensure user.id is valid
  const token = authStore.token; // Get the token from the auth store

  // Access the runtime configuration
  const config = useRuntimeConfig();
  const apiBaseUrl = config.public.apiBaseUrl; // Get the public API base URL

  try {
    const response = await axios.put(
      `${apiBaseUrl}/api/update-user-profile/${userId}`, // Use the dynamic base URL
      {
        name: name.value,
        avatar: avatar.value,
        about: about.value,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Profile updated successfully:", response.data);

    // Update data in store
    authStore.setUser({
      ...authStore.user,
      name: name.value,
      about: about.value,
      avatar: avatar.value,
    });

    // Log the updated user data
    console.log("User data saved in store:", authStore.user);

    closeModal();
  } catch (error) {
    z;
    console.error(
      "Error updating profile:",
      error.response?.data || error.message
    );
  }
};

const handleDeleteStory = (storyId) => {
  // Remove the story from the local state after deletion
  stories.value = stories.value.filter((story) => story.id !== storyId);
};

const loadStories = async (page) => {
  const userId = authStore.user?.id; // Ensure user ID is available
  const config = useRuntimeConfig();
  const apiBaseUrl = config.public.apiBaseUrl; // Get the public API base URL

  try {
    // Fetch stories for the specified page
    const storiesResponse = await fetchUserStories(
      userId,
      authStore.token,
      apiBaseUrl,
      page // Pass the specified page
    );

    // Log the response to check if new stories are returned
    console.log("Fetched Stories Response:", storiesResponse);

    // Check if there are stories returned
    if (
      storiesResponse?.data?.stories &&
      storiesResponse.data.stories.length > 0
    ) {
      stories.value = storiesResponse.data.stories; // Update stories with new data
      totalPages.value = storiesResponse.data.pagination.last_page; // Update total pages based on API response
      currentPage.value = storiesResponse.data.pagination.current_page; // Update current page based on API response
    } else {
      hasMoreStories.value = false; // No more stories to load
    }
  } catch (error) {
    console.error(
      "Error loading stories:",
      error?.response?.data || error.message
    );
  }
};

onMounted(async () => {
  authStore.loadToken(); // Pastikan token sudah dimuat

  if (authStore.isAuthenticated) {
    const userId = authStore.user?.id; // Gunakan properti id
    console.log("User ID:", userId); // Log ID pengguna
    if (userId) {
      const config = useRuntimeConfig();
      const apiBaseUrl = config.public.apiBaseUrl; // Ambil base URL API

      try {
        // Ambil data pengguna
        const userResponse = await fetchUserData(
          userId,
          authStore.token,
          apiBaseUrl
        );
        console.log("User Data:", userResponse);

        if (userResponse?.data?.user) {
          name.value = userResponse.data.user.name || "Guest";
          email.value = userResponse.data.user.email || "No email available";
          about.value =
            userResponse.data.user.about || "No description available.";
          avatar.value =
            userResponse.data.user.avatar || "/path/to/default-avatar.jpg"; // Gambar default
        } else {
          console.error("User data not found in response.");
        }

        // Load stories for page 1 on initial load
        await loadStories(currentPage.value);
      } catch (error) {
        console.error(
          "Error fetching user data or stories:",
          error?.response?.data || error.message
        );
      }
    } else {
      console.error("User ID is undefined. Cannot fetch user data.");
    }
  } else {
    console.error("User is not authenticated. Redirecting to login.");
    router.push("/login"); // Redirect to login if not authenticated
  }
});
</script>

<style scoped>
.pagination-container {
  display: flex;
  margin-left: 1120px;
  margin-bottom: 20px;
  margin-top: 20px; /* Add some space above the pagination */
}

.nostories-h1 {
  margin-left: 180px;
  font-family: Playfair Display, sans-serif;
  margin-bottom: 20px;
  font-weight: 500;
}

.nostories-p {
  font-family: DM Sans, sans-serif;
  font-size: 20px;
}

.containernostories {
  margin-right: 230px;
  margin-bottom: 20px;
}

.container-cancel {
  margin-right: 20px;
}

.container-right {
  margin-top: 60px;
}

.container-title {
  margin-bottom: 30px;
  margin-left: 20px;
}

.modal-title {
  font-family: DM Sans, sans-serif;
  font-size: 40px;
  font-weight: 600px;
}

.sticky-story {
  position: sticky;
  top: 0;
  height: 400px;
  overflow: hidden;
  background-color: white;
  border: 1px solid #4b4b4b;
  padding: 20px;
}

.profile-modal {
  margin-left: 20px;
}

.container-left {
  margin-left: 20px;
}

.buttonCancel {
  color: #466543;
  padding: 15px 40px;
  font-size: 25px;
  cursor: pointer;
  margin-left: 20px;
  border: 2px solid #466543;
  border-radius: 8px;
  text-decoration: none;
  margin-right: 30px;
  margin-bottom: 20px;
}

.buttonUpdate {
  background-color: #466543;
  color: white;
  padding: 15px 30px;
  font-size: 25px;
  text-decoration: none;
  cursor: pointer;
  border: none;
  border-radius: 8px;
}

.modal-dialog {
  max-width: 1500px;
}

.modal-body {
  height: 800px;
}

.btn-change-picture {
  margin-top: 60px;
  margin-left: 20px;
}

.card-home {
  margin-right: 50px;
}

.card-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* Membuat dua kolom */
  gap: 20px; /* Menambahkan jarak antar kartu */
  overflow-x: auto;
  overflow-y: hidden;
  padding: 0 35px;
  margin-bottom: 10px;
  scrollbar-width: none;
  margin-right: 100px;
}

.bottom-container {
  margin-left: 80px;
}

.container-p {
  max-width: 400px;
  align-items: center;
}

.story {
  border: 1px solid #4b4b4b;
  padding: 0 100px;
}

.story h1 {
  margin-top: 40px;
}

.menu {
  margin-right: 20px;
}

.container-menu {
  margin-left: 80px;
  margin-top: 30px;
}

.button-container {
  display: flex;
  align-items: center;
  margin-left: 80px;
}

.hero {
  justify-content: center;
  padding: 50px;
  background-color: #f0f5ed;
  box-shadow: #4b4b4b;
}

.description-container {
  max-width: 800px;
}

.description {
  font-family: Dm Sans, serif;
  font-size: 20px;
  color: #4b4b4b;
  margin-left: 20px;
}

.name {
  font-family: Dm Sans, serif;
  font-size: 40px;
  color: black;
  margin-top: 10px;
  margin-left: 20px;
  font-weight: 550;
}

.email {
  font-family: Dm Sans, serif;
  font-size: 20px;
  color: black;
  margin-left: 20px;
}

.profile-pic {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  margin-right: 10px;
}
</style>
