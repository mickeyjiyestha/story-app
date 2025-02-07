<template>
  <div class="toast-container">
    <div
      v-for="(toast, index) in toasts"
      :key="index"
      :class="['toast', `toast-${toast.type}`, { show: toast.show }]"
      @click="removeToast(index)"
    >
      {{ toast.message }}
    </div>
  </div>
  <!-- Template remains unchanged -->
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
      <Buttoncategory
        label="My Story"
        backgroundColor="#d9f8c4"
        @click="loadUserStories"
      />
      <Buttoncategory
        label="Bookmark"
        backgroundColor="#f8d9e0"
        @click="loadBookmarks"
      />
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
        <div
          class="card-container"
          v-if="(isBookmarkView ? bookmarks : stories).length > 0"
        >
          <div
            v-for="(story, index) in isBookmarkView ? bookmarks : stories"
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

    <div v-if="hasMoreStories" class="pagination-container">
      <Pagination
        :totalPages="totalPages"
        :currentPage="currentPage"
        :onPageChange="loadStories"
        @click="goToDetail(story.id)"
      />
    </div>

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
            <!-- Left side - Profile Edit -->
            <div class="w-100 pe-5">
              <!-- Increased right padding -->
              <div class="container-title mb-4">
                <h1 class="modal-title" id="editProfileModalLabel">
                  Edit Profile
                </h1>
              </div>
              <div class="d-flex align-items-center mb-4">
                <div class="profile-modal me-3">
                  <img
                    id="profile-pic-modal"
                    :src="imagePreview || avatar"
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
              <div class="form-group mb-4">
                <label for="name" class="form-label mb-2">Name</label>
                <input-box
                  v-model="name"
                  :placeholder="user?.name || 'Guest'"
                ></input-box>
              </div>
              <div class="form-group mb-4">
                <label for="email" class="form-label mb-2">Email</label>
                <input-box
                  v-model="email"
                  :value="user?.email || 'No email available'"
                  disabled
                ></input-box>
              </div>
              <div class="form-group mb-4">
                <label for="description" class="form-label mb-2"
                  >Description</label
                >
                <input-box
                  v-model="about"
                  :placeholder="user?.about || 'No description available'"
                ></input-box>
              </div>
              <div class="d-flex mt-4">
                <div class="container-cancel me-3">
                  <Buttonfull
                    :buttonText="'Cancel'"
                    @click="closeModal"
                  ></Buttonfull>
                </div>
                <div>
                  <Buttonfull
                    :buttonText="'Update'"
                    @click="handleUpdate"
                  ></Buttonfull>
                </div>
              </div>
            </div>

            <!-- Right side - Password Change -->
            <div class="w-100 ps-5 section-divider">
              <!-- Removed border-start class -->
              <div class="container-right mb-4">
                <h1>Change password</h1>
              </div>
              <div class="form-group mb-4">
                <label for="password" class="form-label mb-2"
                  >Old Password</label
                >
                <input-box
                  v-model="password"
                  placeholder="Enter your old password"
                ></input-box>
              </div>
              <div class="form-group mb-4">
                <label for="newPassword" class="form-label mb-2"
                  >New Password</label
                >
                <input-box
                  v-model="newPassword"
                  placeholder="Enter your new password"
                ></input-box>
              </div>
              <div class="form-group mb-4">
                <label for="confirmPassword" class="form-label mb-2"
                  >Confirm New Password</label
                >
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
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/authStore";
import { useToast } from "vue-toastification";
import axios from "axios";
import {
  fetchUserData,
  profilePicture,
  fetchUserStories,
  fetchUserBookmarks, // Import the function to fetch bookmarks
} from "@/services/apiService";

const toasts = ref([]);
const showToast = (message, type = "success") => {
  const toast = {
    message,
    type,
    show: true,
  };
  toasts.value.push(toast);

  // Auto remove toast after 3 seconds
  setTimeout(() => {
    removeToast(toasts.value.indexOf(toast));
  }, 3000);
};

const removeToast = (index) => {
  toasts.value.splice(index, 1);
};

const router = useRouter();
const authStore = useAuthStore();
const user = authStore.user;
const toast = useToast(); // Gunakan vue-toastification
const fileToUpload = ref(null);
const previewUrl = ref(null);

const name = ref("");
const email = ref("");
const about = ref("");
const avatar = ref("");
const password = ref("");
const newPassword = ref("");
const confirm_password = ref("");

const stories = ref([]); // Store user stories
const bookmarks = ref([]); // Store user bookmarks
const currentPage = ref(1); // Track current page
const totalPages = ref(1); // Initialize totalPages with 1
const hasMoreStories = ref(true); // Track if there are more stories
const isBookmarkView = ref(false); // Track if bookmarks are being viewed

