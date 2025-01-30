import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://cbdf-103-100-175-121.ngrok-free.app/api",
  headers: {
    "Content-Type": "application/json",
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

export const fetchAllStories = async () => {
  const apiBaseUrl = "https://cbdf-103-100-175-121.ngrok-free.app"; // Sesuaikan URL
  try {
    const response = await axios.get(`${apiBaseUrl}/api/all-stories`, {
      headers: {
        "ngrok-skip-browser-warning": "69420",
      },
    });

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
      console.log("Valid Stories:", response.data.data.stories);
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

export const fetchStoriesByKeyword = async (keyword) => {
  const apiBaseUrl = "https://cbdf-103-100-175-121.ngrok-free.app"; // Sesuaikan URL
  try {
    const response = await fetch(
      `${apiBaseUrl}/api/all-stories?keyword=${encodeURIComponent(keyword)}`,
      {
        method: "GET",
        headers: {
          "ngrok-skip-browser-warning": "69420", // Add custom header here
        },
      }
    );

    // Parse the JSON response
    const responseData = await response.json();

    // Log the parsed JSON response
    console.log("Parsed API Response:", responseData);

    // Check if the response is okay
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    // Return the parsed JSON
    return responseData;
  } catch (error) {
    console.error("Error fetching stories by keyword:", error);
    throw error;
  }
};

export const fetchStoriesByLatest = async () => {
  const apiBaseUrl = "https://cbdf-103-100-175-121.ngrok-free.app"; // Sesuaikan URL
  try {
    const response = await axios.get(`${apiBaseUrl}/api/story-index`, {
      headers: {
        "ngrok-skip-browser-warning": "69420",
      },
    });

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
  const apiBaseUrl = "https://cbdf-103-100-175-121.ngrok-free.app"; // Sesuaikan URL
  try {
    const response = await axios.get(`${apiBaseUrl}/api/story-by-category/2`, {
      headers: {
        "ngrok-skip-browser-warning": "69420",
      },
    });

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
  const apiBaseUrl = "https://cbdf-103-100-175-121.ngrok-free.app"; // Sesuaikan URL
  try {
    const response = await axios.get(`${apiBaseUrl}/api/story-by-category/3`, {
      headers: {
        "ngrok-skip-browser-warning": "69420",
      },
    });

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
      return []; // Kembalikan array kosong jika tidak ada ceritaP
    }
  } catch (error) {
    console.error("Error fetching stories:", error);
    throw error; // Lempar error untuk debugging lebih lanjut
  }
};

export const fetchStoriesByHorror = async () => {
  const apiBaseUrl = "https://cbdf-103-100-175-121.ngrok-free.app"; // Sesuaikan URL
  try {
    const response = await axios.get(`${apiBaseUrl}/api/story-by-category/1`, {
      headers: {
        "ngrok-skip-browser-warning": "69420",
      },
    });

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
  const response = await fetch(
    `https://cbdf-103-100-175-121.ngrok-free.app/api/story-sort-by?sort=${sortOrder}`,
    {
      method: "GET", // Specify the method
      headers: {
        "ngrok-skip-browser-warning": "69420", // Add your custom header here
        "Content-Type": "application/json", // Optional: specify content type
      },
    }
  );

  // Log the response for debugging
  const text = await response.text(); // Get the response as text
  console.log("Response Text:", text); // Log the response text

  // Try to parse the response as JSON
  try {
    const data = JSON.parse(text); // Parse the text as JSON
    return data.data.stories; // Adjust based on your API response structure
  } catch (error) {
    console.error("Error parsing JSON:", error);
    throw new Error("Failed to parse JSON response");
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
  const apiBaseUrl = "https://cbdf-103-100-175-121.ngrok-free.app"; // Your API base URL
  try {
    const response = await axios.get(`${apiBaseUrl}/api/bookmarks`, {
      headers: {
        "ngrok-skip-browser-warning": "69420", // Include your custom header
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // Return the data from the response
  } catch (error) {
    throw error; // Rethrow the error for handling in the component
  }
};
