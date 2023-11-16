
import { defineStore } from 'pinia'

export const useAccountStore = defineStore('Account', () => {
  //https://madustrialtd.asuscomm.com:9100/
  //http://localhost:9100/
  const data = reactive({
    admin: false,
    main_url: 'https://madustrialtd.asuscomm.com:9100/',
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
    //登入訊息
    login_data: {
      id: '',
      password: '',
    },
  })

  //刷新列表
  const login = async () => {

    const url = data.main_url+'yunmu/account/login';
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data.login_data)
    })
        .then(res => res.json())
        .then(dataRes => {
          data.member = dataRes
          if(data.member.permissions === 'admin'){
            data.admin = true;
            const router = useRouter()
            router.push('/admin/member/list');
          }
        })

  }

  return { data, login }
})
