import { defineStore } from 'pinia'
import { useApi } from '~/composables/useApi'
import { useImageManager } from '~/composables/useImageManager'

const DEFAULT_CAR = () => ({
  id: '', name: '', image: '', type: [], level: 'A', model: '車',
  modification_branch: '', characteristic: '', label: [],
  cww: 0, wcww: 0,
  small_jet_power: 0, small_jet_power_2: 0,
  nitrogen_power: 0, nitrogen_power_2: 0,
  stacked_spray_power: 0, stacked_spray_power_2: 0,
  zeo_180: 0, highest_speed_flat_running: 0, basic_motivation: 0,
  loss_steering_speed: 0, small_spray_top_speed: 0, nitrogen_top_speed: 0,
  small_squirt_duration: 0, nitrogen_duration: 0,
  one_week_switch: 0, one_week_drifting: 0,
})

export const useCarStore = defineStore('Car', () => {
  const { get, post, put, del } = useApi()

  const data = reactive({
    search_car_name: '',
    search_car_level: '所有等級',
    search_car_type: '所有類型',
    image_list: [],
    image_path: [],
    car_map: new Map(),
    car_list: [],
    editData: DEFAULT_CAR(),
  })

  const { addImage } = useImageManager(data)

  const searchList = computed(() => {
    let list = data.car_list.slice()
    if (data.search_car_name)
      list = list.filter(c => c.name.includes(data.search_car_name))
    if (data.search_car_level !== '所有等級')
      list = list.filter(c => c.level === data.search_car_level)
    if (data.search_car_type === '其他車')
      list = list.filter(c => c.type.length === 0)
    else if (data.search_car_type !== '所有類型')
      list = list.filter(c => c.type.includes(data.search_car_type))
    return list
  })

  const refreshMap = () =>
      data.car_list.forEach((car, i) => data.car_map.set(car.id, i))

  const refresh = async () => {
    try { data.car_list = await get('yunmu/car/get') }
    catch { data.car_list = [] }
    finally { refreshMap() }
  }

  const add = () =>
      post('yunmu/car/add', data.editData).then(res => res.text()).then(id => {
        data.editData.id = id
        data.car_list.unshift(data.editData)
        refreshMap()
      })

  const update = () =>
      put('yunmu/car/update', data.editData).then(() => {
        data.car_list[data.car_map.get(data.editData.id)] = data.editData
      })

  const remove = (id) =>
      del('yunmu/car/remove/' + id).then(() => {
        data.car_list.splice(data.car_map.get(id), 1)
        refreshMap()
      })

  const setEditValue = (id) => {
    data.editData = data.car_list[data.car_map.get(id)]
    data.image_path = ['yunmu', 'car', data.editData.id]
  }

  return { data, searchList, refresh, add, update, remove, setEditValue, addImage }
})