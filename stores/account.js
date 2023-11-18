
import { defineStore } from 'pinia'

export const useAccountStore = defineStore('Account', () => {
  //https://madustrialtd.asuscomm.com:9100/
  //http://localhost:9100/
  const data = reactive({
    main_url: 'https://madustrialtd.asuscomm.com:9100/',
    admin: false,
    login_error: false,
    password: '',
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
  //需要紀錄的值
  const login_state = reactive({
    username: '',
    keep_login: false,
  })
  //把值儲存到瀏覽器
  const saveDate = () => {

    localStorage.setItem('login_state_data', JSON.stringify(login_state))

    if(login_state.keep_login){
      localStorage.setItem('account_speed', JSON.stringify(data.member))
    }else {
      localStorage.setItem('account_speed', null);
    }
  }


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


        })

  }

  //更新
  const update = () => {

    const url = data.main_url+'yunmu/member/update';

    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data.member)
    }).then(res => {

    })

  }

  //從瀏覽器讀取值
  const loadDate = async () => {
    const login_state_data = localStorage.getItem("login_state_data");
    if(login_state_data){
      Object.assign(login_state, JSON.parse(login_state_data));
    }
    if(login_state.keep_login){
      const account_speed= localStorage.getItem('account_speed')
      if(account_speed != null){
        Object.assign(data.member, JSON.parse(account_speed));
      }
    }

  }

  //檢查帳號狀態並做出動作
  const checkAdminLogin = async () => {
    //從瀏覽器讀取值
    await loadDate();

    const router = useRouter()
    if(data.member.id.length > 0){
      if(data.member.permissions !== 'admin'){
        await router.push('/')
      }
    }else {
      await router.push('/account/login')
    }

  }

  //登入
  const login = async (id, password) => {
    const login_data = {
      id: id,
      password: password,
    }
    const url = data.main_url+'yunmu/account/login';
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(login_data)
    })
        .then(res => res.json())
        .then(dataRes => {

          data.member = dataRes

          const router = useRouter()
          if(data.member.id.length > 1){
            data.login_error = false;
            router.push('/account/info');

            saveDate();
          }else {
            data.login_error = true;
          }

        })

  }



  //登出
  const logout = () => {
    data.admin = false;
    data.login_error = false;
    data.member = {
      id: '',
      permissions: 'default',
      game_name: '',
      password: '',
      game_id: '',
      game_level: '0',
      game_position: '',
      discord_id: '',
      car_list: [],
      pet_list: [],
    }
    localStorage.setItem('account_speed', null);
  }

  //模式名稱
  const modeName = () => {
    if(data.admin){
      return "切換到->使用者";
    }else {
      return "切換到->管理者";
    }
  }

  onMounted(()=>{

  })

  return { data, login_state, login, logout, modeName, checkAdminLogin, loadDate, saveDate, update }
})
