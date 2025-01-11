import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://e016-103-19-231-196.ngrok-free.app/api",
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
  const apiBaseUrl = "https://e016-103-19-231-196.ngrok-free.app"; // Sesuaikan URL
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

export const fetchStoriesByLatest = async () => {
  const apiBaseUrl = "https://e016-103-19-231-196.ngrok-free.app"; // Sesuaikan URL
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
  const apiBaseUrl = "https://e016-103-19-231-196.ngrok-free.app"; // Sesuaikan URL
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
  const apiBaseUrl = "https://e016-103-19-231-196.ngrok-free.app"; // Sesuaikan URL
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
      return []; // Kembalikan array kosong jika tidak ada cerita
    }
  } catch (error) {
    console.error("Error fetching stories:", error);
    throw error; // Lempar error untuk debugging lebih lanjut
  }
};

export const fetchStoriesByHorror = async () => {
  const apiBaseUrl = "https://e016-103-19-231-196.ngrok-free.app"; // Sesuaikan URL
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
