import fs from "fs"
import path from "path"

/**
 * 递归读取文件夹内的文件
 * @param root 
 * @param filter 
 * @param files 
 * @param prefix 
 * @returns 
 */
export function readdirRecursive(
  root: string,
  filter?: (name: string, index: number, dir: string) => boolean,
  files?: string[],
  prefix?: string
) {
  prefix = prefix || ''
  files = files || []
  filter = filter ? filter : noDotFiles

  var dir = path.join(root, prefix)
  if (!fs.existsSync(dir)) return files
  if (fs.statSync(dir).isDirectory()) {
    fs.readdirSync(dir)
    .filter(function (name, index) {
      return filter!(name, index, dir)
    })
    .forEach(function (name) {
      readdirRecursive(root, filter, files, path.join(prefix!, name))
    })
  } else {
    files.push(prefix)
  }

  return files
}

/**
 * 默认过滤
 * @param x 
 * @returns 
 */
function noDotFiles(x: string) {
  return x[0] !== '.'
}