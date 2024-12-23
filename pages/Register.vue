<template>
  <link
    rel="stylesheet"
    href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
  />
  <div class="hero d-flex p-4">
    <div class="left-content px-5">
      <img src="@/assets/logo.svg" alt="" class="py-4" />
      <h1 class="text-hero mt-4">Join the World’s Most-Loved</h1>
      <h1 class="text-hero">Social Storytelling Platform!</h1>
      <p class="second-text mt-5">
        Create an account to explore interesting articles, connect with
      </p>
      <p class="second-text">like-minded people, and share your own stories.</p>
      <img src="@/assets/register_logo.svg" alt="" />
    </div>
    <div class="right-content p-5">
      <h1 class="text-form">Create Account</h1>
      <div class="mt-5">
        <label for="name">Name</label>
        <input-box
          v-model="name"
          placeholder="Enter your name"
          class="mt-2"
        ></input-box>
      </div>
      <div class="mt-4">
        <label for="username">Username</label>
        <input-box
          v-model="username"
          placeholder="Enter your username"
          class="mt-2"
        ></input-box>
      </div>
      <div class="mt-4">
        <label for="email">Email</label>
        <input-box
          v-model="email"
          placeholder="Enter your email"
          class="mt-2"
        ></input-box>
      </div>
      <div class="mt-4">
        <label for="password">Password</label>
        <input-box
          v-model="password"
          type="password"
          placeholder="Enter your chosen password"
          class="mt-2"
        ></input-box>
      </div>
      <div class="mt-4">
        <label for="confirmPassword">Confirm Password</label>
        <input-box
          v-model="passwordConfirmation"
          type="password"
          placeholder="Re-enter your chosen password"
          class="mt-2"
        ></input-box>
      </div>
      <Buttonfull
        :buttonText="'Create Account'"
        class="mt-4"
        @click="registerUser"
      />
      <p class="mt-5 text-bottom">
        Already have an account?
        <nuxt-link to="/login" style="color: #466544">login</nuxt-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/authStore";
import { register } from "@/services/apiService";
import { useRuntimeConfig } from "#app"; // Import useRuntimeConfig

const router = useRouter();
const authStore = useAuthStore();

const name = ref("");
const username = ref("");
const email = ref("");
const password = ref("");
const passwordConfirmation = ref("");

const registerUser = async () => {
  console.log({
    name: name.value,
    username: username.value,
    email: email.value,
    password: password.value,
    confirm_password: passwordConfirmation.value,
  });

  if (
    !name.value ||
    !username.value ||
    !email.value ||
    !password.value ||
    !passwordConfirmation.value
  ) {
    console.error("All fields are required.");
    return;
  }

  if (password.value !== passwordConfirmation.value) {
    console.error("Passwords do not match.");
    return;
  }

  // Access the runtime configuration
  const config = useRuntimeConfig();
  const apiBaseUrl = config.public.apiBaseUrl; // Get the public API base URL

  try {
    const response = await register(
      {
        name: name.value,
        username: username.value,
        email: email.value,
        password: password.value,
        password_confirmation: passwordConfirmation.value,
      },
      apiBaseUrl // Pass the base URL
    );

    console.log(response.data);

    const token = response.data.data.token;
    const user = response.data.user;

    authStore.setToken(token);
    authStore.setUser(user);

    router.push("/");
  } catch (error) {
    console.error("Registration Error:", error.response?.data || error.message);
  }
};
</script>

<style scoped>
.text-bottom {
  font-family: DM Sans, sans-serif;
  font-size: 18px;
  font-weight: 600px;
}

.left-content {
  background-color: #f0f5ed;
  width: 50%;
}

.right-content {
  margin-left: 100px;
}

.text-hero {
  font-family: Playfair Display, serif;
  font-size: 65px;
  color: black;
}

.second-text {
  font-family: DM Sans, sans-serif;
  font-size: 25px;
  color: #4b4b4b;
}

.text-form {
  font-family: DM Sans, sans-serif;
  color: black;
  font-weight: 300px;
}

p:hover {
  text-decoration: none;
}
</style>
