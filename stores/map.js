import { defineStore } from 'pinia'
import { useCommonStore } from '~/stores/common'

export const useMapStore = defineStore('Map', () => {
  const commonStore = useCommonStore()

  const data = reactive({
    search_map_name: '',
    search_map_type: '所有類型',
    search_map_star: 0,
    image_list:[
      {
        url: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg',
        select: false,
      },
      {
        url: 'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg',
        select: false,
      },
    ],
    image_path:[],
    //紀錄id和地圖位置
    map_map: new Map(),
    //地圖列表
    map_list: [
      {
        id: '',
        name: '',
        image: '/map/中國城.jpg',
        type: '簡單',
        star: 1,
      },
    ],
    //編輯的地圖
    editData: {
      id: '',
      name: '',
      image: '/map/中國城.jpg',
      type: '簡單',
      star: 1,
      top_speed_car: '',
      top_speed_pet: '',
    },

  })

  //搜尋後的結果
  const searchList = computed(() => {
    let displayMembers = data.map_list.slice();

    //名稱
    if (data.search_map_name.length > 0) {
      displayMembers = displayMembers.filter((member) =>
          member.name.includes(data.search_map_name)
      );
    }

    //類型(簡單)
    if (data.search_map_type !== '所有類型') {
      displayMembers = displayMembers.filter(
          (element) => element.type === data.search_map_type
      );
    }

    //星級(1~7)
    if (data.search_map_star !== 0) {
      displayMembers = displayMembers.filter(
          (element) => element.star === data.search_map_star
      );
    }

    return displayMembers;
  })
  //增加圖片
  const addImage = () => {
    if(data.image_path.length < 0){
      return;
    }
    const inputFile = document.getElementById('dropzone-file');
    const formData = new FormData();
    formData.append('file', inputFile.files[0]);

    const url = commonStore.data.main_url+'image/add/'+data.image_path.join('__');

    fetch(url, {
      method: 'POST',
      body: formData,
    })
        .then(response => response.text())
        .then(imageName => {
          const insert_button = document.getElementById('insert_button');
          if(insert_button != null){
            insert_button.click();
          }
          if(imageName !== 'Empty' && imageName !== 'Error'){
            const url = commonStore.data.main_url+data.image_path.join('/')+'/'+ imageName;
            data.editData.image = url;
          }


        })
        .catch(error => console.error('錯誤:', error));
  }
  //刷新圖片列表
  const refreshImage = () => {
    const pathList = data.image_path;
    const url = commonStore.data.main_url+'image/get';
    fetch(url,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(pathList)
    })
        .then(res=>res.json())
        .then(dataRes=>{
          let image_list = [''];
          image_list = dataRes;
          data.image_list.length = 0;
          image_list.forEach(image=>{
            console.log(image)
            data.image_list.push({
              url: commonStore.data.main_url+image,
              select: false,
            })
          })
        })
  }
  //新增
  const add = async () => {
    const url = commonStore.data.main_url+'yunmu/map/add';
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data.editData)
    })
        .then(res => res.text())
        .then(uuidString => {
          data.editData.id = uuidString;
          data.map_list.unshift(data.editData);
          //更新Map對應列表
          refreshMap();

        })

  }

  //更新
  const update = () => {

    const url = commonStore.data.main_url+'yunmu/map/update';

    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data.editData)
    }).then(res => {
      const id = data.editData.id;
      const index = data.map_map.get(id);
      data.map_list[index] =  data.editData;
    })

  }


  //設置編輯值
  const setEditValue = (id) => {
    //從id獲取index
    const index = data.map_map.get(id);
    data.editData =  data.map_list[index];
    data.image_path = ['yunmu', 'map', data.editData.id]
    //刷新圖片列表
    refreshImage();
  }

  //移除
  const remove = (id) => {
    const url = commonStore.data.main_url+'yunmu/map/remove/' + id;
    console.log('刪除: '+id)
    fetch(url, {
      method: 'DELETE'

    }).then(res => res.text())
        .then(data => {

        })
    //從id獲取index
    const index = data.map_map.get(id);
    //從列表刪除
    data.map_list.splice(index, 1);
    //更新ID的對應表
    refreshMap();

  }
  //更新ID的對應表
  const refreshMap = () => {
    data.map_list.forEach((member, key, index)=>{
      data.map_map.set(member.id, key)
    })
  }

  //刷新列表
  const refresh = async () => {
    const url = commonStore.data.main_url+'yunmu/map/get';
    try {
      const response = await fetch(url);
      data.map_list = await response.json();
    } catch (error) {
      data.map_list =  [];
    }finally {
      //更新Map對應列表
      refreshMap();
    }
  }

  return { data, refresh, add, remove, update, setEditValue, searchList, addImage }
})