import {FC, ReactNode, useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "@/hooks/storeHooks.ts";
import {T_PayloadTender, TenderPageContext} from "@/components/pages/Tenders/model/context.ts";
import {graphicKPThank} from "@/store/graphicKP";
import {cityThank} from "@/store/city";

export const TenderPageProvider: FC<{
  children: ReactNode
}> = ({children}) => {
  const {entity: tenderList, status} = useAppSelector((s) => s.graphicKP);
  const [payload, setPayload] = useState<T_PayloadTender>({});
  const dispatch = useAppDispatch();

  useEffect(() => {
    setTimeout(()=> {
      dispatch(graphicKPThank.getList(payload));
      dispatch(cityThank.getList({}));
    }, 100)
  }, [payload]);
  return (
    <TenderPageContext.Provider
      value={{
        tenderList,
        status,
        setPayload,
        payload
      }}
      children={<div className={`${status === 'pending' ? 'isLoading' : ''}`}>{children}</div>}
    />
  );
};