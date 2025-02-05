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
    <div class="hero-bg d-flex p-3">
      <nuxt-link to="/">
        <p class="first-hero-child">Home</p>
      </nuxt-link>
      <p class="hero-child">/</p>
      <p class="hero-child">All Story</p>
    </div>
    <div class="hero mt-5 container-fluid">
      <div class="d-flex justify-content-between align-items-center">
        <div class="d-flex align-items-center">
          <p class="p-sort">Sort By</p>
          <div class="dropdown mx-2">
            <div class="dropdown-toggle" @click="toggleSortDropdown">
              {{ selectedSort }}
            </div>
            <ul v-if="isSortDropdownOpen" class="dropdown-menu show">
              <li @click="selectSort('Newest')" class="dropdown-item">
                Newest
              </li>
              <li @click="selectSort('Popular')" class="dropdown-item">
                Popular
              </li>
              <li @click="selectSort('A - Z')" class="dropdown-item">A - Z</li>
              <li @click="selectSort('Z - A')" class="dropdown-item">Z - A</li>
            </ul>
          </div>
          <p class="p-sort-c">Category</p>
          <div class="dropdown-category mx-2">
            <div class="dropdown-toggle" @click="toggleCategoryDropdown">
              {{ selectedCategory }}
            </div>
            <ul v-if="isCategoryDropdownOpen" class="dropdown-menu show">
              <li
                v-for="category in categories"
                :key="category.id"
                @click="selectCategory(category.name)"
                class="dropdown-item"
              >
                {{ category.name }}
              </li>
            </ul>
          </div>
        </div>
        <div class="search-container">
          <div class="search-box">
            <input
              type="text"
              class="search-input"
              placeholder="Search Story"
              v-model="searchKeyword"
            />
            <i class="fas fa-search search-icon"></i>
          </div>
        </div>
      </div>
      <div class="container-card mt-5">
        <div class="row container-fluid mt-5">
          <div
            class="col-md-4 card-container mt-5"
            v-for="story in paginatedStories"
            :key="story.id"
          >
            <Card :story="story" class="card-home mb-4"></Card>
          </div>
        </div>
      </div>
      <!-- Pagination -->
      <div v-if="totalPages > 0" class="pagination-container mt-4">
        <Pagination
          :totalPages="totalPages"
          :currentPage="currentPage"
          :onPageChange="changePage"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from "vue";
import {
  fetchAllStories,
  fetchStoriesByLatest,
  fetchSortedStories,
  fetchCategories,
  fetchStoriesByCategoryId,
} from "~/services/apiService";
import { useAuthStore } from "@/stores/authStore";
import { useRoute } from "vue-router";
import Pagination from "@/components/Pagination.vue";

interface Story {
  id: number;
  title: string;
  content: string;
  category: { name: string };
  user: { id: number; avatar: string; username: string };
  images: { id: number; filename: string; url: string }[];
}

interface Category {
  id: number;
  name: string;
}

const route = useRoute();
const authStore = useAuthStore();
const selectedSort = ref("Newest");
const selectedCategory = ref("Select Category");
const isSortDropdownOpen = ref(false);
const isCategoryDropdownOpen = ref(false);
const allStories = ref<Story[]>([]);
const categories = ref<Category[]>([]);
const searchKeyword = ref<string>(
  Array.isArray(route.query.keyword)
    ? route.query.keyword[0] || ""
    : route.query.keyword || ""
);
const currentPage = ref(1);
const itemsPerPage = 12; // Ubah menjadi 12 sesuai dengan response API
const totalPages = ref(1);
const lastPage = ref(1);

// Filter stories based on the search keyword
const filteredStories = computed(() => {
  const keyword = (searchKeyword.value ?? "").toLowerCase();
  if (!keyword) return allStories.value;
  return allStories.value.filter((story) => {
    return (
      story.title.toLowerCase().includes(keyword) ||
      story.content.toLowerCase().includes(keyword)
    );
  });
});

// Pagination logic
const paginatedStories = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredStories.value.slice(start, end);
});

const changePage = async (page: number) => {
  if (page < 1 || page > lastPage.value) return;
  currentPage.value = page;
  await loadStories(page);
};

const toggleSortDropdown = () => {
  isSortDropdownOpen.value = !isSortDropdownOpen.value;
};

const toggleCategoryDropdown = () => {
  isCategoryDropdownOpen.value = !isCategoryDropdownOpen.value;
};

const selectSort = async (sortOption: string) => {
  selectedSort.value = sortOption;
  isSortDropdownOpen.value = false;

  if (sortOption === "Newest") {
    try {
      console.log("Fetching latest stories...");
      const latestStories = await fetchStoriesByLatest();
      console.log("Latest Stories:", latestStories);
      allStories.value = latestStories;
      currentPage.value = 1;
      totalPages.value = Math.ceil(latestStories.length / itemsPerPage);
    } catch (error) {
      console.error("Error fetching latest stories:", error);
    }
  } else if (sortOption === "A - Z") {
    try {
      console.log("Fetching sorted stories A-Z...");
      const sortedStories = await fetchSortedStories("asc");
      console.log("Sorted Stories:", sortedStories);
      allStories.value = sortedStories;
      currentPage.value = 1;
      totalPages.value = Math.ceil(sortedStories.length / itemsPerPage);
    } catch (error) {
      console.error("Error fetching sorted stories:", error);
    }
  } else if (sortOption === "Z - A") {
    try {
      console.log("Fetching sorted stories Z-A...");
      const sortedStories = await fetchSortedStories("desc");
      console.log("Sorted Stories:", sortedStories);
      allStories.value = sortedStories;
      currentPage.value = 1;
      totalPages.value = Math.ceil(sortedStories.length / itemsPerPage);
    } catch (error) {
      console.error("Error fetching sorted stories:", error);
    }
  }
};

