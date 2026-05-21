import { defineStore } from 'pinia'
import { useApi } from '~/composables/useApi'

const DEFAULT_MEMBER = () => ({
  id: '', permissions: 'default', game_name: '', password: '',
  game_id: '', game_level: '0', game_position: '', discord_id: '',
  car_list: [], pet_list: [],
})

export const useAccountStore = defineStore('Account', () => {
  const { post, put } = useApi()

  const data = reactive({
    admin: false,
    login_error: false,
    member: DEFAULT_MEMBER(),
  })

  const login_state = reactive({
    username: '',
    keep_login: false,
  })

  const saveDate = () => {
    localStorage.setItem('login_state_data', JSON.stringify(login_state))
    localStorage.setItem(
        'account_speed',
        login_state.keep_login ? JSON.stringify(data.member) : null
    )
  }

  const loadDate = async () => {
    const stateJson = localStorage.getItem('login_state_data')
    if (stateJson) Object.assign(login_state, JSON.parse(stateJson))
    if (login_state.keep_login) {
      const memberJson = localStorage.getItem('account_speed')
      if (memberJson) Object.assign(data.member, JSON.parse(memberJson))
    }
  }

  const checkAdminLogin = async () => {
    await loadDate()
    const router = useRouter()
    if (!data.member.id) return router.push('/account/login')
    if (data.member.permissions !== 'admin') return router.push('/')
  }

  const login = async (id, password) => {
    const res = await post('yunmu/account/login', { id, password })
    data.member = await res.json()
    if (data.member.id?.length > 1) {
      data.login_error = false
      saveDate()
      useRouter().push('/account/info')
    } else {
      data.login_error = true
    }
  }

  const update = () =>
      put('yunmu/member/update', data.member)

  const logout = () => {
    data.admin = false
    data.login_error = false
    data.member = DEFAULT_MEMBER()
    localStorage.setItem('account_speed', null)
  }

  const modeName = () => data.admin ? '切換到->使用者' : '切換到->管理者'

  return { data, login_state, login, logout, modeName, checkAdminLogin, loadDate, saveDate, update }
})