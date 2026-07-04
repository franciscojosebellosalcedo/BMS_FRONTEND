import { type FC } from 'react';

type Props = {
    message: string,
    typeAlert?: "danger" | "warning" | "success"
}

const TextError: FC<Props> = ({
    message,
    typeAlert
}) => {
    return (
        <div className='fv-plugins-message-container'>
            <div className={`fv-help-block text-${typeAlert ?? "danger"}`}>
                <span role='alert'>{message}</span>
            </div>
        </div>
    )
}

export default TextError;