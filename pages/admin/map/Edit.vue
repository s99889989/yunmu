<script setup lang="js">
import {useMapStore} from "~/stores/map.js";
import InsertPicture from "~/pages/admin/map/InsertPicture.vue";
import {initFlowbite} from "flowbite";
import {useAccountStore} from "~/stores/account.js";

import {useCarStore} from "~/stores/car.js";

const carStore = useCarStore();
const mapStore = useMapStore();
const accountStore = useAccountStore();



onMounted(()=>{
  //檢查帳號狀態並做出動作
  accountStore.checkAdminLogin();
  if(mapStore.data.editData.id.length < 1){
    const router = useRouter()
    router.push('/admin/map/list');
  }
  initFlowbite();
})

const getCarNameList = () => {
  let displayLabel = [];
  let displayMembers = carStore.data.car_list.slice();

  //名稱
  if (carStore.data.search_car_name.length > 0) {
    displayMembers = displayMembers.filter((member) =>
        member.name.includes(carStore.data.search_car_name)
    );
  }

  //類型(A, T)
  if (carStore.data.search_car_level !== '所有等級') {
    displayMembers = displayMembers.filter(
        (element) => element.level === carStore.data.search_car_level
    );
  }

  //類型(起步車, 騰空車, 轉向車, 平地車, 道具車, 其他車)
  if (carStore.data.search_car_type === '其他車') {
    displayMembers = displayMembers.filter(
        (element) =>  element.type.length === 0
    );
  }else if (carStore.data.search_car_type !== '所有類型') {
    displayMembers = displayMembers.filter(
        (element) =>  element.type.includes(carStore.data.search_car_type)
    );
  }

  displayMembers.forEach((element) => {
    displayLabel.push(element.name);
  })

  return displayLabel;
}

</script>

<template>
  <div class="dark:bg-black bg-white flex justify-center container-top w-full">
    <div class="w-full lg:w-3/4">

      <div class="grid gap-6 grid-cols-1 items-center pt-5 px-5">

        <span class=" text-center text-4xl font-medium text-gray-900 dark:text-white">編輯地圖</span>

        <div class="flex items-center">
          <label for="car_name" class="w-48 md:w-36 text-3xl block font-medium text-gray-900 dark:text-white">名稱</label>

          <input v-model="mapStore.data.editData.name" type="text" id="car_name" class="ps-5 flex items-center text-xl bg-gray-50 border h-12 border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
        </div>


        <div class="flex flex-wrap items-center">

          <label for="" class="text-3xl block font-medium text-gray-900 dark:text-white">顯示圖</label>
          <button id="insert_button"  data-modal-target="insert_picture" data-modal-toggle="insert_picture" type="button" class="w-1/2 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium text-center rounded-lg text-xl p-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
            選擇</button>
          <img class="w-full md:w-auto md:h-32" :src="mapStore.data.editData.image" alt="">
          <InsertPicture/>
        </div>

        <div class="flex items-center">
          <label class="w-24 md:w-20 text-3xl block font-medium text-gray-900 dark:text-white">分類</label>
          <select v-model="mapStore.data.editData.type" class="text-xl bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option>簡單</option>
            <option>普通</option>
            <option>困難</option>
          </select>
        </div>

        <div class="flex items-center">
          <label class="w-24 md:w-20 text-3xl block font-medium text-gray-900 dark:text-white">星級</label>
          <select v-model.number="mapStore.data.editData.star" class="text-xl bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
            <option>7</option>
          </select>
        </div>

        <div class="flex flex-col">
          <label class="text-3xl block font-medium text-gray-900 dark:text-white">極速之巔</label>

          <div class="grid gap-6 mb-6 grid-cols-3 items-center pt-5">
            <div class="">
              <input v-model="carStore.data.search_car_name" type="text" id="first_name" class="text-xl bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="搜尋車名" required>
            </div>
            <!--    車等級搜尋      -->
            <select v-model="carStore.data.search_car_level" class="text-xl bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option>所有等級</option>
              <option>T</option>
              <option>A</option>
              <option>B</option>
              <option>C</option>
              <option>D</option>
              <option>M1</option>
              <option>M2</option>
              <option>S</option>
            </select>

            <!--    車類型搜尋      -->
            <select v-model="carStore.data.search_car_type" class="text-xl bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option>所有類型</option>
              <option>起步車</option>
              <option>騰空車</option>
              <option>轉向車</option>
              <option>平地車</option>
              <option>道具車</option>
              <option>加速帶車</option>
              <option>其他車</option>
            </select>

            <div class="flex items-center">
              <label class="text-3xl block font-medium text-gray-900 dark:text-white">1.</label>
              <select v-model.number="mapStore.data.editData.top_speed1" class="text-xl bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option v-for="(l) in getCarNameList()" >{{l}}</option>
              </select>
            </div>

          </div>

        </div>
      </div>

      <div class="grid gap-6 grid-cols-2 mt-5">
        <NuxtLink @click="mapStore.update()" to="/admin/map/list" type="button" class="text-center text-2xl text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg px-5 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
          編輯</NuxtLink>
        <NuxtLink to="/admin/map/list" type="button" class="text-center text-2xl text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg px-5 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
          返回地圖列表</NuxtLink>
      </div>

    </div>
  </div>
</template>

<style scoped>

</style>