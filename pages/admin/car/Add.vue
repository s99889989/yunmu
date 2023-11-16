<script setup lang="js">
import {useCarStore} from "~/stores/car.js";


const carStore = useCarStore();

const add_input = reactive({
  label: '極速',
  label_list: ['極速', '榮耀勳章', '五噴', '六噴', '七噴', '騰空', '實戰', '飄移', '變形', '轉向', '集氣', '起步', '變色'],
})
const getLabelList = () => {
  let displayLabel = add_input.label_list.slice();
  displayLabel = displayLabel.filter(label=>{

    return !carStore.data.editData.label.includes(label);
  })
  if(displayLabel.length > 0){
    add_input.label = displayLabel[0];
  }

  return displayLabel;
}
//新增擁有的車
const addLabel = () => {
  if(add_input.label.length < 1){
    return;
  }
  carStore.data.editData.label.push(add_input.label);
}
//刪除擁有的車
const removeLabel = (idx) => {
  carStore.data.editData.label.splice(idx, 1);
}
onMounted(()=>{
  carStore.data.editData = {
    id: '',
    name: '',
    image: '/car/新手賽車.jpg',
    type: 'A',
    model: '車',
    characteristic: '',
    label: [],
    cww: 0,
    wcww: 0,
    small_jet_power: 0,
    small_jet_power_2: 0,
    nitrogen_power: 0,
    nitrogen_power_2: 0,
    stacked_spray_power: 0,
    stacked_spray_power_2: 0,
    zeo_180: 0,
    highest_speed_flat_running: 0,
    basic_motivation: 0,
    loss_steering_speed: 0,
    small_spray_top_speed: 0,
    nitrogen_top_speed: 0,
    small_squirt_duration: 0,
    nitrogen_duration: 0,
    one_week_switch: 0,
    one_week_drifting: 0,
  }
})
</script>

