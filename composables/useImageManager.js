import { useApi } from '~/composables/useApi'

export function useImageManager(data) {
  const { url, upload, post } = useApi()

  const addImage = () => {
    const inputFile = document.getElementById('dropzone-file')
    if (!inputFile?.files[0]) return

    upload('image/add/' + data.image_path.join('__'), inputFile.files[0])
      .then(res => res.text())
      .then(imageName => {
        document.getElementById('insert_button')?.click()
        if (imageName !== 'Empty' && imageName !== 'Error') {
          data.editData.image = url(data.image_path.join('/') + '/' + imageName)
        }
      })
      .catch(error => console.error('上傳錯誤:', error))
  }

  const refreshImage = () => {
    post('image/get', data.image_path)
      .then(res => res.json())
      .then(imageNames => {
        data.image_list.length = 0
        imageNames.forEach(image => {
          data.image_list.push({ url: url(image), select: false })
        })
      })
  }

  return { addImage, refreshImage }
}
