import {FC, ReactElement} from "react";
import './style.css'

import {ReactComponent as SuccessIcon} from '@/assets/success-empty.svg'
import {ReactComponent as ErrorIcon} from '@/assets/error-empty.svg'
import {ReactComponent as WarningIcon} from '@/assets/warning.svg'
import {ReactComponent as InfoIcon} from '@/assets/info.svg'
import {ReactComponent as LoadingIcon} from '@/assets/loading.svg'


const StatusIcon: FC<{
  type: 'info' | 'loading' | 'success' | 'error' | 'warning'
}> = ({type}) => {
  const defaultClass = 'status-icon status-icon__'
  const Icon: ReactElement = {
    info: <InfoIcon className={defaultClass + type} />,
    loading: <LoadingIcon className={defaultClass + type} />,
    success: <SuccessIcon className={defaultClass + type} />,
    error: <ErrorIcon className={defaultClass + type} />,
    warning: <WarningIcon className={defaultClass + type} />,
  }[type]
  return Icon
}

export default StatusIcon;