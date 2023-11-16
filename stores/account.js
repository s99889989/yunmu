import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useAccountStore = defineStore('Account', () => {
  //https://madustrialtd.asuscomm.com:9100/
  //http://localhost:9100/
  const data = reactive({
    admin: true,
    main_url: 'https://madustrialtd.asuscomm.com:9100/',

  })


  return { data }
})
