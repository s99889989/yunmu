<script setup lang="js">
import {useAccountStore} from "~/stores/account.js";

const accountStore = useAccountStore();
//改變(管理或使用者)
const changeAdmin = () => {
  accountStore.data.admin = !accountStore.data.admin;
}

const edit = reactive({
  //編輯的成員
  member: {
    id: '',
    permissions: 'default',
    game_name: '',
    password: 'asd123456',
    game_id: '',
    game_level: '0',
    game_position: '',
    discord_id: '',
    car_list: [],
    pet_list: [],
  },
})

onMounted(()=>{
  //從瀏覽器讀取值(帳號)
  accountStore.loadDate().then(()=>{
    if(accountStore.data.member.id.length < 1){
      const router = useRouter()
      router.push('/account/login')
    }
  });

  edit.member = { ...accountStore.data.member};

})
const save = () => {
  accountStore.data.member = { ...edit.member};
  accountStore.saveDate();
  accountStore.update();
}
</script>

<template>

  <!--  <div class="dark:bg-black bg-white flex w-full flex-col items-center justify-center container-top">-->
  <!--    <h1 class="text-5xl dark:text-white font-bold text-sky-400">{{accountStore.data.member.game_id}}</h1>-->
  <!--    <p class="text-7xl md:text-9xl dark:text-white font-bold text-gray-600">目前登入中</p>-->
  <!--    <p @click="changeAdmin()" class="text-text-lg md:text-lg dark:text-white font-bold text-gray-600">切換到 -> {{modeName()}}</p>-->
  <!--  </div>-->
  <div class="dark:bg-black bg-white flex justify-center container-top w-full">
    <div class="w-full lg:w-3/4">
      <div class="text-center">
        <span class=" text-center text-4xl font-medium text-gray-900 dark:text-white">帳號訊息</span>
      </div>

      <div class="grid gap-6 grid-cols-1 md:grid-cols-1 items-center pt-5 px-5">

        <div class="flex items-center">
          <label class="w-24 md:w-20 text-3xl block font-medium text-gray-900 dark:text-white">權限</label>
          <select  v-model="edit.member.permissions" class="text-xl bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option value="default" selected>預設</option>
            <option value="user">使用者</option>
            <option value="admin">管理者</option>
          </select>
        </div>

        <div class="flex items-center">
          <label for="game_name" class="w-48 md:w-36 text-3xl block font-medium text-gray-900 dark:text-white">遊戲姓名</label>
          <input v-model="edit.member.game_name" type="text" id="game_name" class="text-xl bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
        </div>

        <div class="flex items-center">
          <label for="game_id" class="w-40 md:w-32 text-3xl block font-medium text-gray-900 dark:text-white">遊戲ID</label>
          <div class="ps-5 flex items-center text-xl bg-gray-50 border h-12 border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <p>{{accountStore.data.member.game_id}}</p>
          </div>
        </div>

        <div class="flex items-center">
          <label for="game_level" class="w-48 md:w-40 text-3xl block font-medium text-gray-900 dark:text-white">遊戲等級</label>
          <div class="ps-5 flex items-center text-xl bg-gray-50 border h-12 border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <p>{{accountStore.data.member.game_level}}</p>
          </div>
        </div>

        <div class="flex items-center">
          <label class="w-72 md:w-48 text-3xl block font-medium text-gray-900 dark:text-white">車隊的職位</label>
          <div class="ps-5 flex items-center text-xl bg-gray-50 border h-12 border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <p>{{accountStore.data.member.game_position}}</p>
          </div>

        </div>

        <div class="flex items-center">
          <label for="discord_id" class="w-72 md:w-48 text-3xl block font-medium text-gray-900 dark:text-white">Discord ID</label>
          <div class="ps-5 flex items-center text-xl bg-gray-50 border h-12 border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <p>{{accountStore.data.member.discord_id}}</p>
          </div>

        </div>

        <div class=" bg-gray-50 border border-gray-300 text-gray-900 text-2xl rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">

          <p class="p-5 text-3xl text-fuchsia-700 dark:text-fuchsia-400">擁有車 數量: {{accountStore.data.member.car_list.length}}</p>
          <div class="grid grid-cols-2 md:grid-cols-3 items-center ">
            <div  v-for="(text, index) in accountStore.data.member.car_list" class="flex mb-5">
              <p class="p-2 text-3xl text-gray-900 dark:text-white">{{text}}</p>
            </div>
          </div>
        </div>

        <div class=" bg-gray-50 border border-gray-300 text-gray-900 text-2xl rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">

          <p class="p-5 text-3xl text-fuchsia-700 dark:text-fuchsia-400">擁有寵物 數量: {{accountStore.data.member.pet_list.length}}</p>
          <div class="grid grid-cols-2 md:grid-cols-3 items-center ">
            <div  v-for="(text, index) in accountStore.data.member.pet_list" class="flex mb-5">
              <p class="p-2 text-3xl text-gray-900 dark:text-white">{{text}}</p>

            </div>
          </div>
        </div>

        <div class="grid gap-6 grid-cols-2 items-center">
          <NuxtLink @click="save()" to="/account/info" type="button" class="text-center text-2xl text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg px-5 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
            確定修改</NuxtLink>
          <NuxtLink to="/account/info" type="button" class="text-center text-2xl text-white bg-red-800 hover:bg-red-900 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-lg px-5 py-2.5 dark:bg-red-800 dark:hover:bg-red-700 dark:focus:ring-red-700 dark:border-red-700">
            取消修改</NuxtLink>
        </div>


      </div>

    </div>
  </div>
</template>

<style scoped>

</style>