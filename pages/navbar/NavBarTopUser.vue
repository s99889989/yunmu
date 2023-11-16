<script setup lang="js">
import {useDarkModeStore} from "~/stores/function/dark_mode.js";
import {useAccountStore} from "~/stores/account.js";

const accountStore = useAccountStore();
const dark_mode = useDarkModeStore();
</script>

<template>
  <nav :class="{'hidden': accountStore.data.admin}" class="navbar-top fixed w-full border-b border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
    <div class="flex flex-row p-4">
      <NuxtLink to="/" class="basis-1/4 flex items-center">
        <img src="/logo.png" class="h-8 mr-3" alt="Flowbite Logo" />
        <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">極速領域-Yunmu車隊</span>
      </NuxtLink>

      <div class="w-full basis-1/2 flex justify-center" id="navbar-solid-bg">
        <ul class="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">

          <li>
            <NuxtLink to="/car/list" class="text-2xl block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
              賽車</NuxtLink>
          </li>

          <li>
            <NuxtLink to="/pet/list" class="text-2xl block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
              寵物</NuxtLink>
          </li>

          <li>
            <NuxtLink to="/map/list" class="text-2xl block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
              賽道</NuxtLink>
          </li>

          <li>
            <NuxtLink to="/account/login" class="text-2xl block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
              帳戶</NuxtLink>
          </li>

          <li>
            <button @click="dark_mode.change_dark_mode" to="/admin/setting/main" class="text-2xl block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
              {{dark_mode.data.display_name}}</button>
          </li>

        </ul>
      </div>



    </div>
  </nav>
</template>

<style scoped>

</style>