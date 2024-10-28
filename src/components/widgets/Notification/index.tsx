import {FC} from "react";
import {useAppSelector} from "@/hooks/storeHooks";
import './style.css'
import {NotificationEntity} from "@/components/entities/Notification";

export const NotificationWidget: FC = () => {
  const {messages} = useAppSelector(state => state.notification)
  return (
    <div className="notification-widget">
      <div className="notification-widget__items">
        {messages.map((n) => <NotificationEntity notification={n}
                                                 key={n.id} />)}
      </div>
    </div>
  );
};