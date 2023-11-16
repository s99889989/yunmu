<script setup lang="js">
import {useMemberStore} from "~/stores/member.js";
const memberStore = useMemberStore();

const add_input = reactive({
  car: '',
  pet: '',
})

//新增擁有的車
const addCar = () => {
  if(add_input.car.length < 1){
    return;
  }
  memberStore.data.editData.car_list.push(add_input.car);
  add_input.car = '';
}
//刪除擁有的車
const removeCar = (idx) => {
  memberStore.data.editData.car_list.splice(idx, 1);
}
//新增擁有的寵物
const addPet = () => {
  if(add_input.pet.length < 1){
    return;
  }
  memberStore.data.editData.pet_list.push(add_input.pet);
  add_input.pet = '';
}
//刪除擁有的寵物
const removePet = (idx) => {
  memberStore.data.editData.pet_list.splice(idx, 1);

}

onMounted( () => {

  memberStore.data.editData = {
    id: '',
    permissions: 'default',
    game_name: '',
    password: 'asd123456',
    game_id: '',
    game_level: '0',
    game_position: '隊員',
    discord_id: '',
    car_list: [],
    pet_list: [],
  }


})
</script>

<template>
  <div class="dark:bg-black bg-white flex justify-center container-top w-full">
    <div class="w-full lg:w-3/4">

      <div class="grid gap-6 grid-cols-1 items-center pt-5 px-5">

        <span class=" text-center text-4xl font-medium text-gray-900 dark:text-white">新增人員</span>

        <div class="flex items-center">
          <label class="w-24 md:w-20 text-3xl block font-medium text-gray-900 dark:text-white">權限</label>
          <select  v-model="memberStore.data.editData.permissions" class="text-xl bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option value="default" selected>預設</option>
            <option value="user">使用者</option>
            <option value="admin">管理者</option>
          </select>
        </div>

        <div class="flex items-center">
          <label for="game_name" class="w-48 md:w-36 text-3xl block font-medium text-gray-900 dark:text-white">遊戲姓名</label>
          <input v-model="memberStore.data.editData.game_name" type="text" id="game_name" class="text-xl bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
        </div>

        <div class="flex items-center">
          <label for="password" class="w-24 md:w-20 text-3xl block font-medium text-gray-900 dark:text-white">密碼</label>
          <input v-model="memberStore.data.editData.password" type="text" id="password" class="text-xl bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
        </div>

        <div class="flex items-center">
          <label for="game_id" class="w-40 md:w-32 text-3xl block font-medium text-gray-900 dark:text-white">遊戲ID</label>
          <input v-model="memberStore.data.editData.game_id" type="text" id="game_id" class="text-xl bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
        </div>

        <div class="flex items-center">
          <label for="game_level" class="w-48 md:w-40 text-3xl block font-medium text-gray-900 dark:text-white">遊戲等級</label>
          <input v-model="memberStore.data.editData.game_level" type="number" id="game_level" class="text-xl bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
        </div>

        <div class="flex items-center">
          <label class="w-72 md:w-48 text-3xl block font-medium text-gray-900 dark:text-white">車隊的職位</label>
          <select  v-model="memberStore.data.editData.game_position" class="text-xl bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option>隊員</option>
            <option>菁英</option>
            <option>副隊長</option>
            <option>隊長</option>
          </select>
        </div>

        <div class="flex items-center">
          <label for="discord_id" class="w-72 md:w-48 text-3xl block font-medium text-gray-900 dark:text-white">Discord ID</label>
          <input v-model="memberStore.data.editData.discord_id" type="text" id="discord_id" class="text-xl bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
        </div>

        <div class=" bg-gray-50 border border-gray-300 text-gray-900 text-2xl rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <div class="flex items-center p-5">
            <input v-model="add_input.car" type="text" id="car" class="me-5 text-xl bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="輸入車名稱" required>
            <button @click="addCar()" type="button" class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium text-center rounded-lg text-xl p-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
              增加</button>
          </div>
          <p class="p-5 text-3xl text-fuchsia-700 dark:text-fuchsia-400">擁有車 數量: {{memberStore.data.editData.car_list.length}}</p>
          <div class="grid grid-cols-2 md:grid-cols-3 items-center ">
            <div  v-for="(text, index) in memberStore.data.editData.car_list" class="flex mb-5">
              <p class="p-2 text-3xl text-gray-900 dark:text-white">{{text}}</p>
              <button @click="removeCar(index)" type="button" class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium text-center rounded-lg text-xl p-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                刪除</button>
            </div>
          </div>
        </div>

        <div class=" bg-gray-50 border border-gray-300 text-gray-900 text-2xl rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <div class="flex items-center p-5">
            <input v-model="add_input.pet" type="text" id="pet" class="me-5 text-xl bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="輸入寵物名稱" required>
            <button @click="addPet()" type="button" class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium text-center rounded-lg text-xl p-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
              增加</button>
          </div>
          <p class="p-5 text-3xl text-fuchsia-700 dark:text-fuchsia-400">擁有寵物 數量: {{memberStore.data.editData.pet_list.length}}</p>
          <div class="grid grid-cols-2 md:grid-cols-3 items-center ">
            <div  v-for="(text, index) in memberStore.data.editData.pet_list" class="flex mb-5">
              <p class="p-2 text-3xl text-gray-900 dark:text-white">{{text}}</p>
              <button @click="removePet(index)" type="button" class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium text-center rounded-lg text-xl p-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                刪除</button>
            </div>
          </div>
        </div>

        <div class="grid gap-6 grid-cols-2">
          <NuxtLink  @click="memberStore.add" to="/admin/member/list" type="button" class="text-center text-2xl text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg px-5 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
            新增</NuxtLink>
          <NuxtLink to="/admin/member/list" type="button" class="text-center text-2xl text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg px-5 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
            返回人員列表</NuxtLink>
        </div>


        <b/> <b/> <b/>
      </div>



    </div>
  </div>
</template>

<style scoped>

</style>