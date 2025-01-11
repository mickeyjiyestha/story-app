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
  <WebHeader></WebHeader>
  <div class="hero mt-5 container-fluid">
    <div class="d-flex story-container justify-content-between">
      <p>Sort By</p>
      <div class="d-flex justify-content-between">
        <div class="dropdown">
          <div class="dropdown-toggle" @click="toggleSortDropdown">
            {{ selectedSort }}
          </div>
          <ul v-if="isSortDropdownOpen" class="dropdown-menu show">
            <li @click="selectSort('Newest')" class="dropdown-item">Newest</li>
            <li @click="selectSort('Popular')" class="dropdown-item">
              Popular
            </li>
            <li @click="selectSort('A - Z')" class="dropdown-item">A - Z</li>
            <li @click="selectSort('Z - A')" class="dropdown-item">Z - A</li>
          </ul>
        </div>

        <p class="text-category">Category</p>
        <div class="dropdown-category">
          <div class="dropdown-toggle" @click="toggleCategoryDropdown">
            {{ selectedCategory }}
          </div>
          <ul v-if="isCategoryDropdownOpen" class="dropdown-menu show">
            <li @click="selectCategory('Comedy')" class="dropdown-item">
              Comedy
            </li>
            <li @click="selectCategory('Romance')" class="dropdown-item">
              Romance
            </li>
            <li @click="selectCategory('Horror')" class="dropdown-item">
              Horror
            </li>
            <li @click="selectCategory('Fantasy')" class="dropdown-item">
              Fantasy
            </li>
          </ul>
        </div>

        <div class="search-container">
          <div class="search-box">
            <input
              type="text"
              class="search-input"
              placeholder="Search Story"
            />
            <i class="fas fa-search search-icon"></i>
          </div>
        </div>
      </div>
    </div>

    <div class="container-card mt-5">
      <div class="row container-fluid">
        <div
          class="col-md-4 card-container"
          v-for="story in stories"
          :key="story.id"
        >
          <Card :story="story" class="card-home mb-4"></Card>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import latestImage from "@/assets/story-latest.webp";
import mickeyImage from "@/assets/MICKEY.png";
import { ref, onMounted } from "vue";
import { fetchAllStories } from "~/services/apiService";
import { useAuthStore } from "@/stores/authStore";

// Define the Story interface
interface Story {
  id: number;
  title: string;
  content: string;
  category: string;
  // Add other properties as needed
}

const authStore = useAuthStore();
const selectedSort = ref("Newest");
const selectedCategory = ref("Comedy");
const isSortDropdownOpen = ref(false);
const isCategoryDropdownOpen = ref(false);
const stories = ref<Story[]>([]); // Use the defined type for the stories array

const toggleSortDropdown = () => {
  isSortDropdownOpen.value = !isSortDropdownOpen.value;
};

const toggleCategoryDropdown = () => {
  isCategoryDropdownOpen.value = !isCategoryDropdownOpen.value;
};

const selectSort = (sortOption: string) => {
  selectedSort.value = sortOption;
  isSortDropdownOpen.value = false; // Close dropdown after selection
};

const selectCategory = (category: string) => {
  selectedCategory.value = category;
  isCategoryDropdownOpen.value = false; // Close dropdown after selection
};

onMounted(async () => {
  try {
    const storiesData = await fetchAllStories(); // Call without parameters
    if (storiesData && Array.isArray(storiesData)) {
      stories.value = storiesData; // Assign fetched stories to the reactive array
      console.log("Fetched All Stories:", stories.value);
    } else {
      console.error("No stories found in the response.");
    }
  } catch (error) {
    console.error("Error fetching stories:", error);
  }
});
</script>

<style scoped>
.text-category {
  margin-top: 10px;
  margin-right: 10px;
}

.dropdown-category {
  margin-right: 50px;
  margin-top: 10px;
}

.search-container {
  margin-right: 60px;
}

.card-container {
  margin-top: 60px;
}

.first-card {
  margin-left: 50px;
}

.search-box {
  position: relative;
  width: 100%;
  max-width: 600px;
}

.search-input {
  width: 100%;
  padding: 10px 40px 10px 20px; /* Padding untuk input */
  border: 1px solid #ccc; /* Border untuk input */
  border-radius: 5px; /* Sudut membulat */
}

.search-icon {
  position: absolute;
  left: 10px; /* Posisi ikon di dalam input */
  top: 50%;
  transform: translateY(-50%); /* Pusatkan ikon secara vertikal */
  color: #aaa; /* Warna ikon */
}

.dropdown-menu {
  list-style-type: none; /* Menghilangkan bullet points */
  padding: 0; /* Menghilangkan padding */
  margin: 0; /* Menghilangkan margin */
}

.dropdown-item:hover {
  background-color: #e0e0e0; /* Warna latar belakang saat hover */
}

.dropdown {
  margin-right: 450px;
}

.hero {
  font-family: Dm Sans, sans-serif;
  margin-left: 25px;
  margin-right: 25px;
  font-size: 25px;
}
</style>
