<script setup lang="js">
import {useRollCallStore} from "~/stores/roll_call";
import {useAccountStore} from "~/stores/account.js";

const rollCallStore = useRollCallStore();
const accountStore = useAccountStore();

onMounted( async () => {
  //檢查帳號狀態並做出動作
  await accountStore.checkAdminLogin();

})
//顯示計算用
const memberList = (state) => {
  let rollCallList = rollCallStore.data.edit_roll_call.member_list.slice();

  if(state !== '所有狀況'){
    rollCallList = rollCallList.filter((member) =>
        member.state === state
    );
  }
  return rollCallList;
}


</script>

<template>
  <div class="dark:bg-black bg-white flex justify-center container-top w-full">
    <div class="w-full lg:w-3/4">

      <div class="grid gap-6 grid-cols-1 items-center pt-5 px-5">

        <span class=" text-center text-4xl font-medium text-gray-900 dark:text-white">編輯點名表</span>

        <div class="flex items-center">
          <label for="first_name" class="w-20 text-3xl block font-medium text-gray-900 dark:text-white">日期</label>
<!--          <input v-model="rollCallStore.data.edit_roll_call.date" type="date" id="date" name="date" class="bg-gray-50 border border-gray-300 text-gray-900 text-2xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">-->
          <p style="min-height: 50px" class="grow ps-5 flex items-center text-xl bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            {{rollCallStore.data.edit_roll_call.date}}</p>
        </div>
        <div class="flex items-center">
          <label for="name" class="w-40 text-3xl block font-medium text-gray-900 dark:text-white">點名人員</label>
          <p style="min-height: 50px" class="grow ps-5 flex items-center text-xl bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            {{rollCallStore.data.edit_roll_call.roll_call_man}}</p>
        </div>





        <div class="flex">
          <p class="text-black dark:text-white text-lg me-5">人數: </p>
          <p class="text-black dark:text-white text-lg me-5">所有: {{memberList('所有狀況').length}}</p>
          <p class="text-black dark:text-white text-lg me-5">有到: {{memberList('有到').length}}</p>
          <p class="text-black dark:text-white text-lg me-5">請假: {{memberList('請假').length}}</p>
          <p class="text-black dark:text-white text-lg">未到: {{memberList('未到').length}}</p>
        </div>

        <div class="mx-5 mt-5 bg-gray-50 border border-gray-300 text-gray-900 text-2xl rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <p class="p-5 text-3xl text-fuchsia-700 dark:text-fuchsia-400">有到 人數: {{memberList('有到').length}}</p>
          <div class="grid grid-cols-2 md:grid-cols-3 items-center ">

            <div  v-for="(member) in memberList('有到')" class="flex">
              <p class="p-2 text-3xl text-gray-900 dark:text-white">{{member.game_name}}</p>
            </div>
          </div>
        </div>

        <div class="mx-5 mt-5 bg-gray-50 border border-gray-300 text-gray-900 text-2xl rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <p class="p-5 text-3xl text-fuchsia-700 dark:text-fuchsia-400">請假 人數: {{memberList('請假').length}}</p>
          <div class="grid grid-cols-2 md:grid-cols-3 items-center ">

            <div  v-for="(member) in memberList('請假')" class="flex">
              <p class="p-2 text-3xl text-gray-900 dark:text-white">{{member.game_name}}</p>
            </div>
          </div>
        </div>

        <div class="mx-5 mt-5 bg-gray-50 border border-gray-300 text-gray-900 text-2xl rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <p class="p-5 text-3xl text-fuchsia-700 dark:text-fuchsia-400">未到 人數: {{memberList('未到').length}}</p>
          <div class="grid grid-cols-2 md:grid-cols-3 items-center ">

            <div  v-for="(member) in memberList('未到')" class="flex">
              <p class="p-2 text-3xl text-gray-900 dark:text-white">{{member.game_name}}</p>
            </div>
          </div>
        </div>

        <div class="grid gap-6 grid-cols-2">
          <NuxtLink @click="rollCallStore.add()" to="/admin/roll_call/list" type="button" class="text-center text-2xl text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg px-5 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
            編輯</NuxtLink>
          <NuxtLink to="/admin/roll_call/list" type="button" class="text-center text-2xl text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg px-5 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
            返回點名列表</NuxtLink>
        </div>
      </div>

      <br/> <br/> <br/>

    </div>
  </div>
</template>

<style scoped>
@media(max-width: 640px){
  .item-select{
    width: 100px
  }
}

</style>