import { defineStore } from 'pinia'
import { useApi } from '~/composables/useApi'
import { useImageManager } from '~/composables/useImageManager'

export const useMapStore = defineStore('Map', () => {
  const { get, post, put, del } = useApi()

  const data = reactive({
    search_map_name: '',
    search_map_type: '所有類型',
    search_map_star: 0,
    image_list: [],
    image_path: [],
    map_map: new Map(),
    map_list: [],
    editData: {
      id: '', name: '', image: '/map/中國城.jpg',
      type: '簡單', star: 1, top_speed_car: '', top_speed_pet: '',
    },
  })

  const { addImage } = useImageManager(data)

  const searchList = computed(() => {
    let list = data.map_list.slice()
    if (data.search_map_name)
      list = list.filter(m => m.name.includes(data.search_map_name))
    if (data.search_map_type !== '所有類型')
      list = list.filter(m => m.type === data.search_map_type)
    if (data.search_map_star !== 0)
      list = list.filter(m => m.star === data.search_map_star)
    return list
  })

  const refreshMap = () =>
      data.map_list.forEach((m, i) => data.map_map.set(m.id, i))

  const refresh = async () => {
    try { data.map_list = await get('yunmu/map/get') }
    catch { data.map_list = [] }
    finally { refreshMap() }
  }

  const add = () =>
      post('yunmu/map/add', data.editData).then(res => res.text()).then(id => {
        data.editData.id = id
        data.map_list.unshift(data.editData)
        refreshMap()
      })

  const update = () =>
      put('yunmu/map/update', data.editData).then(() => {
        data.map_list[data.map_map.get(data.editData.id)] = data.editData
      })

  const remove = (id) =>
      del('yunmu/map/remove/' + id).then(() => {
        data.map_list.splice(data.map_map.get(id), 1)
        refreshMap()
      })

  const setEditValue = (id) => {
    data.editData = data.map_list[data.map_map.get(id)]
    data.image_path = ['yunmu', 'map', data.editData.id]
  }

  return { data, searchList, refresh, add, update, remove, setEditValue, addImage }
})