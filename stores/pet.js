import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const usePetStore = defineStore('Pet', () => {
  //https://madustrialtd.asuscomm.com:9100/
  //http://localhost:9100/
  const data = reactive({
    main_url: 'https://madustrialtd.asuscomm.com:9100/',
    search_pet_name: '',
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
    //紀錄UUID和car_list位置
    map_map: new Map(),
    //成員列表
    map_list: [
      {
        id: '',
        name: '',
        image: '/pet/pet/企鵝仔仔.jpg',
        label: [],
        dress: 1,
        attribute_image: [],
        attribute_info: [],
        skin_image: [],
      },
    ],
    //編輯的成員
    editData: {
      id: '',
      name: '',
      image: '/pet/pet/企鵝仔仔.jpg',
      label: [],
      dress: 1,
      attribute_image: [],
      attribute_info: [],
      skin_image: [],
    },
  })


  //搜尋後的結果
  const searchList = computed(() => {
    let displayMembers = data.map_list.slice();

    //名稱
    if (data.search_pet_name.length > 0) {
      displayMembers = displayMembers.filter((member) =>
          member.name.includes(data.search_pet_name)
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

    const url = data.main_url+'image/add/'+data.image_path.join('__');
    console.log('上傳')
    console.log(url)
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
            const url = data.main_url+data.image_path.join('/')+'/'+ imageName;
            data.editData.image = url;
          }


        })
        .catch(error => console.error('錯誤:', error));
  }
  //刷新圖片列表
  const refreshImage = () => {
    const pathList = data.image_path;
    const url = data.main_url+'image/get';
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
              url: data.main_url+image,
              select: false,
            })
          })
        })
  }
  //新增
  const add = async () => {
    const url = data.main_url+'yunmu/pet/add';
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

    const url = data.main_url+'yunmu/pet/update';

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
    data.image_path = ['yunmu', 'pet', data.editData.id]
    //刷新圖片列表
    refreshImage();
  }

  //移除
  const remove = (id) => {
    const url = data.main_url+'yunmu/pet/remove/' + id;
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
    const url = data.main_url+'yunmu/pet/get';
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
