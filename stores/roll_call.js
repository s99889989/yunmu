import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useRollCallStore = defineStore('RollCall', () => {
  //https://madustrialtd.asuscomm.com:9100/
  //http://localhost:9100/
  const data = reactive({
    main_url: 'https://madustrialtd.asuscomm.com:9100/',
    search_member_name: '',
    search_member_have: '有來+沒來',
    search_roll_call_month: '所有月份',
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
    //紀錄UUID和roll_call_list位置
    roll_call_map: new Map(),
    //點名表列表
    roll_call_list: [
      {
        date: '',
        roll_call_man: '',
        member_list: [{
          id: '',
          name: '',
          have: false,
        }],
      },
    ],

    edit_roll_call:{
      date: '',
      roll_call_man: '',
      member_list: [{
        id: '',
        name: '',
        have: false,
      }]
    }
  })

  //過濾後的點名列表
  const rollCallList = computed(() => {
    let displayRollCalls = data.roll_call_list.slice();

    if (data.search_roll_call_month !== '所有月份') {
      displayRollCalls = displayRollCalls.filter((element)=>{

        const month = new Date(element.date).getMonth()+1+'';
        return month === data.search_roll_call_month;

      })
    }

    return displayRollCalls;
  })

  //新增
  const add = async () => {

    let roll_call_list= {
          date: data.edit_roll_call.date,
          roll_call_man: data.edit_roll_call.roll_call_man,
          member_list: ['123', '456'],
        };

    roll_call_list.member_list.length = 0;
    data.edit_roll_call.member_list.forEach((member) =>{
      if(member.have){
        roll_call_list.member_list.push(member.id);
      }
    })

    const url = data.main_url+'yunmu/roll_call/add';

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(roll_call_list)
    })
        .then(res => res.text())
        .then(async data => {
          //刷新內容
          await refreshRollCall();
        })


  }

  //更新
  const edit = async () => {


    let roll_call_list=
        {
          date: data.edit_roll_call.date,
          roll_call_man: data.edit_roll_call.roll_call_man,
          member_list: ['123', '456'],
        }
    ;

    roll_call_list.member_list.length = 0;
    data.edit_roll_call.member_list.forEach((member) =>{
      if(member.have){
        roll_call_list.member_list.push(member.id);
      }
    })

    const url = data.main_url+'yunmu/roll_call/update';

    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(roll_call_list)
    })
        .then(res => res.text())
        .then(async data => {
          //刷新內容
          await refreshRollCall();
        })

  }

  //移除
  const remove = async (date) => {
    const url = data.main_url+'yunmu/roll_call/remove/' + date;

    fetch(url, {
      method: 'DELETE'

    }).then(res => {
      //從id獲取index
      const index = data.roll_call_map.get(date);
      data.roll_call_list.splice(index, 1);
      //更新人員Map對應列表
      refreshRollCallMap();
    })



  }

  //設置目前要查看的RollCall
  const setEditRollCall = (date) => {
    const index = data.roll_call_map.get(date);
    data.edit_roll_call = { ...data.roll_call_list[index] };
  }

  //刷新列表
  const refreshRollCall = async () => {
    let roll_call_list= [
      {
        date: '',
        roll_call_man: '',
        member_list: [],
      },
    ];
    const url = data.main_url+'yunmu/roll_call/get';
    try {
      const response = await fetch(url);
      roll_call_list =  await response.json();
    } catch (error) {
      roll_call_list =  [];
    }finally {
      data.roll_call_list.length = 0;
      roll_call_list.forEach(value => {

        //RollCall設置
        const roll_call = {
          date: value.date,
          roll_call_man: value.roll_call_man,
          member_list: [{
            id: '',
            name: '',
            have: false,
          }]
        }

        //Member設置
        roll_call.member_list.length = 0;

        data.member_list.forEach(value1 => {

          const member = {
            id: value1.id,
            name: value1.game_name,
            have: false,
          }
          if(value.member_list.includes(value1.id)){
            member.have = true;
          }

          roll_call.member_list.push(member);
        })
        //RollCall放入
        data.roll_call_list.push(roll_call)

      })

      //更新人員Map對應列表
      refreshRollCallMap();

    }
  }

  //更新人員Map對應列表
  const refreshRollCallMap = () => {
    data.roll_call_list.forEach((roll_call, key)=>{
      data.roll_call_map.set(roll_call.date, key)
    })
  }

  return { data, rollCallList, setEditRollCall, add, edit, remove, refreshRollCall }
})
