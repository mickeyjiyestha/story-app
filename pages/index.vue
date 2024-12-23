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

  <div>
    <h1 class="text-welcome text-center mt-5">Welcome To Story Time</h1>
    <p class="text-opening text-center mt-5">
      The world's most-loved social storytelling platform. Story time connects a
      global community of 90 million readers and writers
    </p>
    <p class="text-opening text-center">through the power of story.</p>

    <div class="search-container mt-5">
      <div class="search-box">
        <input type="text" class="search-input" placeholder="Search Story" />
        <i class="fas fa-search search-icon"></i>
      </div>
    </div>

    <div class="d-flex justify-content-center mt-5 mb-5">
      <img src="@/assets/logo_home.svg" alt="" />
    </div>

    <!-- Latest Story  -->
    <div>
      <div class="d-flex justify-content-between">
        <h1 class="text-latest">Latest Story</h1>
        <nuxt-link to="/allstory">
          <p class="text-explore">
            Explore More <i class="fa-solid fa-arrow-right"></i>
          </p>
        </nuxt-link>
      </div>
      <div class="latest-container">
        <hr class="custom-hr" />
      </div>

      <div class="card-container">
        <div class="first-card">
          <Card
            :imageSrc="latestImage"
            :profilePic="mickeyImage"
            class="card-home"
          ></Card>
        </div>
        <div class="sec-card">
          <Card
            :imageSrc="latestImage2"
            :profilePic="mickeyImage"
            class="card-home"
          ></Card>
        </div>
        <div class="sec-card">
          <Card
            :imageSrc="latestImage3"
            :profilePic="mickeyImage"
            class="card-home"
          ></Card>
        </div>
        <div class="sec-card">
          <Card
            :imageSrc="latestImage4"
            :profilePic="mickeyImage"
            class="card-home"
          ></Card>
        </div>
        <div class="sec-card">
          <Card
            :imageSrc="latestImage5"
            :profilePic="mickeyImage"
            class="card-home"
          ></Card>
        </div>
        <div class="sec-card">
          <Card
            :imageSrc="latestImage6"
            :profilePic="mickeyImage"
            class="card-home"
          ></Card>
        </div>
      </div>
    </div>

    <!--  Comedy -->
    <div>
      <div class="d-flex justify-content-between">
        <h1 class="text-comedy">Comedy</h1>
        <nuxt-link to="/allstory">
          <p class="text-explore">
            Explore More <i class="fa-solid fa-arrow-right"></i>
          </p>
        </nuxt-link>
      </div>
      <div class="latest-container">
        <hr class="custom-hr" />
      </div>

      <!-- Kontainer untuk kartu -->
      <div class="card-container-comedy d-flex">
        <div class="first-card">
          <CardBig
            :imageSrc="comedyImage"
            :profilePic="mickeyImage"
            class="card-home"
          ></CardBig>
        </div>
        <div class="sec-card-comedy">
          <Cardsmall
            :imageSrc="comedyImage2"
            :profilePic="mickeyImage"
          ></Cardsmall>
          <Cardsmall
            :imageSrc="comedyImage3"
            :profilePic="mickeyImage"
          ></Cardsmall>
        </div>
      </div>
    </div>

    <!-- Romance -->
    <div>
      <div class="d-flex justify-content-between">
        <h1 class="text-romance">Romance</h1>
        <nuxt-link to="/allstory">
          <p class="text-explore">
            Explore More <i class="fa-solid fa-arrow-right"></i>
          </p>
        </nuxt-link>
      </div>
      <div class="latest-container">
        <hr class="custom-hr" />
      </div>

      <div class="card-container">
        <div class="first-card">
          <Card
            :imageSrc="romanceImage"
            :profilePic="mickeyImage"
            class="card-home"
          ></Card>
        </div>
        <div class="sec-card">
          <Card
            :imageSrc="romanceImage2"
            :profilePic="mickeyImage"
            class="card-home"
          ></Card>
        </div>
        <div class="sec-card">
          <Card
            :imageSrc="romanceImage3"
            :profilePic="mickeyImage"
            class="card-home"
          ></Card>
        </div>
      </div>
    </div>

    <!--  Horror -->
    <div>
      <div class="d-flex justify-content-between">
        <h1 class="text-horror">Horror</h1>
        <nuxt-link to="/allstory">
          <p class="text-explore">
            Explore More <i class="fa-solid fa-arrow-right"></i>
          </p>
        </nuxt-link>
      </div>
      <div class="latest-container">
        <hr class="custom-hr" />
      </div>

      <!-- Kontainer untuk kartu -->
      <div class="card-container-comedy d-flex">
        <div class="first-card">
          <CardBig
            :imageSrc="horrorImage"
            :profilePic="mickeyImage"
            class="card-home"
          ></CardBig>
        </div>
        <div class="sec-card-comedy">
          <Cardsmall
            :imageSrc="horrorImage2"
            :profilePic="mickeyImage"
          ></Cardsmall>
          <Cardsmall
            :imageSrc="horrorImage3"
            :profilePic="mickeyImage"
          ></Cardsmall>
        </div>
      </div>
    </div>

    <!-- Categories -->
    <div>
      <h1 class="text-horror">More Categories</h1>
      <div class="latest-container">
        <hr class="custom-hr" />
      </div>
      <div class="d-flex container-category">
        <Buttoncategory class="btn-category"></Buttoncategory>
        <Buttoncategory class="btn-category"></Buttoncategory>
        <Buttoncategory class="btn-category"></Buttoncategory>
        <Buttoncategory class="btn-category"></Buttoncategory>
        <Buttoncategory class="btn-category"></Buttoncategory>
        <Buttoncategory class="btn-category"></Buttoncategory>
      </div>
      <hr />
      <div class="d-flex p-3 justify-content-between">
        <p class="ml-5">PT. Timedoor Indonesia. All right reserved</p>
        <div class="logo-container">
          <img src="@/assets/fb.png" class="mr-3" alt="" />
          <img src="@/assets/yt.png" class="mr-3" alt="" />
          <img src="@/assets/ig.png" class="mr-3" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import WebHeader from "../components/WebHeader.vue";
