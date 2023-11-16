<script setup lang="js">
import {useRollCallStore} from "~/stores/roll_call";
import html2canvas from 'html2canvas';
const rollCallStore = useRollCallStore();

const roll_call = ref(
    {
      date: '',
      roll_call_man: '',
      member_list: [{
        id: '',
        name: '',
        stake: '',
        ward: '',
        organizations: '',
        area: '',
        have: false,
      }]
    }
)
//總人數
const allAmount = () => {
  let amount;

  amount = roll_call.value.member_list.filter((member) =>
      member.have
  ).length;

  return amount;
}


const downLoad = async () => {

  const targetDiv = document.getElementById('myDiv');


  const canvas = await html2canvas(targetDiv);


  const imageData = canvas.toDataURL('image/png');


  const link = document.createElement('a');
  link.href = imageData;
  link.download = 'captured_image.png';


  link.click();
}

onMounted(()=>{
  roll_call.value = rollCallStore.data.edit_roll_call;
  // 如果日期是空就返回列表
  if(roll_call.value.date.length < 1){
    const router = useRouter()
    router.push('/admin/roll_call/list');
  }
})
</script>

<template>
  <div id="myDiv" class="dark:bg-black bg-white flex justify-center container-top w-full">

    <div class="w-full lg:w-3/4">

      <div class="grid gap-6 grid-cols-1 items-center pt-5 px-5">

        <div class="flex items-center">
          <label for="first_name" class="w-20 text-3xl block font-medium text-gray-900 dark:text-white">日期</label>
          <p class="bg-gray-50 border border-gray-300 text-gray-900 text-2xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            {{roll_call.date}}</p>
        </div>
        <div class="flex items-center">
          <label for="first_name" class="w-40 text-3xl block font-medium text-gray-900 dark:text-white">點名人員</label>
          <p class="bg-gray-50 border border-gray-300 text-gray-900 text-2xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            {{roll_call.roll_call_man}}</p>
        </div>

        <div class="flex items-center">
          <label for="first_name" class="w-32 text-3xl block font-medium text-gray-900 dark:text-white">總人數</label>

          <p class="bg-gray-50 border border-gray-300 text-gray-900 text-2xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            {{allAmount()}}</p>
        </div>



        <NuxtLink to="/admin/roll_call/list" type="button" class="text-center text-2xl text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg px-5 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
          返回點名列表</NuxtLink>

      </div>


    </div>

  </div>
</template>

<style scoped>

</style>