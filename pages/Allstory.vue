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
    <div v-if="searchKeyword" class="search-results-count container-fluid mt-3">
      <p class="mb-0">
        {{ allStories.length }} results for '{{ searchKeyword }}'
      </p>
    </div>
    <div class="hero-bg d-flex p-3">
      <nuxt-link to="/">
        <p class="first-hero-child">Home</p>
      </nuxt-link>
      <p class="hero-child">/</p>
      <nuxt-link to="/allstory">
        <p class="hero-child">All Story</p>
      </nuxt-link>
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
              @input="debouncedSearch"
            />
            <i class="fas fa-search search-icon" @click="handleSearch"></i>
          </div>
        </div>
      </div>
      <div class="container-card mt-5">
        <div class="row container-fluid mt-5">
          <div
            class="col-md-4 card-container mt-5"
            v-for="story in allStories"
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

<script>
import { ref, onMounted, watch } from "vue";
import {
  fetchAllStories,
  fetchStoriesByLatest,
  fetchByNewest,
  fetchByPopluar,
  fetchSortedStories,
  fetchCategories,
  fetchStoriesByCategoryId,
  fetchStoriesByKeyword,
  fetchStoriesByCategoryAndSort,
} from "~/services/apiService";
import { useAuthStore } from "@/stores/authStore";
import { useRoute, useRouter } from "vue-router";
import Pagination from "@/components/Pagination.vue";
import Card from "@/components/Card.vue";

