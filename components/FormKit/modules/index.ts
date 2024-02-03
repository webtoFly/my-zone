const modules = import.meta.glob(["./**/*.vue"])
const customComponents = {}
for (const key in modules) {
    const componentName = key.match(/[a-zA-z]+/)[0]
    customComponents[componentName] = modules[key]
}
export default customComponents
