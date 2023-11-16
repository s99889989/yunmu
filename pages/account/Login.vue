<script setup lang="js">
import {useAccountStore} from "~/stores/account.js";

const accountStore = useAccountStore();

</script>

<template>
  <div class="dark:bg-black bg-white flex justify-center container-top w-full">
    <div class="w-full lg:w-3/4">

      <div class="grid gap-6 grid-cols-1 items-center pt-5 px-5">

        <span class=" text-center text-4xl font-medium text-gray-900 dark:text-white">登入帳戶</span>

        <div class="flex items-center">
          <label for="account" class="w-48 md:w-36 text-3xl block font-medium text-gray-900 dark:text-white">遊戲名稱</label>

          <input v-model="accountStore.data.login_data.id" type="text" id="account" class="ps-5 flex items-center text-xl bg-gray-50 border h-12 border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
        </div>

        <div class="flex items-center">
          <label for="password" class="w-48 md:w-36 text-3xl block font-medium text-gray-900 dark:text-white">密碼</label>

          <input v-model="accountStore.data.login_data.password" type="text" id="password" class="ps-5 flex items-center text-xl bg-gray-50 border h-12 border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
        </div>

        <button @click="accountStore.login()" type="button" class="text-center text-2xl text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg px-5 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
          登入</button>

      </div>



    </div>
  </div>
</template>

<style scoped>

</style>