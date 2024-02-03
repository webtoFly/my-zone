export interface formKitItemType {
    label: string,
    field: string,
    type: string,
    props?: {
        clearable?: boolean,
        placeholder?: string
    }
}
