import { defineStore } from 'pinia'
import { useApi } from '~/composables/useApi'
import { useImageManager } from '~/composables/useImageManager'

const DEFAULT_PET = () => ({
  id: '', name: '', image: '/pet/pet/企鵝仔仔.jpg',
  label: [], dress: 1, attribute_image: [], attribute_info: [], skin_image: [],
})

export const usePetStore = defineStore('Pet', () => {
  const { get, post, put, del } = useApi()

  const data = reactive({
    search_pet_name: '',
    image_list: [],
    image_path: [],
    pet_map: new Map(),
    pet_list: [],
    editData: DEFAULT_PET(),
  })

  const { addImage } = useImageManager(data)

  const searchList = computed(() => {
    let list = data.pet_list.slice()
    if (data.search_pet_name)
      list = list.filter(p => p.name.includes(data.search_pet_name))
    return list
  })

  const refreshMap = () =>
      data.pet_list.forEach((p, i) => data.pet_map.set(p.id, i))

  const refresh = async () => {
    try { data.pet_list = await get('yunmu/pet/get') }
    catch { data.pet_list = [] }
    finally { refreshMap() }
  }

  const add = () =>
      post('yunmu/pet/add', data.editData).then(res => res.text()).then(id => {
        data.editData.id = id
        data.pet_list.unshift(data.editData)
        refreshMap()
      })

  const update = () =>
      put('yunmu/pet/update', data.editData).then(() => {
        data.pet_list[data.pet_map.get(data.editData.id)] = data.editData
      })

  const remove = (id) =>
      del('yunmu/pet/remove/' + id).then(() => {
        data.pet_list.splice(data.pet_map.get(id), 1)
        refreshMap()
      })

  const setEditValue = (id) => {
    data.editData = data.pet_list[data.pet_map.get(id)]
    data.image_path = ['yunmu', 'pet', data.editData.id]
  }

  return { data, searchList, refresh, add, update, remove, setEditValue, addImage }
})