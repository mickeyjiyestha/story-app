<template>
  <WebHeader></WebHeader>

  <div>
    <div class="d-flex">
      <nuxt-link to="/userprofile">
        <i class="fa-solid fa-arrow-left arrow-left"></i>
      </nuxt-link>

      <div class="container-header">
        <h1 class="text-header">Write Story</h1>
      </div>
    </div>
    <div class="mt-4 container-left container-feild">
      <label for="name" class="">Title</label>
      <Boxstory v-model="title" placeholder="title"></Boxstory>
    </div>
    <div class="mt-4 container-left container-feild">
      <label for="category" class="">Category</label>
      <div class="category-input" @click="toggleDropdown">
        <Boxstory
          :placeholder="
            selectedCategory ? selectedCategory.name : 'Select Category'
          "
          readonly
        ></Boxstory>
      </div>
      <div v-if="dropdownVisible" class="dropdown">
        <ul>
          <li
            v-for="category in categories"
            :key="category.id"
            @click="selectCategory(category)"
            class="dropdown-item"
          >
            {{ category.name }}
          </li>
        </ul>
      </div>
    </div>

    <div class="mt-4 container-left container-feild">
      <label for="content" class="">Content</label>
      <Boxcontent v-model="content" placeholder="content"></Boxcontent>
    </div>

    <div class="container-upload container-feild">
      <label for="image">Additional Image</label>
      <Uploadimage v-model="images"></Uploadimage>
      <div v-if="isEditMode && images.length">
        <h3>Uploaded Images:</h3>
        <div
          v-for="(image, index) in images"
          :key="index"
          class="image-container"
        >
          <img :src="image.name" alt="Uploaded Image" class="uploaded-image" />
          <button @click="removeImage(index)" class="remove-button">
            Remove
          </button>
        </div>
      </div>
    </div>
    <div class="d-flex mt-5 container-button">
      <div class="container-cancel">
        <Buttonfull :buttonText="'Cancel'" @click=""></Buttonfull>
      </div>
      <div>
        <Buttonfull
          :buttonText="isEditMode ? 'Update Story' : 'Upload Story'"
          @click="uploadStory"
        ></Buttonfull>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "vue-router";

const router = useRouter();
const authStore = useAuthStore();
const categories = ref([]);
const selectedCategory = ref(null);
const dropdownVisible = ref(false);
const title = ref("");
const content = ref("");
const images = ref([]);
const isEditMode = ref(false);
const storyId = ref(null);

onMounted(async () => {
  console.log("Using token:", authStore.token);
  try {
    const response = await axios.get(
      "https://52fb-103-19-231-239.ngrok-free.app/api/categories",
      {
        headers: {
          Authorization: `Bearer ${authStore.token}`,
          "ngrok-skip-browser-warning": "69420",
        },
      }
    );
    console.log("Categories fetched:", response.data);
    categories.value = response.data.categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
  }

  const storyIdFromRoute = router.currentRoute.value.query.storyId;
  if (storyIdFromRoute) {
    isEditMode.value = true;
    storyId.value = storyIdFromRoute;
    try {
      const response = await axios.get(
        `https://52fb-103-19-231-239.ngrok-free.app/api/stories/${storyIdFromRoute}`,
        {
          headers: {
            "ngrok-skip-browser-warning": "69420",
            Authorization: `Bearer ${authStore.token}`,
          },
        }
      );

      console.log("Story response:", response.data);
      const story = response.data.data.stories;
      title.value = story.title || "";
      content.value = story.content || "";
      selectedCategory.value = story.category || null;

      // Menampilkan gambar yang sudah ada
      images.value = story.images
        ? story.images.map((image) => ({
            name: image.url
              ? `https://52fb-103-19-231-239.ngrok-free.app${image.url}`
              : "",
          }))
        : [];
    } catch (error) {
      console.error(
        "Error fetching story details:",
        error.response?.data || error.message
      );
      alert("Failed to load story details.");
    }
  }
});

const selectCategory = (category) => {
  selectedCategory.value = category;
  dropdownVisible.value = false;
  console.log("Selected category:", selectedCategory.value);
};

const toggleDropdown = () => {
  dropdownVisible.value = !dropdownVisible.value;
};

const uploadStory = async () => {
  if (
    !title.value ||
    !content.value ||
    !images.value.length ||
    !selectedCategory.value
  ) {
    alert("Please fill in all required fields.");
    return;
  }

  const formData = new FormData();
  formData.append("title", title.value);
  formData.append("content", content.value);
  formData.append("category_id", selectedCategory.value.id);

  // Hanya tambahkan gambar yang valid
  images.value.forEach((image) => {
    if (image instanceof File) {
      formData.append("images[]", image);
    }
  });

  if (isEditMode.value) {
    formData.append("_method", "PUT");
  }

  try {
    const url = isEditMode.value
      ? `https://52fb-103-19-231-239.ngrok-free.app/api/stories/${storyId.value}`
      : "https://52fb-103-19-231-239.ngrok-free.app/api/stories";

    const response = await axios.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${authStore.token}`,
      },
    });
    console.log("Story uploaded successfully:", response.data);
    router.push("/userprofile");
  } catch (error) {
    if (error.response) {
      console.error("Error uploading story:", error.response.data);
      alert(
        `Failed to upload story: ${
          error.response.data.message || error.message
        }`
      );
    } else if (error.request) {
      console.error("No response received:", error.request);
      alert("Failed to upload story: No response from server.");
    } else {
      console.error("Error:", error.message);
      alert(`Failed to upload story: ${error.message}`);
    }
  }
};

// Fungsi untuk menghapus gambar
const removeImage = (index) => {
  images.value.splice(index, 1);
};
</script>

<style scoped>
.arrow-left {
  text-decoration: none;
  color: black;
}

.container-upload {
  margin-top: 40px;
}

.container-cancel {
  margin-right: 20px;
}

.container-feild {
  margin-left: 100px;
}

.category-input {
  position: relative; /* Untuk positioning dropdown */
  cursor: pointer; /* Menunjukkan bahwa ini dapat diklik */
}

.dropdown {
  position: absolute; /* Menempatkan dropdown di bawah input */
  background: white;
  border: 1px solid #ccc;
  z-index: 10; /* Pastikan dropdown di atas elemen lain */
  width: 100%; /* Sesuaikan lebar dropdown dengan lebar input */
  max-width: 250px; /* Atur lebar maksimum untuk dropdown */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); /* Tambahkan bayangan untuk efek visual */
}

.dropdown ul {
  list-style-type: none; /* Menghilangkan bullet points */
  padding: 0; /* Menghilangkan padding */
  margin: 0; /* Menghilangkan margin */
}

.uploaded-image {
  max-width: 600px; /* Ubah ukuran sesuai kebutuhan */
  margin-right: 10px;
}

.image-container {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.remove-button {
  margin-left: 10px;
  background-color: red;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
}

.dropdown-item {
  padding: 10px; /* Padding untuk item dropdown */
  cursor: pointer; /* Menunjukkan bahwa ini dapat diklik */
}

.dropdown-item:hover {
  background-color: #f0f0f0; /* Efek hover untuk item dropdown */
}

.container-button {
  margin-left: 100px;
}

.arrow-left {
  font-size: 40px;
  margin-left: 110px;
  margin-top: 155px;
}

.container-header {
  margin-left: 100px;
}

.text-header {
  margin-top: 150px;
  font-family: Playfair Display, sans-serif;
  font-weight: 500;
  font-size: 40px;
}
</style>
