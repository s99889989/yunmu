<script setup lang="js">
import {usePetStore} from "~/stores/pet.js";
import {useAccountStore} from "~/stores/account.js";


const petStore = usePetStore();
const accountStore = useAccountStore();


onMounted(()=>{
  //檢查帳號狀態並做出動作
  accountStore.checkAdminLogin();
  // 如果ID是空就返回列表
  if(petStore.data.editData.id.length < 1){
    const router = useRouter()
    router.push('/admin/pet/list');
  }
})



</script>

<template>
  <div class="dark:bg-black bg-white flex justify-center container-top w-full">
    <div class="w-full lg:w-3/4">

      <div class="grid gap-6 grid-cols-1 items-center pt-5 px-5">

        <span class=" text-center text-4xl font-medium text-gray-900 dark:text-white">查看寵物</span>

        <div class="flex items-center">
          <label for="car_name" class="w-48 md:w-36 text-3xl block font-medium text-gray-900 dark:text-white">名稱</label>

          <div class="ps-5 flex items-center text-xl bg-gray-50 border h-12 border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <p>{{ petStore.data.editData.name }}</p>
          </div>
        </div>


        <div class="flex flex-wrap items-center">

          <label for="" class="text-3xl block font-medium text-gray-900 dark:text-white">顯示圖</label>
          <img class="w-full md:w-auto md:h-32" :src="petStore.data.editData.image" alt="">
        </div>

        <div class="flex items-center">
          <label class="w-24 md:w-20 text-3xl block font-medium text-gray-900 dark:text-white">分類</label>
          <div class="ps-5 flex items-center text-xl bg-gray-50 border h-12 border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <p>{{ petStore.data.editData.type }}</p>
          </div>
        </div>

        <div class="flex items-center">
          <label class="w-24 md:w-20 text-3xl block font-medium text-gray-900 dark:text-white">星級</label>
          <div class="ps-5 flex items-center text-xl bg-gray-50 border h-12 border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <p>{{ petStore.data.editData.star }}</p>
          </div>
        </div>

      </div>

      <div class="grid gap-6 grid-cols-1 mt-5">
        <NuxtLink to="/admin/pet/list" type="button" class="text-center text-2xl text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg px-5 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
          返回寵物列表</NuxtLink>
      </div>

    </div>
  </div>
</template>

<style scoped>

</style>