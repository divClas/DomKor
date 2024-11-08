import {Dictionary} from "@/contexts/Dictionary.ts";
import {LinkDownloadUi} from "@/components/ui/LinkDownload";
import {useTender} from "@/components/entities/Tender/model/context.ts";

export const TenderBL_LinkDownload = {
  Pc: () => {
    const {tender} = useTender()
    return (
      <LinkDownloadUi label={Dictionary.DOWNLOAD_TENDER_DOC.ru}
                      href={tender.DOCUMENT}
                      className={{
                        a: 'view--pc'
                      }}
      />
    )
  },
  Mb: () => {
    const {tender} = useTender()
    return (
      <LinkDownloadUi label={Dictionary.DOWNLOAD_TENDER_DOC.ru}
                      href={tender.DOCUMENT}
                      className={{
                        a: 'view--mb w-100 mt-1',
                        Flex: 'w-100 flex-jc-center'
                      }}
      />
    )
  }
}