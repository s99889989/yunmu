<script setup lang="js">
import {useCarStore} from "~/stores/car.js";
import {initFlowbite} from "flowbite";
const carStore = useCarStore();

onMounted( async ()=>{

  await refresh();

})

//是否在讀取
const loading = ref(false);
const refresh = async () => {
  loading.value = true;
  await carStore.refresh().then(()=>{
    loading.value = false;
    initFlowbite();
  })

}

</script>

<template>
  <div class="dark:bg-black bg-white flex justify-center container-top w-full">
    <div class="w-full lg:w-3/4 mx-5">
      <p class="text-black dark:text-white text-5xl text-center pt-5">車輛列表</p>


      <!--   讀取圈圈   -->
      <div role="status" :class="{'hidden': !loading}" class="flex items-center justify-center h-1/2">
        <svg aria-hidden="true" class="w-28 h-28 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
        </svg>
        <span class="sr-only">Loading...</span>
      </div>
      <!--   內容   -->
      <div :class="{'hidden': loading}">
        <div class="grid gap-6 mb-6 grid-cols-3 items-center pt-5">
          <!--    車名搜尋      -->
          <div class="">
            <input v-model="carStore.data.search_car_name" type="text" id="first_name" class="text-xl bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="搜尋車名" required>
          </div>
          <!--    車類型搜尋      -->
          <select v-model="carStore.data.search_car_type" class="text-xl bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option>所有類型</option>
            <option>T</option>
            <option>A</option>
            <option>B</option>
            <option>C</option>
            <option>D</option>
            <option>M1</option>
            <option>M2</option>
            <option>S</option>
          </select>

          <button @click="refresh()" type="button" class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium text-center rounded-lg text-xl py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
            刷新</button>
          <p class="text-xl text-black dark:text-white" >車數量:{{carStore.searchList.length}}</p>
        </div>

        <div class="grid gap-6 grid-cols-2 md:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 pb-20">

          <div  v-for="(car) in carStore.searchList" class="p-1 md:p-2 flex flex-col bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 items-center">
            <img  class="mb-2" :src="car.image" alt="">
            <p class="text-2xl mb-2 md:mb-5 md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white text-center">{{car.name}}</p>
            <NuxtLink to="/car/info" @click="carStore.setEditValue(car.id)" type="button" class="text-xl md:text-3xl px-4 py-2 font-medium text-gray-900 bg-transparent border border-gray-900 rounded-lg hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700">
              查看
            </NuxtLink>
          </div>

        </div>

      </div>


    </div>
  </div>

</template>

<style scoped>

</style>