import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://b39d-103-100-175-121.ngrok-free.app/api",
  headers: {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "69420",
  },
});

export const login = async (credentials, apiBaseUrl) => {
  const response = await axios.post(`${apiBaseUrl}/api/login`, credentials);
  return response;
};

export const register = async (userData, apiBaseUrl) => {
  const response = await axios.post(`${apiBaseUrl}/api/register`, userData);
  return response;
};

export const profilePicture = (avatarData, token) => {
  const formData = new FormData();
  formData.append("avatar", avatarData);

  return apiClient.post("/upload-avatar", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const fetchUserData = async (userId, token, apiBaseUrl) => {
  const response = await axios.get(`${apiBaseUrl}/api/users/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "ngrok-skip-browser-warning": "69420",
    },
  });
  return response;
};

export const fetchUserStories = async (userId, token, apiBaseUrl, page = 1) => {
  const response = await axios.get(
    `${apiBaseUrl}/api/my-profile/stories?page=${page}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "ngrok-skip-browser-warning": "69420",
      },
    }
  );
  return response.data;
};

export const fetchAllStories = async (page = 1) => {
  try {
    const response = await apiClient.get(`/all-stories?page=${page}`);
    console.log(`Raw API Response for page ${page}:`, response);

    // Validasi jika data tersedia dan tidak kosong
    if (
      response.status === 200 &&
      response.data &&
      response.data.data && // Pastikan data ada
      response.data.data.stories && // Periksa ada stories
      Array.isArray(response.data.data.stories) && // Pastikan stories adalah array
      response.data.data.stories.length > 0
    ) {
      console.log(
        `Valid Stories for page ${page}:`,
        response.data.data.stories
      );
      return response.data.data; // Kembalikan seluruh data termasuk pagination
    } else {
      console.log(`No stories found in the response for page ${page}.`);
      return {
        stories: [],
        pagination: {
          total: 0,
          per_page: 0,
          current_page: 1,
          last_page: 1,
          next_page_url: null,
          prev_page_url: null,
        },
      }; // Kembalikan struktur data default
    }
  } catch (error) {
    console.error(`Error fetching stories for page ${page}:`, error);
    throw error; // Lempar error untuk debugging lebih lanjut
  }
};

export const fetchStoriesByKeyword = async (keyword) => {
  try {
    const response = await apiClient.get(
      `/all-stories?keyword=${encodeURIComponent(keyword)}`
    );

    // Log the parsed JSON response
    console.log("Parsed API Response:", response.data);

    // Check if the response is okay
    if (response.status !== 200) {
      throw new Error("Network response was not ok");
    }

    // Return the parsed JSON
    return response.data;
  } catch (error) {
    console.error("Error fetching stories by keyword:", error);
    throw error;
  }
};

export const fetchStoriesByLatest = async () => {
  try {
    const response = await apiClient.get("/story-index");
    console.log("Raw API Response:", response);

    // Validasi jika data tersedia dan tidak kosong
    if (
      response.status === 200 &&
      response.data &&
      response.data.data && // Pastikan data ada
      response.data.data.stories && // Periksa ada stories
      Array.isArray(response.data.data.stories) && // Pastikan stories adalah array
      response.data.data.stories.length > 0
    ) {
      console.log("Stories By Latest:", response.data.data.stories);
      return response.data.data.stories; // Kembalikan data cerita
    } else {
      console.log("No stories found in the response.");
      return []; // Kembalikan array kosong jika tidak ada cerita
    }
  } catch (error) {
    console.error("Error fetching stories:", error);
    throw error; // Lempar error untuk debugging lebih lanjut
  }
};

export const fetchStoriesByRomance = async () => {
  try {
    const response = await apiClient.get("/story-by-category/3");
    console.log("Raw API Response:", response);

    // Validasi jika data tersedia dan tidak kosong
    if (
      response.status === 200 &&
      response.data &&
      response.data.data && // Pastikan data ada
      response.data.data.stories && // Periksa ada stories
      Array.isArray(response.data.data.stories) && // Pastikan stories adalah array
      response.data.data.stories.length > 0
    ) {
      console.log("Stories By Romance:", response.data.data.stories);
      return response.data.data.stories; // Kembalikan data cerita
    } else {
      console.log("No stories found in the response.");
      return []; // Kembalikan array kosong jika tidak ada cerita
    }
  } catch (error) {
    console.error("Error fetching stories:", error);
    throw error; // Lempar error untuk debugging lebih lanjut
  }
};