import latestImage from "@/assets/story-latest.webp";
import latestImage2 from "@/assets/story-latest-2.webp";
import latestImage3 from "@/assets/story-latest-3.webp";
import latestImage4 from "@/assets/story-latest-4.webp";
import latestImage5 from "@/assets/story-latest-5.webp";
import latestImage6 from "@/assets/story-latest-6.webp";
import comedyImage from "@/assets/comedy-story.webp";
import comedyImage2 from "@/assets/comedy-story-2.webp";
import comedyImage3 from "@/assets/comedy-story-3.webp";
import mickeyImage from "@/assets/MICKEY.png";
import romanceImage from "@/assets/romance-story.webp";
import romanceImage2 from "@/assets/romance-story-2.webp";
import romanceImage3 from "@/assets/romance-story-3.webp";
import horrorImage from "@/assets/horror-story.webp";
import horrorImage2 from "@/assets/horror-story-2.webp";
import horrorImage3 from "@/assets/horror-story-3.webp";
</script>

<style scoped>
.container-category {
  margin-left: 100px;
}

.btn-category {
  margin-right: 20px;
}

.text-horror {
  font-family: Playfair Display, sans-serif;
  font-weight: 500;
  font-size: 45px;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
  margin-bottom: 40px;
  margin-top: 70px;
  margin-left: 100px;
}

.text-comedy {
  font-family: Playfair Display, sans-serif;
  font-weight: 500;
  font-size: 45px;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
  margin-bottom: 40px;
  margin-top: 70px;
  margin-left: 100px;
}

.text-romance {
  font-family: Playfair Display, sans-serif;
  font-weight: 500;
  font-size: 45px;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
  margin-bottom: 40px;
  margin-top: 70px;
  margin-left: 100px;
}

.sec-card-comedy {
  margin-left: 40px;
}

.card-container-comedy {
  height: auto;
  width: auto;
}

.sec-card {
  margin-left: 20px;
}

.latest-container h1 {
  margin-left: 100px;
}

.first-card {
  margin-left: 100px;
}

.card-container {
  display: flex;
  overflow-x: auto; /* Izinkan pengguliran horizontal */
  overflow-y: hidden; /* Sembunyikan pengguliran vertikal */
  padding: 10px 0;
  margin-bottom: 10px;
  scrollbar-width: none;
}

.card-container::-webkit-scrollbar {
  display: none;
}

.card-home {
  margin-left: 20px;
}

.text-welcome {
  font-family: Playfair Display, sans-serif;
  font-weight: 800;
  font-size: 60px;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
}

.text-explore {
  font-family: DM Sans, sans-serif;
  font-size: 25px;
  margin-right: 100px;
  margin-top: 100px;
  float: left;
  text-decoration: none;
  color: black;
}

.text-latest {
  font-family: Playfair Display, sans-serif;
  font-weight: 500;
  font-size: 45px;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
  margin-bottom: 40px;
  margin-top: 70px;
  margin-left: 100px;
}

.text-opening {
  font-family: DM Sans, sans-serif;
  font-size: 23px;
  color: #4b4b4b;
}

.search-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.search-box {
  position: relative;
  width: 100%;
  max-width: 600px;
}

.search-input {
  width: 100%;
  padding: 12px 20px;
  font-size: 1em;
  border: 2px solid #ddd;
  border-radius: 10px;
  outline: none;
  padding-left: 40px;
  transition: border-color 0.3s;
}

.search-input:focus {
  border-color: #1e90ff;
}

.search-icon {
  position: absolute;
  right: 25px;
  top: 50%;
  transform: translateY(-50%);
  color: #888;
  font-size: 1.2em;
  pointer-events: none;
}

.custom-hr {
  width: 90%;
  margin: 20px auto;
  border: 1px solid #ccc;
}
</style>
