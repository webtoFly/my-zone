const modules = import.meta.glob(["./**/*.vue"])
const customComponents: { [key: string]: any } = {}
for (const key in modules) {
    const res = key.match(/[a-zA-z]+/) || []
    const componentName = res[0] || ''
    customComponents[componentName] = modules[key]
}
export default customComponents
