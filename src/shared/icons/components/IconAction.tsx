import type { FC } from "react";
import type { TTypeIcon } from "../types/iconType";

type Props = {
    fs?: number
    me?: number
    typeIcon: TTypeIcon 
}

const getIcon = (typeIcon: TTypeIcon, fs?: number, me?: number ) =>{
    const typesIcons = {
        "add": <i className={`bi bi-plus-lg    ${me ? `me-${me}` : "" } ${fs ? `fs-${fs}` : ""} `}></i>,
        "disable-enable": <i className={`bi bi-toggle-on    ${me ? `me-${me}` : "" } ${fs ? `fs-${fs}` : ""} `}></i>,
    }

    return typesIcons[typeIcon as keyof typeof typesIcons]
}

const IconAction: FC<Props> = ({
    fs,
    me,
    typeIcon
}) => {

    return getIcon( typeIcon , fs, me );
}

export default IconAction;