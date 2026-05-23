import { type FC } from 'react';

type Props = {
    message: string
}

const ErrorInput: FC<Props> = ({
    message
}) => {
    return (
        <div className='fv-plugins-message-container'>
            <div className='fv-help-block text-danger'>
                <span role='alert'>{message}</span>
            </div>
        </div>
    )
}

export default ErrorInput;