export const fetchStoriesByComedy = async () => {
  try {
    const response = await apiClient.get("/story-by-category/2");
    console.log("Raw API Response:", response);

    // Validasi jika data tersedia dan tidak kosong
    if (
      response.status === 200 &&
      response.data &&
      response.data.data && // Pastikan data ada
      response.data.data.stories && // Periksa ada stories
      Array.isArray(response.data.data.stories) && // Pastikan stories adalah array
      response.data.data.stories.length > 0
    ) {
      console.log("Stories By Comedy:", response.data.data.stories);
      return response.data.data.stories; // Kembalikan data cerita
    } else {
      console.log("No stories found in the response.");
      return []; // Kembalikan array kosong jika tidak ada cerita
    }
  } catch (error) {
    console.error("Error fetching stories:", error);
    throw error; // Lempar error untuk debugging lebih lanjut
  }
};

export const fetchStoriesByHorror = async () => {
  try {
    const response = await apiClient.get("/story-by-category/1");
    console.log("Raw API Response:", response);

    // Validasi jika data tersedia dan tidak kosong
    if (
      response.status === 200 &&
      response.data &&
      response.data.data && // Pastikan data ada
      response.data.data.stories && // Periksa ada stories
      Array.isArray(response.data.data.stories) && // Pastikan stories adalah array
      response.data.data.stories.length > 0
    ) {
      console.log("Stories By Horror:", response.data.data.stories);
      return response.data.data.stories; // Kembalikan data cerita
    } else {
      console.log("No stories found in the response.");
      return []; // Kembalikan array kosong jika tidak ada cerita
    }
  } catch (error) {
    console.error("Error fetching stories:", error);
    throw error; // Lempar error untuk debugging lebih lanjut
  }
};

export const fetchSortedStories = async (sortOrder) => {
  try {
    const response = await apiClient.get(`/story-sort-by?sort=${sortOrder}`);

    // Log the response for debugging
    console.log("Raw API Response:", response);

    // Validasi jika data tersedia dan tidak kosong
    if (
      response.status === 200 &&
      response.data &&
      response.data.data && // Pastikan data ada
      response.data.data.stories && // Periksa ada stories
      Array.isArray(response.data.data.stories) // Pastikan stories adalah array
    ) {
      console.log("Sorted Stories:", response.data.data.stories);
      return response.data.data.stories; // Kembalikan data cerita
    } else {
      console.log("No stories found in the response.");
      return []; // Kembalikan array kosong jika tidak ada cerita
    }
  } catch (error) {
    console.error("Error fetching sorted stories:", error);
    throw error; // Lempar error untuk debugging lebih lanjut
  }
};

export const fetchCategories = async (token) => {
  try {
    const response = await apiClient.get("/categories", {
      headers: {
        "ngrok-skip-browser-warning": "69420", // Include your custom header
        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
      },
    });

    console.log("Raw API Response:", response);

    // Validate if data is available and not empty
    if (
      response.status === 200 &&
      response.data &&
      Array.isArray(response.data.categories) // Check if categories is an array directly from response.data
    ) {
      console.log("Categories:", response.data.categories);
      return response.data.categories; // Return the categories
    } else {
      console.log("No categories found in the response.");
      return []; // Return an empty array if no categories
    }
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error; // Throw error for further debugging
  }
};

// apiService.js

export const fetchStoriesByCategoryId = async (categoryId, token) => {
  try {
    const response = await apiClient.get(`/story-by-category/${categoryId}`, {
      headers: {
        "ngrok-skip-browser-warning": "69420", // Include your custom header
        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
      },
    });

    console.log("Raw API Response:", response);

    // Validate if data is available and not empty
    if (
      response.status === 200 &&
      response.data &&
      response.data.data && // Check if data is available
      Array.isArray(response.data.data.stories) // Check if stories is an array
    ) {
      console.log("Stories:", response.data.data.stories);
      return response.data.data.stories; // Return the stories
    } else {
      console.log("No stories found in the response.");
      return []; // Return an empty array if no stories
    }
  } catch (error) {
    console.error("Error fetching stories by category:", error);
    throw error; // Throw error for further debugging
  }
};

export const fetchUserBookmarks = async (userId, token) => {
  try {
    const response = await apiClient.get("/bookmarks", {
      headers: {
        Authorization: `Bearer ${token}`, // Tambahkan token ke header
      },
    });

    // Log the response for debugging
    console.log("Raw API Response:", response);

    // Kembalikan data dari respons
    return response.data;
  } catch (error) {
    console.error("Error fetching user bookmarks:", error);
    throw error; // Lempar error untuk penanganan lebih lanjut di komponen
  }
};
