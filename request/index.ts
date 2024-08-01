import {ElMessage} from 'element-plus';

export interface ResOptions<T> {
    data?: T
    code?: number
    msg?: string
}

class Http {
    baseURL: string;

    constructor(baseURL: string) {
        this.baseURL = baseURL;
    }

    get(url: string, params?: any): Promise<any> {
        return this.fetch(url, {method: 'get',
            params});
    }

    post(url: string, data?: any): Promise<any> {
        return this.fetch(url, {method: 'post',
            data});
    }

    fetch(url: string, options?: unknown) {
        const requestUrl = process.env.NODE_ENV === 'development' ? this.baseURL + url : `${url}`;
        // eslint-disable-next-line no-async-promise-executor
        return new Promise(async(resolve, reject) => {
            try {
                const {data, error} = await useFetch(requestUrl, {...options});
                if(error.value) reject(error.value);
                if(data.value?.code && data.value.code !== 200)
                    ElMessage.error(data.value.msg);

                resolve(data.value || {});
            } catch(error) {
                console.error(error);
                reject(error);
            }
        });
    }
}


export default new Http('/webApi');
