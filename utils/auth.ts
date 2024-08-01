/** 获取`token` */
export const getToken = () => {
    const localValue = localStorage.getItem('userStore');
    if(!localValue) return;
    const myStore = JSON.parse(localValue);
    return myStore.token;
};
export const clearToken = (key:string) => {
    localStorage.removeItem(key);
};


/** 格式化token（jwt格式） */
export const formatToken = (token: string): string => token;
