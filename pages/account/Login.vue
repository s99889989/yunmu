<script setup lang="ts">
import {useAccountStore} from "~/stores/account.js";

const accountStore = useAccountStore();

const password = reactive({
  display: 'password',
  name: '顯示',
  password: '',
})



const change_password_display = () => {
  if(password.display === 'password'){
    password.display = 'text';
    password.name = '隱藏';
  }else {
    password.display = 'password';
    password.name = '顯示';
  }
}

onMounted(()=>{

  //從瀏覽器讀取值(帳號)
  accountStore.loadDate().then(()=>{
    if(accountStore.data.member.id.length > 1){
      const router = useRouter()
      router.push('/account/info')
    }
  });

  const login_div = document.getElementById('login');
  if(login_div !== null){
    login_div.addEventListener('keydown', function (event) {
      if (event.key === 'Enter') {
        login();
      }
    })
    login_div.addEventListener('submit', function(event) {
      // 阻止表单默认提交行为
      event.preventDefault();

      // 其他你想要在提交前执行的逻辑
    });
  }



})

//是否在讀取
const loading = ref(false);
const login = () => {
  if(password.password.length < 1 || accountStore.login_state.username.length < 1){
    return;
  }

  loading.value = true;
  accountStore.login(accountStore.login_state.username, password.password).then(()=>{
    setTimeout(()=>{
      loading.value = false;
    }, 1000)

  })
}

</script>

<template>
  <div class="dark:bg-black bg-white flex justify-center container-top w-full">
    <div class="w-full lg:w-3/4">

      <div class="grid gap-6 grid-cols-1 items-center pt-5 px-5">

        <span class=" text-center text-4xl font-medium text-gray-900 dark:text-white">登入</span>

        <!--   讀取圈圈   -->
        <div role="status" :class="{'hidden': !loading}" class="flex items-center justify-center h-1/2">
          <svg aria-hidden="true" class="w-28 h-28 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
          </svg>
          <span class="sr-only">Loading...</span>
        </div>


        <!--   內容     -->
        <form id="login" :class="{'hidden': loading}"  class="grid gap-6 grid-cols-1 items-center pt-5 px-5">

          <!--    登入錯誤    -->
          <div :class="{'hidden': !accountStore.data.login_error}" class="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800" role="alert">
            <svg class="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
            </svg>
            <span class="sr-only">Info</span>
            <div>
              <span class="font-medium">遊戲名稱或密碼錯誤!</span> 請重新輸入。
            </div>
          </div>

          <div class="flex items-center">
            <label for="username" class="w-48 md:w-36 text-3xl block font-medium text-gray-900 dark:text-white">遊戲名稱</label>

            <input @change="accountStore.saveDate()" name="username" v-model="accountStore.login_state.username" type="text" id="username" class="ps-5 flex items-center text-xl bg-gray-50 border h-12 border-gray-300 text-gray-900 rounded-lg focus:ring-gray-500 focus:border-gray-500 w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500" placeholder="請輸入遊戲名稱" required>
          </div>

          <div class="flex items-center">
            <label for="password" class="w-48 md:w-36 text-3xl block font-medium text-gray-900 dark:text-white">密碼</label>
            <div class="relative w-full">
              <input  name="password" :type="password.display" v-model="password.password" id="search-dropdown" class="block p-2.5 w-full z-20 text-xl text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 rounded-s-lg focus:ring-gray-500 focus:border-gray-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-gray-500" placeholder="請輸入密碼" required>
              <div @click="change_password_display()" type="submit" class="cursor-pointer text-center justify-center flex absolute top-0 end-0 px-5 py-2.5 text-xl font-medium h-full text-white bg-gray-700 rounded-e-lg border border-gray-500 hover:bg-gray-800 dark:bg-gray-600 dark:hover:bg-gray-700">
                {{password.name}}
              </div>
            </div>
          </div>
          <div class="flex items-center">
            <input  @change="accountStore.saveDate()" v-model="accountStore.login_state.keep_login" id="default-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
            <label for="default-checkbox" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">保持登入狀態</label>
          </div>
          <button @click="login()" type="submit" class="text-center text-2xl text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg px-5 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
            登入</button>


        </form>



      </div>



    </div>
  </div>
</template>

<style scoped>

</style>