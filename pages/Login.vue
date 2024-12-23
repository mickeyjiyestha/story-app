<template>
  <link
    rel="stylesheet"
    href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
  />
  <div class="d-flex p-4">
    <div class="content-left p-5">
      <div class="logo">
        <img src="@/assets/logo.svg" alt="" class="logo" />
      </div>
      <div class="form-login">
        <h1 class="mt-5">Login</h1>
        <div class="mt-5">
          <label for="email">Username/Email</label>
          <input-box
            v-model="name"
            placeholder="Enter your name"
            class="mt-2 input-box"
          ></input-box>
        </div>
        <div class="mt-4">
          <label for="password">Password</label>
          <input-box
            v-model="password"
            placeholder="Enter your choosen password"
            type="password"
            class="mt-2 input-box"
          ></input-box>
        </div>
        <buttonfull
          :buttonText="'Login'"
          class="mt-4"
          @click="loginUser"
        ></buttonfull>
        <p class="mt-5 text-bottom">
          Don't have an account?
          <nuxt-link to="/register" style="color: #466544">Register</nuxt-link>
        </p>
      </div>
    </div>
    <div class="content-right">
      <h1>Welcome Back to <br />Story Time!</h1>
      <p>
        Dive back into captivating stories, follow your favorite<br />
        authors, and continue sharing your own tales.
      </p>
      <img src="@/assets/login_image.svg" alt="" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/authStore";
import { login } from "@/services/apiService";
import { useRuntimeConfig } from "#app"; // Import useRuntimeConfig

const router = useRouter();
const authStore = useAuthStore();

const name = ref("");
const password = ref("");

const loginUser = async () => {
  if (!name.value || !password.value) {
    console.error("All fields are required.");
    return;
  }

  // Access the runtime configuration
  const config = useRuntimeConfig();
  const apiBaseUrl = config.public.apiBaseUrl; // Get the public API base URL

  try {
    const response = await login(
      {
        login_identifier: name.value,
        password: password.value,
      },
      apiBaseUrl // Pass the base URL
    );

    console.log("Login Response:", response.data);

    const token = response.data.data.token;
    const user = response.data.data.user;

    console.log("User Data:", user);

    authStore.setToken(token);
    authStore.setUser(user);

    router.push("/");
  } catch (error) {
    console.error("Login Error:", error.response?.data || error.message);
  }
};
</script>

<style scoped>
.content-right h1 {
  font-family: Playfair Display, serif;
  font-size: 65px;
  color: black;
  margin-top: 68px;
  margin-left: 70px;
}

.content-right p {
  font-family: DM Sans, sans-serif;
  font-size: 25px;
  margin-left: 70px;
  color: #4b4b4b;
  margin-top: 40px;
}

.text-bottom {
  font-family: DM Sans, sans-serif;
  font-size: 18px;
  font-weight: 600px;
}

.content-left {
  width: 50%;
}

.content-right {
  padding: 20px;
  background-color: #f0f5ed;
  width: 50%;
}

.form-login {
  margin-top: 180px;
  font-family: DM Sans, sans-serif;
  margin-left: 170px;
}

.input-box {
  margin-right: 100px;
}
</style>
