<script setup lang="js">

import InsertPicture from "~/pages/admin/pet/InsertPicture.vue";
import {initFlowbite} from "flowbite";
import {usePetStore} from "~/stores/pet.js";
import {useAccountStore} from "~/stores/account.js";
const petStore = usePetStore();
const accountStore = useAccountStore();

onMounted(()=>{
  //檢查帳號狀態並做出動作
  accountStore.checkAdminLogin();
  if(petStore.data.editData.id.length < 1){
    const router = useRouter()
    router.push('/admin/pet/list');
  }
  initFlowbite();
})



</script>

<template>
  <div class="dark:bg-black bg-white flex justify-center container-top w-full">
    <div class="w-full lg:w-3/4">

      <div class="grid gap-6 grid-cols-1 items-center pt-5 px-5">

        <span class=" text-center text-4xl font-medium text-gray-900 dark:text-white">編輯寵物</span>

        <div class="flex items-center">
          <label for="car_name" class="w-48 md:w-36 text-3xl block font-medium text-gray-900 dark:text-white">名稱</label>

          <input v-model="petStore.data.editData.name" type="text" id="car_name" class="ps-5 flex items-center text-xl bg-gray-50 border h-12 border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
        </div>


        <div class="flex flex-wrap items-center">

          <label for="" class="text-3xl block font-medium text-gray-900 dark:text-white">顯示圖</label>
          <button id="insert_button"  data-modal-target="insert_picture" data-modal-toggle="insert_picture" type="button" class="w-1/2 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium text-center rounded-lg text-xl p-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
            選擇</button>
          <img class="w-full md:w-auto md:h-32" :src="petStore.data.editData.image" alt="">
          <InsertPicture/>
        </div>

        <div class="flex items-center">
          <label class="w-24 md:w-20 text-3xl block font-medium text-gray-900 dark:text-white">分類</label>
          <select v-model="petStore.data.editData.type" class="text-xl bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option>簡單</option>
            <option>普通</option>
            <option>困難</option>
          </select>
        </div>

        <div class="flex items-center">
          <label class="w-24 md:w-20 text-3xl block font-medium text-gray-900 dark:text-white">星級</label>
          <select v-model.number="petStore.data.editData.star" class="text-xl bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
            <option>7</option>
          </select>
        </div>

      </div>

      <div class="grid gap-6 grid-cols-2 mt-5">
        <NuxtLink @click="petStore.update()" to="/admin/pet/list" type="button" class="text-center text-2xl text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg px-5 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
          編輯</NuxtLink>
        <NuxtLink to="/admin/pet/list" type="button" class="text-center text-2xl text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg px-5 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
          返回寵物列表</NuxtLink>
      </div>

    </div>
  </div>
</template>

<style scoped>

</style>