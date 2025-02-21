<template>
  <div class="pagination">
    <button
      v-for="page in totalPages"
      :key="page"
      :class="{ active: currentPage === page }"
      @click="goToPage(page)"
    >
      {{ page }}
    </button>
    <button @click="goToNextPage" :disabled="currentPage === totalPages">
      Next
    </button>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  totalPages: {
    type: Number,
    required: true,
  },
  currentPage: {
    type: Number,
    required: true,
  },
  onPageChange: {
    type: Function,
    required: true,
  },
});

const goToPage = (page) => {
  props.onPageChange(page);
};

const goToNextPage = () => {
  if (props.currentPage < props.totalPages) {
    props.onPageChange(props.currentPage + 1);
  }
};
</script>

<style>
.pagination {
  display: flex;
  gap: 10px;
}

button {
  padding: 15px 20px;
  border: none;
  background-color: #f0f5ed;
  font-size: 20px;
  border-radius: 35px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #466543;
  color: white;
}

button.active {
  background-color: #466543;
  color: white;
  border-radius: 5px;
  border: none;
}

button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}
</style>
