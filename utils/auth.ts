/** 获取`token` */
export const getToken = () => {
    const myStore = JSON.parse(localStorage.getItem('userStore'))
    if (myStore) return myStore.token
}
export const clearToken = (key) => {
    localStorage.removeItem(key)
}


/** 格式化token（jwt格式） */
export const formatToken = (token: string): string => {
    return token;
};
