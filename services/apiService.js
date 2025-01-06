import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://fbec-103-100-175-121.ngrok-free.app/api",
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

export const fetchUserStories = async (userId, token, apiBaseUrl) => {
  const response = await axios.get(`${apiBaseUrl}/api/my-profile/stories`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "ngrok-skip-browser-warning": "69420",
    },
  });
  return response.data;
};

export const fetchAllStories = async () => {
  const apiBaseUrl = "https://fbec-103-100-175-121.ngrok-free.app"; // Sesuaikan URL
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
