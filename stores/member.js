import { defineStore } from 'pinia'
import { useApi } from '~/composables/useApi'

const DEFAULT_MEMBER = () => ({
  id: '', permissions: 'default', game_name: '', password: 'asd123456',
  game_id: '', game_level: '0', game_position: '', discord_id: '',
  car_list: [], pet_list: [],
})

export const useMemberStore = defineStore('Member', () => {
  const { get, post, put, del } = useApi()

  const data = reactive({
    search_member_name: '',
    search_member_game_position: '所有隊員',
    member_map: new Map(),
    member_list: [],
    editData: DEFAULT_MEMBER(),
  })

  const searchList = computed(() => {
    let list = data.member_list.slice()
    if (data.search_member_name)
      list = list.filter(m =>
          m.game_name.includes(data.search_member_name) ||
          m.game_id.includes(data.search_member_name)
      )
    if (data.search_member_game_position !== '所有隊員')
      list = list.filter(m => m.game_position === data.search_member_game_position)
    else
      list = list.filter(m => m.game_position !== '前隊員')
    return list
  })

  const refreshMap = () =>
      data.member_list.forEach((m, i) => data.member_map.set(m.id, i))

  const refresh = async () => {
    try { data.member_list = await get('yunmu/member/get') }
    catch { data.member_list = [] }
    finally { refreshMap() }
  }

  const add = () =>
      post('yunmu/member/add', data.editData).then(res => res.text()).then(id => {
        data.editData.id = id
        data.member_list.unshift(data.editData)
        refreshMap()
      })

  const edit = () =>
      put('yunmu/member/update', data.editData).then(() => {
        data.member_list[data.member_map.get(data.editData.id)] = data.editData
      })

  const remove = (id) =>
      del('yunmu/member/remove/' + id).then(() => {
        data.member_list.splice(data.member_map.get(id), 1)
        refreshMap()
      })

  const setEditValue = (id) => {
    data.editData = data.member_list[data.member_map.get(id)]
  }

  return { data, searchList, refresh, add, edit, remove, setEditValue }
})