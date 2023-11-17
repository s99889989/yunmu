<script setup lang="js">
import {useMemberStore} from "~/stores/member.js";
import {useAccountStore} from "~/stores/account.js";
const memberStore = useMemberStore();
const accountStore = useAccountStore();
onMounted(()=>{
  //檢查帳號狀態並做出動作
  accountStore.checkAdminLogin();
  // 如果ID是空就返回列表
  if(memberStore.data.editData.id.length < 1){
    const router = useRouter()
    router.push('/admin/member/list');
  }
})
</script>

<template>
  <div class="dark:bg-black bg-white flex justify-center container-top w-full">
    <div class="w-full lg:w-3/4">
      <div class="text-center">
        <span class=" text-center text-4xl font-medium text-gray-900 dark:text-white">查看人員</span>
      </div>

      <div class="grid gap-6 grid-cols-1 md:grid-cols-1 items-center pt-5 px-5">

        <div class="flex items-center">
          <label class="w-24 md:w-20 text-3xl block font-medium text-gray-900 dark:text-white">權限</label>
          <div class="ps-5 flex items-center text-xl bg-gray-50 border h-12 border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <p>{{memberStore.data.editData.permissions}}</p>
          </div>
        </div>

        <div class="flex items-center">
          <label for="game_name" class="w-48 md:w-36 text-3xl block font-medium text-gray-900 dark:text-white">遊戲姓名</label>
          <div class="ps-5 flex items-center text-xl bg-gray-50 border h-12 border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <p>{{memberStore.data.editData.game_name}}</p>
          </div>
        </div>

        <div class="flex items-center">
          <label for="password" class="w-24 md:w-20 text-3xl block font-medium text-gray-900 dark:text-white">密碼</label>
          <div class="ps-5 flex items-center text-xl bg-gray-50 border h-12 border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <p>{{memberStore.data.editData.password}}</p>
          </div>
        </div>

        <div class="flex items-center">
          <label for="game_id" class="w-40 md:w-32 text-3xl block font-medium text-gray-900 dark:text-white">遊戲ID</label>
          <div class="ps-5 flex items-center text-xl bg-gray-50 border h-12 border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <p>{{memberStore.data.editData.game_id}}</p>
          </div>
        </div>

        <div class="flex items-center">
          <label for="game_level" class="w-48 md:w-40 text-3xl block font-medium text-gray-900 dark:text-white">遊戲等級</label>
          <div class="ps-5 flex items-center text-xl bg-gray-50 border h-12 border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <p>{{memberStore.data.editData.game_level}}</p>
          </div>
        </div>

        <div class="flex items-center">
          <label class="w-72 md:w-48 text-3xl block font-medium text-gray-900 dark:text-white">車隊的職位</label>
          <div class="ps-5 flex items-center text-xl bg-gray-50 border h-12 border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <p>{{memberStore.data.editData.game_position}}</p>
          </div>

        </div>

        <div class="flex items-center">
          <label for="discord_id" class="w-72 md:w-48 text-3xl block font-medium text-gray-900 dark:text-white">Discord ID</label>
          <div class="ps-5 flex items-center text-xl bg-gray-50 border h-12 border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <p>{{memberStore.data.editData.discord_id}}</p>
          </div>

        </div>

        <div class=" bg-gray-50 border border-gray-300 text-gray-900 text-2xl rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">

          <p class="p-5 text-3xl text-fuchsia-700 dark:text-fuchsia-400">擁有車 數量: {{memberStore.data.editData.car_list.length}}</p>
          <div class="grid grid-cols-2 md:grid-cols-3 items-center ">
            <div  v-for="(text, index) in memberStore.data.editData.car_list" class="flex mb-5">
              <p class="p-2 text-3xl text-gray-900 dark:text-white">{{text}}</p>
            </div>
          </div>
        </div>

        <div class=" bg-gray-50 border border-gray-300 text-gray-900 text-2xl rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">

          <p class="p-5 text-3xl text-fuchsia-700 dark:text-fuchsia-400">擁有寵物 數量: {{memberStore.data.editData.pet_list.length}}</p>
          <div class="grid grid-cols-2 md:grid-cols-3 items-center ">
            <div  v-for="(text, index) in memberStore.data.editData.pet_list" class="flex mb-5">
              <p class="p-2 text-3xl text-gray-900 dark:text-white">{{text}}</p>

            </div>
          </div>
        </div>

        <NuxtLink to="/admin/member/list" type="button" class="text-center text-2xl text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg px-5 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
          返回人員列表</NuxtLink>

      </div>

    </div>
  </div>
</template>

<style scoped>

</style>