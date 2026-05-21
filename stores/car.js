import { defineStore } from 'pinia'
import { useCommonStore } from '~/stores/common'

export const useCarStore = defineStore('Car', () => {
  const commonStore = useCommonStore()

  const data = reactive({
    search_car_name: '',
    search_car_level: '所有等級',
    search_car_type: '所有類型',
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
    car_map: new Map(),
    //車列表
    car_list: [
      {
        id: '',
        name: '',
        image: '',
        type: [],
        level: 'A',
        model: '車',
        modification_branch: '',
        characteristic: '',
        label: [],
        cww: 0,
        wcww: 0,
        small_jet_power: 0,
        small_jet_power_2: 0,
        nitrogen_power: 0,
        nitrogen_power_2: 0,
        stacked_spray_power: 0,
        stacked_spray_power_2: 0,
        zeo_180: 0,
        highest_speed_flat_running: 0,
        basic_motivation: 0,
        loss_steering_speed: 0,
        small_spray_top_speed: 0,
        nitrogen_top_speed: 0,
        small_squirt_duration: 0,
        nitrogen_duration: 0,
        one_week_switch: 0,
        one_week_drifting: 0,
      },
    ],
    //編輯的成員
    editData: {
      id: '',
      name: '',
      image: '',
      type: [],
      level: 'A',
      model: '車',
      modification_branch: '',
      characteristic: '',
      label: [],
      cww: 0,
      wcww: 0,
      small_jet_power: 0,
      small_jet_power_2: 0,
      nitrogen_power: 0,
      nitrogen_power_2: 0,
      stacked_spray_power: 0,
      stacked_spray_power_2: 0,
      zeo_180: 0,
      highest_speed_flat_running: 0,
      basic_motivation: 0,
      loss_steering_speed: 0,
      small_spray_top_speed: 0,
      nitrogen_top_speed: 0,
      small_squirt_duration: 0,
      nitrogen_duration: 0,
      one_week_switch: 0,
      one_week_drifting: 0,
    },
  })
  //搜尋後的結果
  const searchList = computed(() => {
    let displayMembers = data.car_list.slice();

    //名稱
    if (data.search_car_name.length > 0) {
      displayMembers = displayMembers.filter((member) =>
          member.name.includes(data.search_car_name)
      );
    }

    //類型(A, T)
    if (data.search_car_level !== '所有等級') {
      displayMembers = displayMembers.filter(
          (element) => element.level === data.search_car_level
      );
    }

    //類型(起步車, 騰空車, 轉向車, 平地車, 道具車, 其他車)
    if (data.search_car_type === '其他車') {
      displayMembers = displayMembers.filter(
          (element) =>  element.type.length === 0
      );
    }else if (data.search_car_type !== '所有類型') {
      displayMembers = displayMembers.filter(
          (element) =>  element.type.includes(data.search_car_type)
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
    const url = commonStore.data.main_url+'yunmu/car/add';
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
          data.car_list.unshift(data.editData);
          //更新Map對應列表
          refreshMap();

        })

  }

  //更新
  const update = () => {

    const url = commonStore.data.main_url+'yunmu/car/update';
    console.log('更新')
    console.log(data.editData.characteristic)
    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data.editData)
    }).then(res => {
      const id = data.editData.id;
      const index = data.car_map.get(id);
      data.car_list[index] =  data.editData;
    })

  }


  //設置編輯值
  const setEditValue = (id) => {
    //從id獲取index
    const index = data.car_map.get(id);
    data.editData =  data.car_list[index];
    data.image_path = ['yunmu', 'car', data.editData.id]
    //刷新圖片列表
    refreshImage();
  }

  //移除
  const remove = (id) => {
    const url = commonStore.data.main_url+'yunmu/car/remove/' + id;
    console.log('刪除: '+id)
    fetch(url, {
      method: 'DELETE'

    }).then(res => res.text())
        .then(data => {

        })
    //從id獲取index
    const index = data.car_map.get(id);
    //從列表刪除
    data.car_list.splice(index, 1);
    //更新ID的對應表
    refreshMap();

  }
  //更新ID的對應表
  const refreshMap = () => {
    data.car_list.forEach((member, key, index)=>{
      data.car_map.set(member.id, key)
    })
  }

  //刷新列表
  const refresh = async () => {
    const url = commonStore.data.main_url+'yunmu/car/get';
    try {
      const response = await fetch(url);
      data.car_list = await response.json();
    } catch (error) {
      data.car_list =  [];
    }finally {
      //更新Map對應列表
      refreshMap();
    }
  }

  return { data, refresh, add, remove, update, setEditValue, searchList, addImage }
})