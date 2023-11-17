<script setup lang="js">
import {useRollCallStore} from "~/stores/roll_call";
import {useAccountStore} from "~/stores/account.js";

const rollCallStore = useRollCallStore();
const accountStore = useAccountStore();
const roll_call = ref(
    {
      date: '',
      roll_call_man: '',
      member_list: [{
        id: '',
        name: '',
        have: false,
      }]
    }
)
onMounted( async () => {
  //檢查帳號狀態並做出動作
  accountStore.checkAdminLogin();
  roll_call.value.member_list.length = 0;


  rollCallStore.data.member_list.forEach(value1 => {

    const member = {
      id: value1.id,
      name: value1.game_name,
      have: false,
    }

    roll_call.value.member_list.push(member);
  })

  rollCallStore.data.edit_roll_call = roll_call.value;

})

//總人數
const allAmount = () => {
  let amount;

  amount = roll_call.value.member_list.filter((member) =>
      member.have
  ).length;


  return amount;
}


const memberList = computed(() => {

  let displayMembers = roll_call.value.member_list.slice(); // 创建一个副本以确保响应性
  //名稱
  if (rollCallStore.data.search_member_name.length > 0) {
    displayMembers = displayMembers.filter((element) =>
        element.name.includes(rollCallStore.data.search_member_name)
    );
  }

  //是否有來
  if (rollCallStore.data.search_member_have !== '有來+沒來') {
    displayMembers = displayMembers.filter((element) =>
        rollCallStore.data.search_member_have === '有來' ? element.have : !element.have
    );
  }

  return displayMembers;
});
</script>

<template>
  <div class="dark:bg-black bg-white flex justify-center container-top w-full">
    <div class="w-full lg:w-3/4">

      <div class="grid gap-6 grid-cols-1 items-center pt-5 px-5">

        <div class="flex items-center">
          <label for="first_name" class="w-20 text-3xl block font-medium text-gray-900 dark:text-white">日期</label>
          <input v-model="roll_call.date" type="date" id="birthday" name="birthday" class="bg-gray-50 border border-gray-300 text-gray-900 text-2xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        </div>
        <div class="flex items-center">
          <label for="first_name" class="w-40 text-3xl block font-medium text-gray-900 dark:text-white">點名人員</label>
          <input v-model="roll_call.roll_call_man" type="text" id="first_name" class="text-xl bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required>
          <!--          <p class="text-black dark:text-white text-xl">{{rollCallStore.data.edit_roll_call.roll_call_man}}</p>-->
        </div>

        <p class="text-black dark:text-white text-lg">點到人數: {{allAmount()}}</p>

        <div class="grid gap-6 grid-cols-3 items-center">
          <input v-model="rollCallStore.data.search_member_name" type="text" id="first_name" class="text-xl bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="搜尋姓名" required>

          <select v-model="rollCallStore.data.search_member_have" class="text-xl bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option selected>有來+沒來</option>
            <option>有來</option>
            <option>沒來</option>
          </select>
        </div>

        <div class="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">

          <div  v-for="(member) in memberList" class="p-5 justify-around flex sm:flex-row md:flex-col bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 items-center md:items-start">
            <div class="flex items-center">
              <input v-model="member.have" id="default-checkbox" type="checkbox" value="" class="w-10 h-10 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
            </div>
            <p class="text-2xl p-2 md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white text-center">{{member.name}}</p>

          </div>

        </div>



        <div class="grid gap-6 grid-cols-2">
          <NuxtLink @click="rollCallStore.add()" to="/admin/roll_call/list" type="button" class="text-center text-2xl text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg px-5 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
            新增</NuxtLink>
          <NuxtLink to="/admin/roll_call/list" type="button" class="text-center text-2xl text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg px-5 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
            取消</NuxtLink>
        </div>
      </div>

      <br/> <br/> <br/>

    </div>
  </div>
</template>

<style scoped>

</style>