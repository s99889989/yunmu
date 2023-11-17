<script setup lang="js">
import {useCarStore} from "~/stores/car.js";
import {initFlowbite} from "flowbite";
import {useAccountStore} from "~/stores/account.js";

const carStore = useCarStore();
const accountStore = useAccountStore();
onMounted(()=>{
  //檢查帳號狀態並做出動作
  accountStore.checkAdminLogin();
  // 如果ID是空就返回列表
  if(carStore.data.editData.id.length < 1){
    const router = useRouter()
    router.push('/admin/car/list');
  }
  initFlowbite();
})


</script>

<template>
  <div class="dark:bg-black bg-white flex justify-center container-top w-full">
    <div class="w-full lg:w-3/4">
      <div class="grid gap-6 grid-cols-1 items-center px-5">

      </div>
      <div class="flex flex-wrap">
        <span class="basis-full text-center text-4xl font-medium text-gray-900 dark:text-white">查看車輛</span>

        <img class="basis-full md:basis-1/2" :src="carStore.data.editData.image" alt="">
<!--        <div class="basis-full md:basis-1/2 h-30 bg-blue-300 grid gap-6 grid-cols-1 items-center pt-5 md:pt-0">-->
<!--          <div class="flex items-center h-20 w-full bg-blue-300">-->
<!--            <label for="car_name" class="text-3xl block font-medium text-gray-900 dark:text-white me-5">名稱</label>-->
<!--            <p class=" flex items-center text-xl bg-gray-50 border h-12 border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">-->
<!--              {{carStore.data.editData.name}}</p>-->
<!--          </div>-->
<!--        </div>-->
<!-- grid gap-6 grid-cols-1 items-center pt-5 md:pt-0-->
        <div class="basis-full md:basis-1/2 grid gap-6 grid-cols-1 items-center pt-5 md:pt-0">

          <div class="flex items-center h-20 w-full">
            <label for="car_name" class="text-3xl block font-medium text-gray-900 dark:text-white me-5">名稱</label>
            <p style="min-height: 50px" class="grow ps-5 flex items-center text-xl bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              {{carStore.data.editData.name}}</p>
          </div>

          <div class="flex items-center">
            <label for="car_name" class="text-3xl block font-medium text-gray-900 dark:text-white me-5">車種</label>
            <p class="grow ps-5 flex items-center text-xl bg-gray-50 border h-12 border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              {{carStore.data.editData.type}}</p>
          </div>

          <div class="flex items-center">
            <label for="car_name" class="text-3xl block font-medium text-gray-900 dark:text-white me-5">車型</label>
            <p class="grow ps-5 flex items-center text-xl bg-gray-50 border h-12 border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              {{carStore.data.editData.model}}</p>
          </div>

          <div class="flex items-center">
            <label for="password" class="w-48 md:w-36 text-3xl block font-medium text-gray-900 dark:text-white">改裝分支</label>
            <div style="min-height: 50px" class="ps-5 flex items-center text-xl bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <p>{{carStore.data.editData.modification_branch}}</p>
            </div>
          </div>

          <label for="password" class="text-3xl block font-medium text-gray-900 dark:text-white">特性</label>
          <div style="min-height: 50px" class="ps-2 flex items-center text-xl bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <p>{{carStore.data.editData.characteristic}}</p>
          </div>

          <p class="me-5 text-gray-900 dark:text-white text-3xl block font-medium " >定位</p>
          <div class=" bg-gray-50 border border-gray-300 text-gray-900 text-2xl rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">

            <div class="grid grid-cols-2 md:grid-cols-3 items-center ">
              <div  v-for="(text, index) in carStore.data.editData.label" class="flex">
                <p class="p-2 text-3xl text-gray-900 dark:text-white">{{text}}</p>
              </div>
            </div>
          </div>

        </div>

      </div>


      <div class="grid gap-6 grid-cols-1 md:grid-cols-2 items-center py-5 px-5">

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

      <div class="grid gap-6 grid-cols-1 px-5">
        <NuxtLink to="/admin/car/list" type="button" class="text-center text-2xl text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg px-5 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
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