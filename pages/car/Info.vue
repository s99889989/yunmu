<script setup lang="js">
import {useCarStore} from "~/stores/car.js";
import InsertPicture from "~/pages/admin/car/InsertPicture.vue";
import {initFlowbite} from "flowbite";

const carStore = useCarStore();



onMounted(()=>{
  // 如果ID是空就返回列表
  if(carStore.data.editData.id.length < 1){
    const router = useRouter()
    router.push('/car/list');
  }
  initFlowbite();
})



</script>

<template>
  <div class="dark:bg-black bg-white flex justify-center container-top w-full">
    <div class="w-full lg:w-3/4">

      <div class="grid gap-6 grid-cols-1 items-center pt-5 px-5">

        <span class=" text-center text-4xl font-medium text-gray-900 dark:text-white">查看車輛</span>

        <div class="flex items-center">
          <label for="car_name" class="w-32 md:w-36 text-3xl block font-medium text-gray-900 dark:text-white">名稱</label>
          <div class="ps-5 flex items-center text-xl bg-gray-50 border h-12 border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <p>{{carStore.data.editData.name}}</p>
          </div>
        </div>


        <div class="flex flex-wrap items-center">
          <img class="w-full md:w-auto md:h-32" :src="carStore.data.editData.image" alt="">
        </div>

        <div class="flex items-center">
          <label class="w-24 md:w-20 text-3xl block font-medium text-gray-900 dark:text-white">車種</label>
          <div class="ps-5 flex items-center text-xl bg-gray-50 border h-12 border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <p>{{carStore.data.editData.type}}</p>
          </div>
        </div>

        <div class="flex items-center">
          <label class="w-24 md:w-20 text-3xl block font-medium text-gray-900 dark:text-white">車型</label>
          <div class="ps-5 flex items-center text-xl bg-gray-50 border h-12 border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <p>{{carStore.data.editData.model}}</p>
          </div>
        </div>

        <div class="flex items-center">
          <label for="password" class="w-48 md:w-36 text-3xl block font-medium text-gray-900 dark:text-white">改裝分支</label>
          <div class="ps-5 flex items-center text-xl bg-gray-50 border h-12 border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <p>{{carStore.data.editData.modification_branch}}</p>
          </div>
        </div>

        <div class="flex items-center">
          <label for="password" class="w-24 md:w-20 text-3xl block font-medium text-gray-900 dark:text-white">特性</label>
          <div class="ps-5 flex items-center text-xl bg-gray-50 border h-12 border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <p>{{carStore.data.editData.characteristic}}</p>
          </div>
        </div>

        <div class=" bg-gray-50 border border-gray-300 text-gray-900 text-2xl rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <div class="grid grid-cols-2 md:grid-cols-3 items-center ">
            <div  v-for="(text, index) in carStore.data.editData.label" class="flex mb-5">
              <p class="p-2 text-3xl text-gray-900 dark:text-white">{{text}}</p>
            </div>
          </div>
        </div>



      </div>

      <div class="grid gap-6 grid-cols-1 md:grid-cols-2  items-center py-5 px-5">

        <div class="flex items-center">
          <label for="game_name" class="attributes_label text-3xl block font-medium text-gray-900 dark:text-white">CWW速度</label>
          <div class="ps-5 flex items-center text-xl bg-gray-50 border h-12 border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <p>{{carStore.data.editData.cww}}</p>
          </div>
        </div>

        <div class="flex items-center">
          <label for="game_name" class="attributes_label text-3xl block font-medium text-gray-900 dark:text-white">WCWW速度</label>
          <div class="ps-5 flex items-center text-xl bg-gray-50 border h-12 border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <p>{{carStore.data.editData.wcww}}</p>
          </div>
        </div>

        <div class="flex items-center">
          <label for="game_name" class="attributes_label text-3xl block font-medium text-gray-900 dark:text-white">小噴動力</label>
          <div class="ps-5 flex items-center text-xl bg-gray-50 border h-12 border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <p>{{carStore.data.editData.small_jet_power}}</p>
          </div>
        </div>

        <div class="flex items-center">
          <label for="game_name" class="attributes_label text-3xl block font-medium text-gray-900 dark:text-white">小噴動力(特性)</label>
          <div class="ps-5 flex items-center text-xl bg-gray-50 border h-12 border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <p>{{carStore.data.editData.small_jet_power_2}}</p>
          </div>
        </div>

        <div class="flex items-center">
          <label for="game_name" class="attributes_label text-3xl block font-medium text-gray-900 dark:text-white">氮氣動力</label>
          <div class="ps-5 flex items-center text-xl bg-gray-50 border h-12 border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <p>{{carStore.data.editData.nitrogen_power}}</p>
          </div>
        </div>

        <div class="flex items-center">
          <label for="game_name" class="attributes_label text-3xl block font-medium text-gray-900 dark:text-white">氮氣動力(特性)</label>
          <div class="ps-5 flex items-center text-xl bg-gray-50 border h-12 border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <p>{{carStore.data.editData.nitrogen_power_2}}</p>
          </div>
        </div>

        <div class="flex items-center">
          <label for="game_name" class="attributes_label text-3xl block font-medium text-gray-900 dark:text-white">疊噴動力</label>
          <div class="ps-5 flex items-center text-xl bg-gray-50 border h-12 border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <p>{{carStore.data.editData.stacked_spray_power}}</p>
          </div>
        </div>

        <div class="flex items-center">
          <label for="game_name" class="attributes_label text-3xl block font-medium text-gray-900 dark:text-white">疊噴動力(特性)</label>
          <div class="ps-5 flex items-center text-xl bg-gray-50 border h-12 border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <p>{{carStore.data.editData.stacked_spray_power_2}}</p>
          </div>
        </div>

        <div class="flex items-center">
          <label for="game_name" class="attributes_label text-3xl block font-medium text-gray-900 dark:text-white">0-180</label>
          <div class="ps-5 flex items-center text-xl bg-gray-50 border h-12 border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <p>{{carStore.data.editData.zeo_180}}</p>
          </div>
        </div>

        <div class="flex items-center">
          <label for="game_name" class="attributes_label text-3xl block font-medium text-gray-900 dark:text-white">平跑最高速</label>
          <div class="ps-5 flex items-center text-xl bg-gray-50 border h-12 border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <p>{{carStore.data.editData.highest_speed_flat_running}}</p>
          </div>
        </div>

        <div class="flex items-center">
          <label for="game_name" class="attributes_label text-3xl block font-medium text-gray-900 dark:text-white">基礎動力</label>
          <div class="ps-5 flex items-center text-xl bg-gray-50 border h-12 border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <p>{{carStore.data.editData.basic_motivation}}</p>
          </div>
        </div>

        <div class="flex items-center">
          <label for="game_name" class="attributes_label text-3xl block font-medium text-gray-900 dark:text-white">轉向失控速度</label>
          <div class="ps-5 flex items-center text-xl bg-gray-50 border h-12 border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <p>{{carStore.data.editData.loss_steering_speed}}</p>
          </div>
        </div>

        <div class="flex items-center">
          <label for="game_name" class="attributes_label text-3xl block font-medium text-gray-900 dark:text-white">小噴最高速</label>
          <div class="ps-5 flex items-center text-xl bg-gray-50 border h-12 border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <p>{{carStore.data.editData.small_spray_top_speed}}</p>
          </div>
        </div>

        <div class="flex items-center">
          <label for="game_name" class="attributes_label text-3xl block font-medium text-gray-900 dark:text-white">氮氣最高速</label>
          <div class="ps-5 flex items-center text-xl bg-gray-50 border h-12 border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <p>{{carStore.data.editData.nitrogen_top_speed}}</p>
          </div>
        </div>

        <div class="flex items-center">
          <label for="game_name" class="attributes_label text-3xl block font-medium text-gray-900 dark:text-white">小噴時長</label>
          <div class="ps-5 flex items-center text-xl bg-gray-50 border h-12 border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <p>{{carStore.data.editData.small_squirt_duration}}</p>
          </div>
        </div>

        <div class="flex items-center">
          <label for="game_name" class="attributes_label text-3xl block font-medium text-gray-900 dark:text-white">氮氣時長</label>
          <div class="ps-5 flex items-center text-xl bg-gray-50 border h-12 border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <p>{{carStore.data.editData.nitrogen_duration}}</p>
          </div>
        </div>

        <div class="flex items-center">
          <label for="game_name" class="attributes_label text-3xl block font-medium text-gray-900 dark:text-white">轉向一周耗時</label>
          <div class="ps-5 flex items-center text-xl bg-gray-50 border h-12 border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <p>{{carStore.data.editData.one_week_switch}}</p>
          </div>
        </div>

        <div class="flex items-center">
          <label for="game_name" class="attributes_label text-3xl block font-medium text-gray-900 dark:text-white">飄移一周耗時</label>
          <div class="ps-5 flex items-center text-xl bg-gray-50 border h-12 border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <p>{{carStore.data.editData.one_week_drifting}}</p>
          </div>
        </div>

      </div>

      <div class="grid gap-6 grid-cols-1">
        <NuxtLink to="/car/list" type="button" class="text-center text-2xl text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg px-5 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
          返回車輛列表</NuxtLink>
      </div>

    </div>
  </div>
</template>

<style scoped>
.attributes_label{
  width: 20rem;
}
@media (max-width: 1536px) {
  .attributes_label{
    width: 35rem;
  }
}
@media (max-width: 1024px) {
  .attributes_label{
    width: 34rem;
  }
}
@media (max-width: 768px) {
  .attributes_label{
    width: 480px;
  }
}
</style>