const selectCategory = async (category: string) => {
  selectedCategory.value = category;
  isCategoryDropdownOpen.value = false;

  const categoryId = categories.value.find((cat) => cat.name === category)?.id;
  if (categoryId) {
    try {
      const stories = await fetchStoriesByCategoryId(
        categoryId,
        authStore.token
      );
      allStories.value = stories;
      currentPage.value = 1;
      totalPages.value = Math.ceil(stories.length / itemsPerPage);
    } catch (error) {
      console.error("Error fetching stories by category:", error);
    }
  } else {
    console.error("Category ID not found.");
  }
};

const loadStories = async (page: number) => {
  try {
    const storiesData = await fetchAllStories(page);
    if (storiesData && Array.isArray(storiesData.stories)) {
      allStories.value = [...allStories.value, ...storiesData.stories];
      totalPages.value = storiesData.pagination.last_page;
      lastPage.value = storiesData.pagination.last_page;
    } else {
      console.error("No stories found in the response.");
    }
  } catch (error) {
    console.error("Error fetching stories:", error);
  }
};

onMounted(async () => {
  try {
    const storiesData = await fetchAllStories(currentPage.value);
    if (storiesData && Array.isArray(storiesData.stories)) {
      allStories.value = storiesData.stories;
      totalPages.value = storiesData.pagination.last_page;
      lastPage.value = storiesData.pagination.last_page;
    } else {
      console.error("No stories found in the response.");
    }

    const token = authStore.token;
    if (!token) {
      console.error("No token found. Please log in again.");
      return;
    }

    const categoriesData = await fetchCategories(token);
    categories.value = categoriesData;
  } catch (error) {
    console.error("Error fetching stories or categories:", error);
  }
});

watch(searchKeyword, () => {
  currentPage.value = 1;
});
</script>

<style scoped>
/* Original Desktop Styles */
.pagination-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.p-sort,
.p-sort-c {
  margin: 0 10px;
}

.hero-bg {
  background-color: #f0f5ed;
}

.hero-child {
  margin-left: 30px;
  font-size: 20px;
}

.dropdown-category,
.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-menu.show {
  display: block;
}

.dropdown-toggle {
  cursor: pointer;
  padding: 10px;
  border-radius: 5px;
}

.first-hero-child {
  margin-left: 50px;
  font-size: 20px;
  text-decoration: none;
  color: black;
}

.search-container {
  margin-left: auto;
}

.search-box {
  position: relative;
  width: 100%;
  max-width: 300px;
}

.search-input {
  width: 100%;
  padding: 10px 40px 10px 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.search-icon {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #aaa;
}

.dropdown-menu {
  position: absolute;
  background-color: white;
  border: 1px solid #ccc;
  z-index: 1000;
  display: none;
}

.dropdown-item:hover {
  background-color: #e0e0e0;
}

.dropdown-item {
  padding: 10px;
  cursor: pointer;
}

.hero {
  font-family: Dm Sans, sans-serif;
  margin: 25px;
  font-size: 25px;
}

/* Mobile Responsive Styles */
@media screen and (max-width: 768px) {
  .d-flex.justify-content-between.align-items-center {
    flex-direction: column;
    gap: 20px;
  }

  .d-flex.align-items-center {
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
  }

  .search-container {
    width: 100%;
    margin: 15px 0;
  }

  .search-box {
    max-width: 100%;
  }

  .hero {
    margin: 15px;
  }

  .hero-child,
  .first-hero-child {
    font-size: 16px;
    margin-left: 15px;
  }

  .p-sort,
  .p-sort-c {
    margin: 0 5px;
    font-size: 16px;
  }

  .dropdown,
  .dropdown-category {
    margin: 5px !important;
  }

  .dropdown-toggle {
    font-size: 14px;
    padding: 8px;
  }

  .col-md-4.card-container {
    padding: 0 10px;
  }

  .card-home {
    margin-bottom: 20px !important;
  }
}

/* Small Mobile Devices */
@media screen and (max-width: 480px) {
  .hero-child,
  .first-hero-child {
    font-size: 14px;
    margin-left: 10px;
  }

  .p-sort,
  .p-sort-c {
    font-size: 14px;
  }

  .dropdown-toggle {
    font-size: 13px;
    padding: 6px;
  }

  .search-input {
    font-size: 14px;
    padding: 8px 30px;
  }

  .pagination-container {
    margin-top: 15px;
  }
}
</style>
