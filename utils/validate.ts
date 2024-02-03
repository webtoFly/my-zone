/** 判断是否为外链 */
export const isExternal = (path: string) => {
    const reg = /^(https?:|mailto:|tel:)/
    return reg.test(path)
}

// 字符串首字母转大写
export const firstWordToUpper = (words: string): string => {
    return words.replace(words[0], words[0].toUpperCase())
}
