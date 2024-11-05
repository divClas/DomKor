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
}) {
    return (props.fields.map((f, index) => {
        const fieldProps: I_FormFiledProps = {
            key: index,
            f,
            disabled: props.disabled
        }
        switch (f.type) {
            case "hidden":
                return <FieldHiddenUi {...fieldProps} />
            case "string":
                return <FieldStringUi {...fieldProps} />
            case "email":
                return <FieldEmailUi {...fieldProps} />
            case "phone":
                return <FieldPhoneUi {...fieldProps} />
            case "upload":
                return <FieldUploadUi {...fieldProps} />
            case "orgSelect":
                return <FieldOrgSelectUi {...fieldProps} />
            default:
                return null
        }
    }))
}