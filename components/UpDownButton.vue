<script setup lang="js">
import {useDarkModeStore} from "~/stores/function/dark_mode.js";

const dark_mode = useDarkModeStore();
//滾動到底
const scrollToBottom = () => {
  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: 'smooth'
  });
};
//滾動到頂
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};
</script>

<template>
  <button id="goto" @click="scrollToTop" class="go_top text-gray-900 dark:hover:bg-gray-700">TOP</button>
  <button @click="scrollToBottom" class="go_down dark:hover:bg-gray-700">Down</button>
  <svg @click="dark_mode.change_dark_mode" class="light_button text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium text-center rounded-lg text-xl py-2.5 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M297.2 248.9C311.6 228.3 320 203.2 320 176c0-70.7-57.3-128-128-128S64 105.3 64 176c0 27.2 8.4 52.3 22.8 72.9c3.7 5.3 8.1 11.3 12.8 17.7l0 0c12.9 17.7 28.3 38.9 39.8 59.8c10.4 19 15.7 38.8 18.3 57.5H109c-2.2-12-5.9-23.7-11.8-34.5c-9.9-18-22.2-34.9-34.5-51.8l0 0 0 0c-5.2-7.1-10.4-14.2-15.4-21.4C27.6 247.9 16 213.3 16 176C16 78.8 94.8 0 192 0s176 78.8 176 176c0 37.3-11.6 71.9-31.4 100.3c-5 7.2-10.2 14.3-15.4 21.4l0 0 0 0c-12.3 16.8-24.6 33.7-34.5 51.8c-5.9 10.8-9.6 22.5-11.8 34.5H226.4c2.6-18.7 7.9-38.6 18.3-57.5c11.5-20.9 26.9-42.1 39.8-59.8l0 0 0 0 0 0c4.7-6.4 9-12.4 12.7-17.7zM192 128c-26.5 0-48 21.5-48 48c0 8.8-7.2 16-16 16s-16-7.2-16-16c0-44.2 35.8-80 80-80c8.8 0 16 7.2 16 16s-7.2 16-16 16zm0 384c-44.2 0-80-35.8-80-80V416H272v16c0 44.2-35.8 80-80 80z"/></svg>
</template>

<style scoped>
.light_button{
  position: fixed;
  width: 50px;
  height: 50px;
  background-color: #2a4f6f;
  text-decoration: none;
  color: #eee;
  fill: #eee;
  z-index: 999;
  right: 30px;
  bottom: 150px;
  border-radius: 50%;
  text-align: center;
  line-height: 50px;
  border:2px solid #222;

  transition: opacity 0.5s ease;
}
.go_top {
  position: fixed;
  width: 50px;
  height: 50px;
  background-color: #2a4f6f;
  text-decoration: none;
  color: #eee;
  z-index: 999;
  right: 30px;
  bottom: 90px;
  border-radius: 50%;
  text-align: center;
  line-height: 50px;
  border:2px solid #222;

  transition: opacity 0.5s ease;
}
.go_down {
  position: fixed;
  width: 50px;
  height: 50px;
  background-color: #2a4f6f;
  text-decoration: none;
  color: #eee;
  z-index: 999;
  right: 30px;
  bottom: 30px;
  border-radius: 50%;
  text-align: center;
  line-height: 50px;
  border:2px solid #222;

  transition: opacity 0.5s ease;
}

@media (max-width: 768px) {
  .light_button {
    right: 10px;
    bottom: 190px;
  }
  .go_top {
    right: 10px;
    bottom: 130px;
  }
  .go_down {
    right: 10px;
    bottom: 70px;
  }
}
</style>