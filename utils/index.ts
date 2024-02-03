export const exportExcel = (value, fileName: string) => {
    try {
        const xlsx = 'application/vnd.ms-excel'
        const blob = new Blob([value], {type: xlsx})
        const a = document.createElement('a') // 转换完成，创建一个a标签用于下载
        a.download = fileName
        a.href = window.URL.createObjectURL(blob)
        a.click()
        a.remove()
    } catch (e) {
        console.log(e, 'error')
    }
}