export default {
  components: {
    Pagination,
    Card,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const authStore = useAuthStore();
    const selectedSort = ref("Newest");
    const selectedCategory = ref("Select Category");
    const isSortDropdownOpen = ref(false);
    const isCategoryDropdownOpen = ref(false);
    const allStories = ref([]);
    const categories = ref([]);
    const currentCategoryId = ref(null);
    const currentSortOrder = ref(null);
    const searchKeyword = ref(
      Array.isArray(route.query.keyword)
        ? route.query.keyword[0] || ""
        : route.query.keyword || ""
    );
    const currentPage = ref(1);
    const totalPages = ref(1);

    watch(
      () => route.fullPath,
      () => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    );

    const handleSearch = async () => {
      if (searchKeyword.value.trim()) {
        try {
          let results;

          if (currentCategoryId.value && currentSortOrder.value) {
            results = await fetchStoriesByCategoryAndSort(
              currentCategoryId.value,
              currentSortOrder.value,
              authStore.token,
              searchKeyword.value.trim()
            );
          } else if (currentCategoryId.value) {
            results = await fetchStoriesByCategoryId(
              currentCategoryId.value,
              authStore.token,
              searchKeyword.value.trim()
            );
          } else {
            results = await fetchStoriesByKeyword(searchKeyword.value.trim());
          }

          if (results && results.data && Array.isArray(results.data.stories)) {
            allStories.value = results.data.stories;
            totalPages.value = results.data.pagination.last_page;
            router.push({
              query: { ...route.query, keyword: searchKeyword.value.trim() },
            });
          }
        } catch (error) {
          console.error("Error searching stories:", error);
        }
      }
    };

    const loadSearchResults = async () => {
      if (searchKeyword.value) {
        try {
          let results;

          if (currentCategoryId.value && currentSortOrder.value) {
            results = await fetchStoriesByCategoryAndSort(
              currentCategoryId.value,
              currentSortOrder.value,
              authStore.token,
              searchKeyword.value.trim()
            );
          } else {
            results = await fetchStoriesByKeyword(searchKeyword.value.trim());
          }

          if (results && results.data && Array.isArray(results.data.stories)) {
            allStories.value = results.data.stories;
            totalPages.value = results.data.pagination.last_page;
          }
        } catch (error) {
          console.error("Error fetching search results:", error);
        }
      }
    };

    const changePage = async (page) => {
      try {
        currentPage.value = page;
        const storiesData = await fetchAllStories(page);
        if (storiesData && Array.isArray(storiesData.stories)) {
          allStories.value = storiesData.stories;
          totalPages.value = storiesData.pagination.last_page;
        }
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      } catch (error) {
        console.error("Error changing page:", error);
      }
    };

    const toggleSortDropdown = () => {
      isSortDropdownOpen.value = !isSortDropdownOpen.value;
    };

    const toggleCategoryDropdown = () => {
      isCategoryDropdownOpen.value = !isCategoryDropdownOpen.value;
    };

    const selectSort = async (sortOption) => {
      selectedSort.value = sortOption;
      isSortDropdownOpen.value = false;
      currentPage.value = 1;

      try {
        let stories;
        let sortOrder;

        if (sortOption === "A - Z") {
          sortOrder = "asc";
        } else if (sortOption === "Z - A") {
          sortOrder = "desc";
        } else if (sortOption === "Newest") {
          stories = await fetchByNewest(authStore.token);
        } else if (sortOption === "Popular") {
          stories = await fetchByPopluar(authStore.token);
        }

        if (currentCategoryId.value && sortOrder) {
          stories = await fetchStoriesByCategoryAndSort(
            currentCategoryId.value,
            sortOrder,
            authStore.token,
            searchKeyword.value.trim() // Sertakan keyword jika ada
          );
        } else if (sortOrder) {
          stories = await fetchSortedStories(sortOrder);
        }

        if (stories && stories.data && Array.isArray(stories.data.stories)) {
          allStories.value = stories.data.stories;
          totalPages.value = stories.data.pagination.last_page;
          currentSortOrder.value = sortOrder;
        }
      } catch (error) {
        console.error(`Error fetching ${sortOption} stories:`, error);
      }
    };

    const selectCategory = async (category) => {
      selectedCategory.value = category;
      isCategoryDropdownOpen.value = false;
      currentPage.value = 1;

      const categoryId = categories.value.find(
        (cat) => cat.name === category
      )?.id;
      if (categoryId) {
        console.log("Selected Category ID:", categoryId); // Logging untuk debugging

        try {
          let response;

          if (currentSortOrder.value) {
            response = await fetchStoriesByCategoryAndSort(
              categoryId,
              currentSortOrder.value,
              authStore.token,
              searchKeyword.value.trim()
            );
          } else {
            response = await fetchStoriesByCategoryId(
              categoryId,
              authStore.token,
              searchKeyword.value.trim()
            );
          }

          if (
            response &&
            response.data &&
            Array.isArray(response.data.stories)
          ) {
            allStories.value = response.data.stories;
            totalPages.value = response.data.pagination.last_page;
          }

          currentCategoryId.value = categoryId;
        } catch (error) {
          console.error("Error fetching stories by category:", error);
        }
      }
    };

    const loadStories = async (page) => {
      try {
        const storiesData = await fetchAllStories(page);
        if (storiesData && Array.isArray(storiesData.stories)) {
          allStories.value = storiesData.stories;
          totalPages.value = storiesData.pagination.last_page;
        }
      } catch (error) {
        console.error("Error fetching stories:", error);
      }
    };

    onMounted(async () => {
      try {
        const token = authStore.token;
        if (!token) {
          console.error("No token found. Please log in again.");
          return;
        }

        // Ambil query parameter
        const categoryId = route.query.categoryId;
        const keyword = route.query.keyword;

        if (categoryId) {
          // Fetch cerita berdasarkan categoryId
          const result = await fetchStoriesByCategoryId(categoryId, token);
          allStories.value = result.data.stories;
          totalPages.value = result.data.pagination.last_page;
        } else if (keyword) {
          // Fetch cerita berdasarkan keyword
          await loadSearchResults();
        } else {
          // Jika tidak ada categoryId atau keyword, tampilkan semua cerita
          await loadStories(currentPage.value);
        }

        // Fetch categories untuk dropdown
        const categoriesData = await fetchCategories(token);
        categories.value = categoriesData;
      } catch (error) {
        console.error("Error fetching stories or categories:", error);
      }
    });

    watch(searchKeyword, () => {
      if (!searchKeyword.value) {
        loadStories(1);
        router.push({ query: {} });
      }
    });

    return {
      selectedSort,
      selectedCategory,
      isSortDropdownOpen,
      isCategoryDropdownOpen,
      allStories,
      categories,
      searchKeyword,
      currentPage,
      totalPages,
      handleSearch,
      changePage,
      toggleSortDropdown,
      toggleCategoryDropdown,
      selectSort,
      selectCategory,
    };
  },
};
</script>

<style scoped>
.search-results-count {
  font-family: playfair display, serif;
  font-size: 45px;
  margin-left: 60px;
  font-weight: 600;
  margin-bottom: 20px;
  color: #333;
  padding: 0.5rem 0;
}
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
  text-decoration: none;
  color: black;
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
  margin-right: 80px;
}

.search-box {
  position: relative;
  width: 100%;
  max-width: 300px;
}

.search-input {
  width: 100%;
  padding: 10px 40px 10px 20px; /* Padding kanan disesuaikan untuk ikon */
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box; /* Pastikan padding tidak memengaruhi lebar total */
}

.search-icon {
  position: absolute;
  right: 10px; /* Pindahkan ke kanan */
  top: 50%;
  transform: translateY(-50%);
  color: #aaa;
  cursor: pointer; /* Tambahkan efek pointer saat hover */
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
