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
    <div class="d-flex story-container">
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

        <p>Category</p>
        <div class="dropdown">
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
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const selectedSort = ref("Newest");
const selectedCategory = ref("Comedy");
const isSortDropdownOpen = ref(false);
const isCategoryDropdownOpen = ref(false);

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
</script>

<style scoped>
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

.story-container {
  padding: 20px;
}

.dropdown-menu {
  list-style-type: none; /* Menghilangkan bullet points */
  padding: 0; /* Menghilangkan padding */
  margin: 0; /* Menghilangkan margin */
}

.dropdown-item {
  padding: 10px; /* Padding untuk item dropdown */
  cursor: pointer; /* Menunjukkan bahwa item dapat diklik */
}

.dropdown-item:hover {
  background-color: #e0e0e0; /* Warna latar belakang saat hover */
}

.dropdown {
  margin-right: 60px;
  margin-left: 20px;
}

.hero {
  font-family: Dm Sans, sans-serif;
  margin-left: 25px;
  margin-right: 25px;
  font-size: 25px;
}
</style>
