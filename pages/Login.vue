<template>
  <link
    rel="stylesheet"
    href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
  />
  <div class="d-flex flex-column flex-md-row p-4">
    <div class="content-left p-5 flex-grow-1">
      <div class="logo text-center mb-4">
        <img src="@/assets/logo.svg" alt="Logo" class="logo" />
      </div>
      <div class="form-login">
        <h1 class="mt-5 text-center">Login</h1>
        <div class="mt-5">
          <label for="email" class="form-label">Username/Email</label>
          <input-box
            v-model="name"
            placeholder="Enter your name"
            class="mt-2 input-box"
          ></input-box>
        </div>
        <div class="mt-4">
          <label for="password" class="form-label">Password</label>
          <input-box
            v-model="password"
            placeholder="Enter your chosen password"
            type="password"
            class="mt-2 input-box"
          ></input-box>
        </div>
        <buttonfull
          :buttonText="'Login'"
          class="mt-4 w-100"
          @click="loginUser"
        ></buttonfull>
        <p class="mt-5 text-bottom text-center">
          Don't have an account?
          <nuxt-link to="/register" style="color: #466544">Register</nuxt-link>
        </p>
      </div>
    </div>
    <div class="content-right d-none d-md-block p-5 flex-grow-1">
      <h1>Welcome Back to <br />Story Time!</h1>
      <p>
        Dive back into captivating stories, follow your favorite<br />
        authors, and continue sharing your own tales.
      </p>
      <img src="@/assets/login_image.svg" alt="Login Image" class="img-fluid" />
    </div>
    <div class="content-right-mobile d-block d-md-none p-5 text-center">
      <img
        src="@/assets/login_image.svg"
        alt="Login Image"
        class="img-fluid mb-4"
      />
      <h1>Welcome Back to <br />Story Time!</h1>
      <p>
        Dive back into captivating stories, follow your favorite<br />
        authors, and continue sharing your own tales.
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/authStore";
import { login } from "@/services/apiService";
import { useRuntimeConfig } from "#app";
import { useToast } from "vue-toastification";

const router = useRouter();
const authStore = useAuthStore();
const toast = useToast();

const name = ref("");
const password = ref("");

const loginUser = async () => {
  if (!name.value || !password.value) {
    toast.error("All fields are required.");
    return;
  }

  const config = useRuntimeConfig();
  const apiBaseUrl = config.public.apiBaseUrl;

  try {
    const response = await login(
      {
        login_identifier: name.value,
        password: password.value,
      },
      apiBaseUrl
    );

    const token = response.data.data.token.plainTextToken;
    const user = response.data.data.user;

    authStore.setToken(token);
    authStore.setUser(user);

    toast.success("Login successful! Welcome back!");

    router.push("/");
  } catch (error) {
    toast.error(
      error.response?.data?.message || "Login failed. Please try again."
    );
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
}

.content-right p {
  font-family: DM Sans, sans-serif;
  font-size: 25px;
  color: #4b4b4b;
  margin-top: 40px;
}

.text-bottom {
  font-family: DM Sans, sans-serif;
  font-size: 18px;
  font-weight: 600;
}

.content-left {
  width: 100%;
}

.content-right {
  padding: 20px;
  background-color: #f0f5ed;
  width: 100%;
}

.content-right-mobile h1 {
  font-family: Playfair Display, serif;
  font-size: 40px;
  color: black;
  margin-top: 20px;
}

.content-right-mobile p {
  font-family: DM Sans, sans-serif;
  font-size: 18px;
  color: #4b4b4b;
  margin-top: 10px;
}

.form-login {
  margin-top: 20px; /* Adjusted for better spacing */
  font-family: DM Sans, sans-serif;
  margin-left: auto;
  margin-right: auto;
  max-width: 400px;
  text-align: left; /* Align text to the left */
}

.input-box {
  margin-right: 0;
  width: 100%; /* Ensure input box takes full width */
}
</style>
