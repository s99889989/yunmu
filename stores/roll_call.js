import { defineStore } from 'pinia'
import { useApi } from '~/composables/useApi'

const serializeMembers = (memberList) =>
    memberList.map(m => `${m.id} _ ${m.state}`)

export const useRollCallStore = defineStore('RollCall', () => {
  const { get, post, put, del } = useApi()

  const data = reactive({
    search_member_name: '',
    search_member_status: '所有狀況',
    search_roll_call_month: '所有月份',
    member_map: new Map(),
    member_list: [],
    roll_call_map: new Map(),
    roll_call_list: [],
    edit_roll_call: {
      date: '', roll_call_man: '', member_list: [], team_ranking: 0,
    },
  })

  const rollCallList = computed(() => {
    let list = data.roll_call_list.slice().reverse()
    if (data.search_roll_call_month !== '所有月份')
      list = list.filter(r =>
          String(new Date(r.date).getMonth() + 1) === data.search_roll_call_month
      )
    return list
  })

  const refreshRollCallMap = () =>
      data.roll_call_list.forEach((r, i) => data.roll_call_map.set(r.date, i))

  const buildPayload = () => ({
    date: data.edit_roll_call.date,
    roll_call_man: data.edit_roll_call.roll_call_man,
    team_ranking: data.edit_roll_call.team_ranking,
    member_list: serializeMembers(data.edit_roll_call.member_list),
  })

  const add = () =>
      post('yunmu/roll_call/add', buildPayload()).then(() => {
        data.roll_call_list.unshift({ ...data.edit_roll_call })
        refreshRollCallMap()
      })

  const edit = () =>
      put('yunmu/roll_call/update', buildPayload()).then(() => {
        data.roll_call_list[data.roll_call_map.get(data.edit_roll_call.date)] = data.edit_roll_call
      })

  const remove = (date) =>
      del('yunmu/roll_call/remove/' + date).then(() => {
        data.roll_call_list.splice(data.roll_call_map.get(date), 1)
        refreshRollCallMap()
      })

  const setEditRollCall = (date) => {
    data.edit_roll_call = { ...data.roll_call_list[data.roll_call_map.get(date)] }
  }

  const refreshRollCall = async () => {
    data.member_list.forEach((m, i) => data.member_map.set(m.id, i))

    let raw = []
    try { raw = await get('yunmu/roll_call/get') }
    catch { raw = [] }

    data.roll_call_list.length = 0
    raw.forEach(value => {
      const roll_call = {
        date: value.date,
        roll_call_man: value.roll_call_man,
        team_ranking: value.team_ranking,
        member_list: value.member_list
            .map(entry => {
              const [id, state] = entry.split(' _ ')
              const member = data.member_list[data.member_map.get(id)]
              return member ? { id, game_name: member.game_name, state } : null
            })
            .filter(Boolean),
      }
      data.roll_call_list.push(roll_call)
    })

    refreshRollCallMap()
  }

  return { data, rollCallList, setEditRollCall, add, edit, remove, refreshRollCall }
})