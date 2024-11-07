import {I_FormFiled, I_FormFiledProps} from "@/types/form.ts";
import {FieldOrgSelectUi} from "@/components/ui/Fields/OrgSelect.tsx";
import {FieldUploadUi} from "@/components/ui/Fields/Upload.tsx";
import {FieldPhoneUi} from "@/components/ui/Fields/Phone.tsx";
import {FieldEmailUi} from "@/components/ui/Fields/Email.tsx";
import {FieldStringUi} from "@/components/ui/Fields/String.tsx";
import {FieldHiddenUi} from "@/components/ui/Fields/Hidden.tsx";

export function FormItems(props: {
    fields: I_FormFiled[]
    disabled: boolean
    fieldsError: string[]
}) {
    return (props.fields.map((f, index) => {
        const fieldProps: I_FormFiledProps = {
            f,
            disabled: props.disabled,
            error: props.fieldsError.includes(f.name)
        }
        switch (f.type) {
            case "hidden":
                return <FieldHiddenUi key={index} {...fieldProps} />
            case "string":
                return <FieldStringUi key={index} {...fieldProps} />
            case "email":
                return <FieldEmailUi key={index} {...fieldProps} />
            case "phone":
                return <FieldPhoneUi key={index} {...fieldProps} />
            case "upload":
                return <FieldUploadUi key={index} {...fieldProps} />
            case "orgSelect":
                return <FieldOrgSelectUi key={index} {...fieldProps} />
            default:
                return null
        }
    }))
}