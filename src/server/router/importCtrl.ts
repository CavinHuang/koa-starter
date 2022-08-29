import { isDev } from '@/config'
import { CONTROLLER_ROOT } from '@/constants'
import { readdirRecursive } from '@/utils'
import path from 'path'

const appendExt = isDev ? '.api.ts' : '.api.js'
console.log("🚀 ~ file: importCtrl.ts ~ line 7 ~ appendExt", appendExt)

export const importController = async () => {
  const filesAPP = readdirRecursive(CONTROLLER_ROOT)
  console.log(filesAPP)
  await filesAPP.filter((file) => file.endsWith(appendExt)).forEach(async(file) => {
    const filePath = path.join(CONTROLLER_ROOT, file)
    console.log("🚀 ~ file: importCtrl.ts ~ line 13 ~ awaitfilesAPP.filter ~ filePath", filePath)
    await import(filePath)
  })
}