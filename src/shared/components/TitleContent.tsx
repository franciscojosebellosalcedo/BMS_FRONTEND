import type { FC } from "react";

type Props = {
    title: string
    fontSize?: number
    className?: string
}

const TitleContent: FC<Props> = ({
    title,
    fontSize,
    className
}) => {
    return (
        <div>
            <div id="titleContent" className={`fs-${fontSize ?? 5} fw-bolder ${className ?? ""}`}>
                {title}
            </div>

        </div>
    )
}

export default TitleContent;