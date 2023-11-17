<script setup lang="js">
import {usePetStore} from "~/stores/pet.js";
import FixedAddOptions from "~/components/FixedAddOptions.vue";
import {useAccountStore} from "~/stores/account.js";

const petStore = usePetStore();
const accountStore = useAccountStore();

onMounted(()=>{
  //檢查帳號狀態並做出動作
  accountStore.checkAdminLogin();
  petStore.data.editData = {
    id: '',
    name: '',
    image: '/pet/pet/企鵝仔仔.jpg',
    label: [],
    dress: 1,
    attribute_image: [],
    attribute_info: [],
    skin_image: [],
  }
})

const upDateHandler = (newValue) => {
  petStore.data.editData.label = newValue;
}

</script>

<template>
  <div class="dark:bg-black bg-white flex justify-center container-top w-full">
    <div class="w-full lg:w-3/4">

      <div class="grid gap-6 grid-cols-1 items-center pt-5 px-5">

        <span class=" text-center text-4xl font-medium text-gray-900 dark:text-white">新增寵物</span>

        <div class="flex items-center">
          <label for="car_name" class="w-48 md:w-36 text-3xl block font-medium text-gray-900 dark:text-white">名稱</label>

          <input v-model="petStore.data.editData.name" type="text" id="car_name" class="ps-5 flex items-center text-xl bg-gray-50 border h-12 border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
        </div>



        <FixedAddOptions :title="'標籤'" @update="upDateHandler" :label_list="['道具', '競速', '起步', '騰空', '集氣', '防禦', '極速', '攻擊', '實戰', '榮耀勳章']" :label="'競速'" :label_list_select="petStore.data.editData.label" />

<!--        <div class=" bg-gray-50 border border-gray-300 text-gray-900 text-2xl rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">-->
<!--          <div class="grid grid-cols-2 md:grid-cols-3 items-center ">-->
<!--            <div  v-for="(text) in petStore.data.editData.label" class="flex mb-5">-->
<!--              <p class="p-2 text-3xl text-gray-900 dark:text-white">{{text}}</p>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->

      </div>

      <div class="grid gap-6 grid-cols-2 mt-5">
        <NuxtLink @click="petStore.add" to="/admin/pet/list" type="button" class="text-center text-2xl text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg px-5 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
          新增</NuxtLink>
        <NuxtLink to="/admin/pet/list" type="button" class="text-center text-2xl text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg px-5 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
          返回寵物列表</NuxtLink>
      </div>

    </div>
  </div>
</template>

<style scoped>

</style>