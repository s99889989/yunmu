
import { defineStore } from 'pinia'

export const useMemberStore = defineStore('Member', () => {
  //https://madustrialtd.asuscomm.com:9100/
  //http://localhost:9100/
  const data = reactive({
    main_url: 'https://madustrialtd.asuscomm.com:9100/',
    search_member_name: '',
    search_member_game_position: '所有隊員',
    //紀錄UUID和member_list位置
    member_map: new Map(),
    //成員列表
    member_list: [
      {
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
    ],
    //編輯的成員
    editData: {
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


  //搜尋後的結果
  const searchList = computed(() => {
    let displayMembers = data.member_list.slice();

    //名稱
    if (data.search_member_name.length > 0) {
      displayMembers = displayMembers.filter((member) =>
          member.game_name.includes(data.search_member_name) || member.game_id.includes(data.search_member_name)
      );
    }
    if(data.search_member_game_position !== '所有隊員'){
      displayMembers = displayMembers.filter((member) =>
          member.game_position === data.search_member_game_position
      );
    }else {
      displayMembers = displayMembers.filter((member) =>
          member.game_position !== '前隊員'
      );
    }

    return displayMembers;
  })

  //新增
  const add = async () => {
    const url = data.main_url+'yunmu/member/add';
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
          data.member_list.unshift(data.editData);
          //更新人員Map對應列表
          refreshMap();

        })

  }

  //更新
  const edit = () => {

    const url = data.main_url+'yunmu/member/update';

    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data.editData)
    }).then(res => {
      const id = data.editData.id;
      const index = data.member_map.get(id);
      data.member_list[index] = data.editData;
    })

  }


  //設置編輯值
  const setEditValue = (id) => {
    //從id獲取index
    const index = data.member_map.get(id);
    data.editData =  data.member_list[index];
  }

  //移除
  const remove = (id) => {
    const url = data.main_url+'yunmu/member/remove/' + id;

    fetch(url, {
      method: 'DELETE'

    }).then(res => res.text())
        .then(data => {

        })
    //從id獲取index
    const index = data.member_map.get(id);
    //從列表刪除
    data.member_list.splice(index, 1);
    //更新人員Map對應列表
    refreshMap();

  }
  //更新人員和ID的對應表
  const refreshMap = () => {
    data.member_list.forEach((member, key, index)=>{
      data.member_map.set(member.id, key)
    })
  }

  //刷新列表
  const refresh = async () => {

    const url = data.main_url+'yunmu/member/get';
    try {
      const response = await fetch(url);
      data.member_list = await response.json();
    } catch (error) {
      data.member_list =  [];
    }finally {
      //更新人員Map對應列表
      refreshMap();
    }
  }


  return { data, refresh, add, setEditValue, edit, remove, searchList }
})
