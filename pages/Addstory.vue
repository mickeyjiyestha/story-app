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
      <Uploadimage
        v-model="images"
        @imageDeleted="handleImageDeleted"
      ></Uploadimage>
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
const deletedImageIds = ref([]); // Menyimpan ID gambar yang dihapus

onMounted(async () => {
  console.log("Using token:", authStore.token);
  try {
    const response = await axios.get(
      "https://b39d-103-100-175-121.ngrok-free.app/api/categories",
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
        `https://b39d-103-100-175-121.ngrok-free.app/api/stories/${storyIdFromRoute}`,
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
            url: image.url
              ? `https://b39d-103-100-175-121.ngrok-free.app${image.url}`
              : "",
            id: image.id, // Menyimpan ID gambar
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

const handleImageDeleted = (imageId) => {
  console.log("Image deleted with ID:", imageId); // Tambahkan log untuk memastikan ID diterima
  if (!deletedImageIds.value.includes(imageId)) {
    deletedImageIds.value.push(imageId);
  }
  console.log("Current deletedImageIds:", deletedImageIds.value); // Log array ID yang akan dihapus
};

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

  // Hanya tambahkan gambar baru (File) ke FormData
  images.value.forEach((image) => {
    if (image instanceof File) {
      formData.append("images[]", image);
    }
  });

  // Jika dalam mode edit dan ada gambar yang dihapus
  if (isEditMode.value) {
    formData.append("_method", "PUT");

    // Log sebelum menambahkan ke FormData
    console.log("Deleted image IDs before append:", deletedImageIds.value);

    // Menambahkan ID gambar yang dihapus sebagai delete_image[]
    deletedImageIds.value.forEach((id) => {
      formData.append("delete_images[]", id.toString());
      console.log("Appending delete_images[]:", id); // Log setiap ID yang ditambahkan
    });

    // Log FormData untuk memastikan data terkirim dengan benar
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }
  }

  try {
    const url = isEditMode.value
      ? `https://b39d-103-100-175-121.ngrok-free.app/api/stories/${storyId.value}`
      : "https://b39d-103-100-175-121.ngrok-free.app/api/stories";

    console.log("Sending request to:", url);
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
</script>

<style scoped>
.arrow-left {
  text-decoration: none;
  color: black;
  font-size: 40px;
  margin-left: 110px;
  margin-top: 155px;
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
  position: relative;
  cursor: pointer;
}

.dropdown {
  position: absolute;
  background: white;
  border: 1px solid #ccc;
  z-index: 10;
  width: 100%;
  max-width: 250px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.dropdown ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.uploaded-image {
  max-width: 600px;
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
  padding: 10px;
  cursor: pointer;
}

.dropdown-item:hover {
  background-color: #f0f0f0;
}

.container-button {
  margin-left: 100px;
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

/* Mobile Responsive Styles */
@media screen and (max-width: 768px) {
  .container-feild {
    margin-left: 20px;
    margin-right: 20px;
  }

  .arrow-left {
    margin-left: 20px;
    margin-top: 100px;
    font-size: 30px;
  }

  .container-header {
    margin-left: 20px;
  }

  .text-header {
    margin-top: 100px;
    font-size: 32px;
  }

  .container-button {
    margin-left: 20px;
    flex-direction: column-reverse;
  }

  .container-cancel {
    margin-right: 0;
    margin-top: 10px;
  }

  .uploaded-image {
    max-width: 100%;
  }

  .image-container {
    flex-direction: column;
  }

  .remove-button {
    margin-left: 0;
    margin-top: 10px;
  }
}

@media screen and (max-width: 480px) {
  .text-header {
    font-size: 28px;
  }

  .arrow-left {
    font-size: 24px;
  }
}
</style>
