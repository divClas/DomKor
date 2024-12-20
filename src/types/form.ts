export type T_FormItemType = 'string' | 'upload' | 'phone' | 'email' | 'hidden' | 'orgSelect'| 'checkbox'

export interface I_FormFiled {
    type: T_FormItemType
    name: string
    label: string
    defaultValue?: string
    required?: boolean
    link?: string
}

export interface I_FormFiledProps {
    f: I_FormFiled
    disabled: boolean
    error: boolean
}

export interface I_Form {
    successMessage: string
    route: string
    fields: I_FormFiled[]
    btnLabel: string
    name: string
}
