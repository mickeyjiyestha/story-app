<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-light bg-light px-5 py-4">
      <div
        class="container-fluid d-flex justify-content-between align-items-center"
      >
        <nuxt-link to="/" class="logo-link">
          <img src="@/assets/logo.svg" alt="Logo" />
        </nuxt-link>
        <div class="nav-buttons">
          <nuxt-link
            v-if="!isAuthenticated"
            to="/register"
            class="buttonRegister"
            >Register</nuxt-link
          >
          <nuxt-link v-if="!isAuthenticated" to="/login" class="buttonLogin"
            >Login</nuxt-link
          >
          <div
            v-if="isAuthenticated"
            class="d-flex align-items-center my-profile"
          >
            <nuxt-link to="/userprofile" class="buttonProfile">
              <img
                :src="user.avatar"
                class="profile-pic"
                alt="Profile Picture"
              />
            </nuxt-link>
            <div class="dropdown">
              <div class="dropdown-toggle" @click="toggleDropdown">
                {{ user.name }}
              </div>
              <ul v-if="isDropdownOpen" class="dropdown-menu show">
                <li>
                  <nuxt-link to="/userprofile" class="dropdown-item"
                    >My Profile</nuxt-link
                  >
                </li>
                <li>
                  <button @click="logout" class="dropdown-item">Logout</button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/authStore";

const router = useRouter();
const authStore = useAuthStore();
const isAuthenticated = computed(() => authStore.isAuthenticated);
const user = authStore.user;

const isDropdownOpen = ref(false);

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const logout = () => {
  authStore.logout();
  isDropdownOpen.value = false;
  router.push("/");
};
</script>

<style scoped>
.my-profile {
  display: flex;
  align-items: center;
  margin-right: 10px;
  font-family: Dm Sans, sans-serif;
}

.profile-pic {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}

.buttonRegister {
  color: #466543;
  padding: 15px 30px;
  font-size: 18px;
  cursor: pointer;
  border: 2px solid #466543;
  border-radius: 8px;
  margin-right: 10px;
}

.buttonLogin {
  background-color: #466543;
  color: white;
  padding: 15px 30px;
  font-size: 18px;
  cursor: pointer;
  border: none;
  border-radius: 8px;
}

.dropdown-toggle {
  cursor: pointer;
  color: #466543;
  font-size: 18px;
}

.dropdown-menu {
  position: absolute;
  background-color: white;
  border: 1px solid #ccc;
  z-index: 1000;
  min-width: 150px;
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.dropdown-item {
  padding: 10px;
  cursor: pointer;
}

.dropdown-item:hover {
  background-color: #e0e0e0;
}

/* Mobile Responsive Styles */
@media screen and (max-width: 768px) {
  .navbar {
    padding: 1rem !important;
  }

  .logo-link img {
    max-width: 120px;
    height: auto;
  }

  .nav-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .buttonRegister,
  .buttonLogin {
    padding: 10px 20px;
    font-size: 16px;
    margin-right: 0;
  }

  .my-profile {
    margin-right: 0;
  }

  .profile-pic {
    width: 32px;
    height: 32px;
  }

  .dropdown-toggle {
    font-size: 16px;
  }

  .dropdown-menu {
    right: 0;
    left: auto;
  }
}

@media screen and (max-width: 480px) {
  .buttonRegister,
  .buttonLogin {
    padding: 8px 16px;
    font-size: 14px;
  }

  .dropdown-toggle {
    font-size: 14px;
  }
}
</style>
