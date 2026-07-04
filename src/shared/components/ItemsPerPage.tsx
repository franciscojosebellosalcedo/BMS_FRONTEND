import type { FC } from "react"
import type { TDataInputSelect } from "../types/globalType"
import SelectComponent from "./SelectComponent"

type Props = {
    onChange: Function
    itemsPerPage: number
    options?: TDataInputSelect[]
    isIndexSuperior?: boolean
}
const ItemsPerPage: FC<Props> = ({
    onChange,
    itemsPerPage,
    options,
    isIndexSuperior
}) => {
    return (
        <SelectComponent
            title='Límite'
            id=''
            isZIndexSuperior={isIndexSuperior}
            onChange={(selected: TDataInputSelect) => {
                onChange(selected)
            }}
            className="form-control"
            defaultValue={itemsPerPage}
            options={options ? options : [
                { label: "10", value: 10 },
                { label: "20", value: 20 },
                { label: "30", value: 30 },
                { label: "40", value: 40 },
                { label: "50", value: 50 },
                { label: "60", value: 60 },
                { label: "70", value: 70 },
                { label: "80", value: 80 },
                { label: "90", value: 90 },
                { label: "100", value: 100 },
            ]}
        />
    )
}

export default ItemsPerPage;