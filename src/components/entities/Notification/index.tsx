import './style.scss'
import {FC, useCallback, useEffect, useState} from "react";
import {useAppDispatch} from "@/hooks/storeHooks";
import StatusIcon from "@/components/ui/StatusIcon";
import {I_Message, I_MessageType, unsetNotification} from "@/store/notification";
import {ReactComponent as Close} from '@/assets/close-dark.svg';

export const NotificationEntity: FC<{
  notification: I_Message
}> = ({notification}) => {
  const dispatch = useAppDispatch()
  const [close, setClose] = useState<boolean>(false)
  const closeHandler = useCallback(() => {
    setClose(true)
    setTimeout(() => {
      dispatch(unsetNotification({id: notification.id}))
    }, 200)
  },[dispatch, notification.id])
  useEffect(() => {
    const autoCloseTypes: (I_MessageType)[] = ['info', 'success']
    if (autoCloseTypes.includes(notification.type)) {
      setTimeout(closeHandler, 500)
    }
  }, [closeHandler, notification])
  return (
    <div className={"notification-widget__item-wrap"}>
      <div className={`notification-widget__item ${close ? 'close' : ''}`}
           key={notification.id}>
        <div className="notification-widget__item__icon"><StatusIcon type={notification.type} /></div>
        <div className="notification-widget__item__content">
          <div className="notification-widget__item__title">{notification.title}</div>
          {notification.message && <div className="notification-widget__item__message">{notification.message}</div>}
        </div>
        <div className="notification-widget__item__close noselect"
             onClick={() => closeHandler()}><Close /></div>
      </div>
    </div>
  );
};