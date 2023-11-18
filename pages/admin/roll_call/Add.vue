<script setup lang="js">
import {useRollCallStore} from "~/stores/roll_call";
import {useAccountStore} from "~/stores/account.js";

const rollCallStore = useRollCallStore();
const accountStore = useAccountStore();

onMounted( async () => {
  //檢查帳號狀態並做出動作
  await accountStore.checkAdminLogin().then(()=>{
    rollCallStore.data.edit_roll_call = {
      date: '',
      roll_call_man: '',
      member_list: [{
        id: '',
        game_name: '',
        state: '',
      }]
    }
    rollCallStore.data.edit_roll_call.member_list.length = 0;
    rollCallStore.data.member_list.forEach(menubar=>{
      console.log(menubar.id+" : " +menubar.game_name)
      const addMember = {
        id: menubar.id,
        game_name: menubar.game_name,
        state: '未到',
      }
      rollCallStore.data.edit_roll_call.member_list.push(addMember);
    })
  });

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

//查詢用
const searchMemberList = computed(() => {

  let displayMembers = rollCallStore.data.edit_roll_call.member_list.slice(); // 创建一个副本以确保响应性
  //名稱
  if (rollCallStore.data.search_member_name.length > 0) {
    displayMembers = displayMembers.filter((element) =>
        element.game_name.includes(rollCallStore.data.search_member_name)
    );
  }

  //是否有來
  if (rollCallStore.data.search_member_status !== '所有狀況') {
    displayMembers = displayMembers.filter((element) =>
        rollCallStore.data.search_member_status ===  element.state
    );
  }

  return displayMembers;
});
</script>

<template>
  <div class="dark:bg-black bg-white flex justify-center container-top w-full">
    <div class="w-full lg:w-3/4">

      <div class="grid gap-6 grid-cols-1 items-center pt-5 px-5">

        <span class=" text-center text-4xl font-medium text-gray-900 dark:text-white">新增點名表</span>

        <div class="flex items-center">
          <label for="first_name" class="w-20 text-3xl block font-medium text-gray-900 dark:text-white">日期</label>
          <input v-model="rollCallStore.data.edit_roll_call.date" type="date" id="date" name="date" class="bg-gray-50 border border-gray-300 text-gray-900 text-2xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        </div>
        <div class="flex items-center">
          <label for="name" class="w-40 text-3xl block font-medium text-gray-900 dark:text-white">點名人員</label>
          <input v-model="rollCallStore.data.edit_roll_call.roll_call_man" type="text" id="name" class="text-xl bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required>
          <!--          <p class="text-black dark:text-white text-xl">{{rollCallStore.data.edit_roll_call.roll_call_man}}</p>-->
        </div>

        <div class="flex">
          <p class="text-black dark:text-white text-lg me-5">人數: </p>
          <p class="text-black dark:text-white text-lg me-5">所有: {{memberList('所有狀況').length}}</p>
          <p class="text-black dark:text-white text-lg me-5">有到: {{memberList('有到').length}}</p>
          <p class="text-black dark:text-white text-lg me-5">請假: {{memberList('請假').length}}</p>
          <p class="text-black dark:text-white text-lg">未到: {{memberList('未到').length}}</p>
        </div>



        <div class="grid gap-6 grid-cols-3 items-center">
          <input v-model="rollCallStore.data.search_member_name" type="text" id="first_name" class="text-xl bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="搜尋姓名" required>

          <select v-model="rollCallStore.data.search_member_status" class="text-xl bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option>所有狀況</option>
            <option>有到</option>
            <option>請假</option>
            <option>未到</option>
          </select>
        </div>

        <div class="grid gap-6 grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4">

          <div  v-for="(member) in searchMemberList" class="py-5 justify-around flex-col flex bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 items-center">
            <p :class="{'text-white': member.state === '未到', 'text-yellow-300': member.state === '有到', 'text-orange-400': member.state === '請假'}" class="text-xl md:text-4xl mb-5 font-bold tracking-tight text-center" >{{member.game_name}}</p>
            <select v-model="member.state"
                    class="text-gray-900 dark:text-white  text-xl md:text-2xl font-medium item-select md:w-40 bg-gray-50 border border-gray-300  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option>未到</option>
              <option>有到</option>
              <option>請假</option>
            </select>


          </div>

        </div>



        <div class="grid gap-6 grid-cols-2">
          <NuxtLink @click="rollCallStore.add()" to="/admin/roll_call/list" type="button" class="text-center text-2xl text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg px-5 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
            新增</NuxtLink>
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