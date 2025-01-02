<template>
  <link
    rel="stylesheet"
    href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
  />
  <div class="d-flex">
    <div class="card">
      <div class="image-container">
        <img :src="imageSrc" class="card-img-top card-image" alt="..." />
        <bookmark class="bookmark-icon"></bookmark>
        <!-- Bookmark tetap ada -->
      </div>
      <div class="card-body">
        <h5 class="card-title">Path of Luminous Forest</h5>
        <p class="card-text">
          A mystical journey unfolds as a hidden path of glowing light leads to
          an enchanted castle, revealing secrets of an ancient world.
        </p>
        <div class="footer-card">
          <img :src="profilePic" class="profile-pic" alt="Profile Picture" />
          <div>
            <p class="mb-0">Mickey</p>
          </div>
          <div class="d-flex align-items-center ml-auto">
            <p class="mb-0 mr-3">17 July 2023</p>
            <div class="category">
              <p class="mb-0">Romance</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    imageSrc: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
.card-image {
  border-radius: 15px; /* Mengatur border radius untuk gambar */
  width: 547px;
  height: 427px;
}
.card {
  border: none; /* Menghilangkan border pada card */
  width: 547px; /* Mengatur lebar card menjadi 547px */
}

.card-title {
  padding-left: 0; /* Menghilangkan padding kiri */
  padding-right: 0; /* Menghilangkan padding kanan */
}
.footer-card {
  display: flex;
  align-items: center; /* Menyelaraskan elemen secara vertikal */
  font-size: 16px; /* Ukuran font untuk footer */
}
.profile-pic {
  width: 40px; /* Lebar gambar profil */
  height: 40px; /* Tinggi gambar profil */
  border-radius: 50%; /* Membuat gambar profil menjadi bulat */
  margin-right: 10px; /* Jarak antara gambar dan nama */
}
.category {
  background-color: #f0f5ed;
  color: #466543;
  padding: 5px 10px; /* Memberikan padding pada kategori */
  border-radius: 5px; /* Membulatkan sudut kategori */
}

.image-container {
  position: relative; /* Membuat elemen bookmark bisa diposisikan relatif terhadap gambar */
}

.bookmark-icon {
  position: absolute;
  bottom: 40px; /* Menempatkan bookmark di bagian bawah */
  right: 30px; /* Menempatkan bookmark di bagian kanan */
  background-color: #466543;
  border-radius: 100%; /* Membuat bentuk bookmark melingkar */
  padding: 10px; /* Padding untuk memperbesar ikon */
  cursor: pointer; /* Menambahkan kursor pointer saat hover */
}
</style>
