import type { FC } from "react";

type Props = {
    title: string
    htmlFor: string
}

const LabelInput: FC<Props> = ({ title, htmlFor }) => {
    return (
        <label htmlFor={htmlFor} className="form-label text-body-secondary">
            {title}
        </label>
    )
}

export default LabelInput;