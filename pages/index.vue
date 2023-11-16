<script setup lang="js">
import {useAccountStore} from "~/stores/account.js";

const accountStore = useAccountStore();

//改變(管理或使用者)
const changeAdmin = () => {
  accountStore.data.admin = !accountStore.data.admin;
}

const modeName = () => {
  if(accountStore.data.admin){
    return "使用者";
  }else {
    return "管理者";
  }
}

</script>

<template>
  <div class="dark:bg-black bg-white flex w-full flex-col items-center justify-center container-top">
    <h1 class="text-5xl dark:text-white font-bold text-sky-400">2023</h1>
    <p class="text-7xl md:text-9xl dark:text-white font-bold text-gray-600">Yunmu</p>
    <p @click="changeAdmin()" class="text-text-lg md:text-lg dark:text-white font-bold text-gray-600">切換到 -> {{modeName()}}</p>
  </div>
</template>

<style scoped>

</style>