<template>
  <div class="dark:bg-black bg-white flex justify-center container-top w-full">
    <div class="w-full lg:w-3/4">

      <div class="grid gap-6 grid-cols-1 items-center pt-5 px-5">

        <span class=" text-center text-4xl font-medium text-gray-900 dark:text-white">新增車輛</span>

        <div class="flex items-center">
          <label for="car_name" class="w-48 md:w-36 text-3xl block font-medium text-gray-900 dark:text-white">名稱</label>

          <input v-model="carStore.data.editData.name" type="text" id="car_name" class="ps-5 flex items-center text-xl bg-gray-50 border h-12 border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
        </div>

        <div class="flex items-center">
          <label class="w-24 md:w-20 text-3xl block font-medium text-gray-900 dark:text-white">車種</label>
          <select  v-model="carStore.data.editData.type" class="text-xl bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option>A</option>
            <option>B</option>
            <option>C</option>
            <option>D</option>
            <option>T</option>
            <option>M1</option>
            <option>M2</option>
            <option>S</option>
          </select>
        </div>

        <div class="flex items-center">
          <label class="w-24 md:w-20 text-3xl block font-medium text-gray-900 dark:text-white">車型</label>
          <select v-model="carStore.data.editData.model" class="text-xl bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option>車</option>
            <option>摩托車</option>
            <option>飛劍</option>
            <option>特殊</option>
          </select>
        </div>

        <div class="flex items-center">
          <label for="password" class="w-24 md:w-20 text-3xl block font-medium text-gray-900 dark:text-white">特性</label>
          <input v-model="carStore.data.editData.characteristic" type="text" id="" class="ps-5 flex items-center text-xl bg-gray-50 border h-12 border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
        </div>

        <div class=" bg-gray-50 border border-gray-300 text-gray-900 text-2xl rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <div class="flex items-center p-5">
            <select  v-model="add_input.label" class="me-5 text-xl bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option v-for="(l) in getLabelList()" >{{l}}</option>
            </select>
            <button @click="addLabel()" type="button" class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium text-center rounded-lg text-xl p-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
              增加</button>
          </div>
          <div class="grid grid-cols-2 md:grid-cols-3 items-center ">
            <div  v-for="(text, index) in carStore.data.editData.label" class="flex mb-5">
              <p class="p-2 text-3xl text-gray-900 dark:text-white">{{text}}</p>
              <button @click="removeLabel(index)" type="button" class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium text-center rounded-lg text-xl p-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                刪除</button>
            </div>
          </div>
        </div>






      </div>

      <div class="grid gap-6 grid-cols-1 md:grid-cols-2  items-center py-5 px-5">

        <div class="flex items-center">
          <label for="game_name" class="attributes_label text-3xl block font-medium text-gray-900 dark:text-white">CWW速度</label>
          <input v-model="carStore.data.editData.cww" type="number" id="" class="ps-5 flex items-center text-xl bg-gray-50 border h-12 border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
        </div>

        <div class="flex items-center">
          <label for="game_name" class="attributes_label text-3xl block font-medium text-gray-900 dark:text-white">WCWW速度</label>
          <input v-model="carStore.data.editData.wcww" type="number" id="" class="ps-5 flex items-center text-xl bg-gray-50 border h-12 border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
        </div>

        <div class="flex items-center">
          <label for="game_name" class="attributes_label text-3xl block font-medium text-gray-900 dark:text-white">小噴動力</label>
          <input v-model="carStore.data.editData.small_jet_power" type="number" id="" class="ps-5 flex items-center text-xl bg-gray-50 border h-12 border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
        </div>

        <div class="flex items-center">
          <label for="game_name" class="attributes_label text-3xl block font-medium text-gray-900 dark:text-white">小噴動力(特性)</label>
          <input v-model="carStore.data.editData.small_jet_power_2" type="number" id="" class="ps-5 flex items-center text-xl bg-gray-50 border h-12 border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
        </div>

        <div class="flex items-center">
          <label for="game_name" class="attributes_label text-3xl block font-medium text-gray-900 dark:text-white">氮氣動力</label>
          <input v-model="carStore.data.editData.nitrogen_power" type="number" id="" class="ps-5 flex items-center text-xl bg-gray-50 border h-12 border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
        </div>

        <div class="flex items-center">
          <label for="game_name" class="attributes_label text-3xl block font-medium text-gray-900 dark:text-white">氮氣動力(特性)</label>
          <input v-model="carStore.data.editData.nitrogen_power_2" type="number" id="" class="ps-5 flex items-center text-xl bg-gray-50 border h-12 border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
        </div>

        <div class="flex items-center">
          <label for="game_name" class="attributes_label text-3xl block font-medium text-gray-900 dark:text-white">疊噴動力</label>
          <input v-model="carStore.data.editData.stacked_spray_power" type="number" id="" class="ps-5 flex items-center text-xl bg-gray-50 border h-12 border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
        </div>

        <div class="flex items-center">
          <label for="game_name" class="attributes_label text-3xl block font-medium text-gray-900 dark:text-white">疊噴動力(特性)</label>
          <input v-model="carStore.data.editData.stacked_spray_power_2" type="number" id="" class="ps-5 flex items-center text-xl bg-gray-50 border h-12 border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
        </div>

        <div class="flex items-center">
          <label for="game_name" class="attributes_label text-3xl block font-medium text-gray-900 dark:text-white">0-180</label>
          <input v-model="carStore.data.editData.zeo_180" type="number" id="" class="ps-5 flex items-center text-xl bg-gray-50 border h-12 border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
        </div>

        <div class="flex items-center">
          <label for="game_name" class="attributes_label text-3xl block font-medium text-gray-900 dark:text-white">平跑最高速</label>
          <input v-model="carStore.data.editData.highest_speed_flat_running" type="number" id="" class="ps-5 flex items-center text-xl bg-gray-50 border h-12 border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
        </div>

        <div class="flex items-center">
          <label for="game_name" class="attributes_label text-3xl block font-medium text-gray-900 dark:text-white">基礎動力</label>
          <input v-model="carStore.data.editData.basic_motivation" type="number" id="" class="ps-5 flex items-center text-xl bg-gray-50 border h-12 border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
        </div>

        <div class="flex items-center">
          <label for="game_name" class="attributes_label text-3xl block font-medium text-gray-900 dark:text-white">轉向失控速度</label>
          <input v-model="carStore.data.editData.loss_steering_speed" type="number" id="" class="ps-5 flex items-center text-xl bg-gray-50 border h-12 border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
        </div>

        <div class="flex items-center">
          <label for="game_name" class="attributes_label text-3xl block font-medium text-gray-900 dark:text-white">小噴最高速</label>
          <input v-model="carStore.data.editData.small_spray_top_speed" type="number" id="" class="ps-5 flex items-center text-xl bg-gray-50 border h-12 border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
        </div>

        <div class="flex items-center">
          <label for="game_name" class="attributes_label text-3xl block font-medium text-gray-900 dark:text-white">氮氣最高速</label>
          <input v-model="carStore.data.editData.nitrogen_top_speed" type="number" id="" class="ps-5 flex items-center text-xl bg-gray-50 border h-12 border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
        </div>

        <div class="flex items-center">
          <label for="game_name" class="attributes_label text-3xl block font-medium text-gray-900 dark:text-white">小噴時長</label>
          <input v-model="carStore.data.editData.small_squirt_duration" type="number" id="" class="ps-5 flex items-center text-xl bg-gray-50 border h-12 border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
        </div>

        <div class="flex items-center">
          <label for="game_name" class="attributes_label text-3xl block font-medium text-gray-900 dark:text-white">氮氣時長</label>
          <input v-model="carStore.data.editData.nitrogen_duration" type="number" id="" class="ps-5 flex items-center text-xl bg-gray-50 border h-12 border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
        </div>

        <div class="flex items-center">
          <label for="game_name" class="attributes_label text-3xl block font-medium text-gray-900 dark:text-white">轉向一周耗時</label>
          <input v-model="carStore.data.editData.one_week_switch" type="number" id="" class="ps-5 flex items-center text-xl bg-gray-50 border h-12 border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
        </div>

        <div class="flex items-center">
          <label for="game_name" class="attributes_label text-3xl block font-medium text-gray-900 dark:text-white">飄移一周耗時</label>
          <input v-model="carStore.data.editData.one_week_drifting" type="number" id="" class="ps-5 flex items-center text-xl bg-gray-50 border h-12 border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
        </div>

      </div>

      <div class="grid gap-6 grid-cols-2">
        <NuxtLink  @click="carStore.add" to="/admin/car/list" type="button" class="text-center text-2xl text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg px-5 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
          新增</NuxtLink>
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