import { useCommonStore } from '~/stores/common'

const JSON_HEADERS = { 'Content-Type': 'application/json' }

export function useApi() {
  const commonStore = useCommonStore()
  const url = (path) => commonStore.data.main_url + path

  const get = (path) =>
    fetch(url(path)).then(res => res.json())

  const post = (path, body) =>
    fetch(url(path), { method: 'POST', headers: JSON_HEADERS, body: JSON.stringify(body) })

  const put = (path, body) =>
    fetch(url(path), { method: 'PUT', headers: JSON_HEADERS, body: JSON.stringify(body) })

  const del = (path) =>
    fetch(url(path), { method: 'DELETE' })

  const upload = (path, file) => {
    const formData = new FormData()
    formData.append('file', file)
    return fetch(url(path), { method: 'POST', body: formData })
  }

  return { url, get, post, put, del, upload }
}