const goToDetail = (id) => {
  router.push({ name: "Detail", params: { id } }); // Navigate to Detail page with story ID
};

const addStory = () => {
  router.push("/addstory");
};

const loadUserStories = async () => {
  isBookmarkView.value = false; // Set view ke stories
  currentPage.value = 1; // Reset ke halaman pertama
  await loadStories(currentPage.value);
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
    fileToUpload.value = file;
    // Membuat preview URL untuk tampilan
    previewUrl.value = URL.createObjectURL(file);
    // Update tampilan preview
    avatar.value = previewUrl.value;
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

const updateProfile = async () => {
  const userId = user.id;
  const token = authStore.token;
  const config = useRuntimeConfig();
  const apiBaseUrl = config.public.apiBaseUrl;

  try {
    let avatarPath = user.avatar; // Default ke avatar yang ada

    // Upload gambar jika ada file baru
    if (fileToUpload.value) {
      const response = await profilePicture(fileToUpload.value, token);
      // Ambil hanya path relatif dari response
      avatarPath = response.data.data.url; // Ini seharusnya sudah berupa path relatif seperti '/storage/avatar/filename.jpg'
    }

    const response = await axios.put(
      `${apiBaseUrl}/api/update-user-profile/${userId}`,
      {
        name: name.value,
        avatar: avatarPath, // Gunakan path relatif
        about: about.value,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Update data di store dengan URL lengkap untuk tampilan
    authStore.setUser({
      ...authStore.user,
      name: name.value,
      about: about.value,
      avatar: `${apiBaseUrl}${avatarPath}`, // Gabungkan baseUrl dengan path untuk tampilan
    });

    // Reset file upload state
    fileToUpload.value = null;
    if (previewUrl.value) {
      URL.revokeObjectURL(previewUrl.value);
      previewUrl.value = null;
    }

    console.log("Profile updated successfully:", response.data);
  } catch (error) {
    console.error(
      "Error updating profile:",
      error.response?.data || error.message
    );
    throw error;
  }
};

const handlePasswordUpdate = async () => {
  const countdown = ref(3);
  let toastId = null;

  const startCountdown = () => {
    // Create initial toast and store its ID
    toastId = toast.info(
      `Password updated successfully! You will be logged out in ${countdown.value}`,
      {
        timeout: false, // Disable auto-close
        closeOnClick: false,
        closeButton: false,
        draggable: false,
        id: "logout-countdown", // Add a unique ID to identify this toast
      }
    );

    const countdownInterval = setInterval(() => {
      countdown.value--;
      if (countdown.value > 0) {
        // Update existing toast content
        toast.update(toastId, {
          content: `Password updated successfully! You will be logged out in ${countdown.value}`,
        });
      } else {
        clearInterval(countdownInterval);
        toast.dismiss(toastId); // Remove the toast
        authStore.logout();
        router.push("/login");
      }
    }, 1000);
  };

  try {
    const userId = user.id;
    const token = authStore.token;
    const config = useRuntimeConfig();
    const apiBaseUrl = config.public.apiBaseUrl;

    const response = await axios.put(
      `${apiBaseUrl}/api/update-password/${userId}`,
      {
        old_password: password.value,
        new_password: newPassword.value,
        new_password_confirmation: confirm_password.value,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    password.value = "";
    newPassword.value = "";
    confirm_password.value = "";
    closeModal();

    startCountdown();
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to update password");
    console.error("Error updating password:", error);
  }
};

const handleUpdate = async () => {
  // Modifikasi pengecekan perubahan
  let hasProfileChanges =
    name.value !== user.name ||
    about.value !== user.about ||
    fileToUpload.value !== null; // Tambahkan pengecekan file baru

  let hasPasswordChanges =
    password.value && newPassword.value && confirm_password.value;

  if (!hasProfileChanges && !hasPasswordChanges) {
    toast.info("No changes to update");
    return;
  }

  if (hasProfileChanges) {
    try {
      await updateProfile();
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error("Failed to update profile");
      console.error("Error updating profile:", error);
      return;
    }
  }

  if (hasPasswordChanges) {
    if (validatePassword()) {
      await handlePasswordUpdate();
    }
  } else if (hasProfileChanges) {
    closeModal();
  }
};

const validatePassword = () => {
  if (newPassword.value !== confirm_password.value) {
    toast.error("New password and confirm password do not match");
    return false;
  }

  if (newPassword.value.length < 6) {
    toast.error("New password must be at least 6 characters long");
    return false;
  }

  return true;
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

const loadBookmarks = async () => {
  const userId = authStore.user?.id;
  const token = authStore.token;
  const config = useRuntimeConfig();
  const apiBaseUrl = config.public.apiBaseUrl;

  try {
    const response = await fetchUserBookmarks(userId, token);
    console.log("Bookmarks Response:", response);

    if (response && response.data && Array.isArray(response.data.stories)) {
      bookmarks.value = response.data.stories;
      isBookmarkView.value = true; // Set view ke bookmarks
    } else {
      console.error("No bookmarks found in response.");
      bookmarks.value = []; // Set empty array if no bookmarks
    }
  } catch (error) {
    console.error(
      "Error loading bookmarks:",
      error?.response?.data || error.message
    );
    bookmarks.value = []; // Set empty array on error
  }
};

onMounted(async () => {
  authStore.loadToken();

  if (authStore.isAuthenticated) {
    const userId = authStore.user?.id;
    console.log("User ID:", userId);
    if (userId) {
      const config = useRuntimeConfig();
      const apiBaseUrl = config.public.apiBaseUrl;

      try {
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
          // Gabungkan baseUrl dengan path avatar untuk tampilan
          const avatarPath =
            userResponse.data.user.avatar || "/path/to/default-avatar.jpg";
          avatar.value = `${apiBaseUrl}${avatarPath}`;
        }

        await loadUserStories();
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
    router.push("/login");
  }
});
</script>

<style scoped>
.modal-content {
  padding: 2rem;
}

.form-label {
  font-weight: 500;
  color: #333;
  display: block;
  margin-bottom: 0.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.section-divider {
  position: relative;
  margin-left: 2rem; /* Add margin to create more space */
}

.border-start {
  border-left: 1px solid #dee2e6;
}

.close {
  position: absolute;
  right: 1.5rem;
  top: 1.5rem;
  font-size: 1.5rem;
  font-weight: 700;
  color: #666;
  background: none;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  transition: color 0.2s ease;
}

.close:hover {
  color: #333;
}

.pagination-container {
  display: flex;
  margin-left: 1120px;
  margin-bottom: 20px;
  margin-top: 20px;
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

.container-title h1,
.container-right h1 {
  font-size: 1.75rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 1.5rem;
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
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
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
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
}

/* Tablet Responsive Styles */
@media screen and (max-width: 1024px) {
  .card-container {
    grid-template-columns: 1fr;
    margin-right: 20px;
  }

  .bottom-container {
    flex-direction: column;
    margin-left: 20px;
  }

  .sticky-story {
    position: static;
    margin-bottom: 30px;
    padding: 20px;
  }

  .pagination-container {
    margin-left: auto;
    margin-right: auto;
    justify-content: center;
  }

  .modal-dialog {
    max-width: 90%;
  }
}

.toast-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
}

.toast {
  padding: 15px 25px;
  margin-bottom: 10px;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  opacity: 0;
  transform: translateX(100%);
}

.toast.show {
  opacity: 1;
  transform: translateX(0);
}

.toast-success {
  background-color: #466543;
}

.toast-error {
  background-color: #dc3545;
}

.toast-info {
  background-color: #17a2b8;
}

/* Mobile Responsive Styles */
@media screen and (max-width: 768px) {
  .hero {
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 30px;
  }

  .button-container {
    margin-left: 0;
    margin-top: 20px;
  }

  .description-container {
    max-width: 100%;
  }

  .name {
    font-size: 32px;
    margin-left: 0;
    margin-top: 20px;
  }

  .email {
    margin-left: 0;
  }

  .description {
    margin-left: 0;
    font-size: 16px;
  }

  .container-menu {
    margin-left: 20px;
    flex-wrap: wrap;
    gap: 10px;
  }

  .story {
    padding: 20px;
  }

  .story h1 {
    font-size: 24px;
  }

  .container-p {
    max-width: 100%;
  }

  .modal-body {
    flex-direction: column;
  }

  .modal-title {
    font-size: 28px;
  }

  .nostories-h1 {
    margin-left: 0;
    text-align: center;
    font-size: 24px;
  }

  .nostories-p {
    font-size: 16px;
    text-align: center;
  }

  .containernostories {
    margin-right: 0;
    text-align: center;
  }

  .border-start {
    border-left: none;
    border-top: 1px solid #dee2e6;
    margin-top: 2rem;
    padding-top: 2rem;
  }

  .pe-4,
  .ps-4 {
    padding: 0 !important;
  }
}

/* Small Mobile Devices */
@media screen and (max-width: 480px) {
  .profile-pic {
    width: 150px;
    height: 150px;
  }

  .name {
    font-size: 28px;
  }

  .email {
    font-size: 16px;
  }

  .story h1 {
    font-size: 20px;
  }

  .modal-dialog {
    margin: 10px;
  }

  .btn-change-picture {
    margin-top: 20px;
    margin-left: 0;
  }

  .container-left,
  .container-right {
    margin-left: 0;
  }
}
</style>
