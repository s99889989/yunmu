<script setup lang="js">
const props = defineProps({
  attribute_image: Array,
  attribute_info: Array,
})

const emit =  defineEmits(['update'])

const data = reactive({
  label_list_select: props.label_list_select.slice(),
  label: props.label,
  label_list: props.label_list
})

const getLabelList = () => {
  let displayLabel = data.label_list.slice();
  displayLabel = displayLabel.filter(label=>{
    return !data.label_list_select.includes(label);
  })
  return displayLabel;
}
watch(data.label_list_select, (newValue)=>{
  emit('update', newValue)
})
//新增擁有的車
const addLabel = () => {
  if(data.label.length < 1){
    return;
  }

  data.label_list_select.push(data.label);
//重新選擇預設選項
  reSelect();
}

//刪除擁有的車
const removeLabel = (idx) => {
  data.label_list_select.splice(idx, 1);
//重新選擇預設選項
  reSelect();
}
//重新選擇預設選項
const reSelect = () => {

  let displayLabel = data.label_list.slice();
  displayLabel = displayLabel.filter(label=>{
    return !data.label_list_select.includes(label);
  })

  if(displayLabel.length > 0){
    data.label = displayLabel[0];
  }

}
</script>

<template>


  <div class=" bg-gray-50 border border-gray-300 text-gray-900 text-2xl rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
    <div class="flex items-center p-5">
      <select v-model="data.label" class="me-5 text-xl bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        <option v-for="(l) in getLabelList()" >{{l}}</option>
      </select>
      <button @click="addLabel()" type="button" class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium text-center rounded-lg text-xl p-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
        增加</button>
    </div>
    <div class="grid grid-cols-2 md:grid-cols-3 items-center ">
      <div  v-for="(text, index) in data.label_list_select" class="flex mb-5">
        <p class="p-2 text-3xl text-gray-900 dark:text-white">{{text}}</p>
        <button @click="removeLabel(index)" type="button" class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium text-center rounded-lg text-xl p-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
          刪除</button>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>