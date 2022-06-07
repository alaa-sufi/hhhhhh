import React from 'react'
import { Information } from 'iconsax-react'
import useTranslation from 'next-translate/useTranslation'
import { Modal } from 'rsuite';
import ButtonTheme from "@/ui/ButtonTheme"

export default function DeleteAccountModal({open ,onClose , onDelete}) {
  const { t } = useTranslation("dashboard")

  return (
    <Modal backdrop={true} keyboard={true} open={open} onClose={()=>onClose()} className="less-size-modal">
    <Modal.Header>
       <Modal.Title></Modal.Title>
     </Modal.Header>
   <Modal.Body>
   <div className="text-center px-4">
        <Information size="120" className="mx-auto mb-6 text-orange-500 more-linear"/>
        <p className="mb-4 font-bold text-black text-xl">{t("do_you_want_to_delete_the_account")}</p>
        <div className="flex mt-8 justify-between p-1 gap-4">
          <ButtonTheme color="primary" onClick={onDelete} className="w-1/2 px-4 py-2">{t("yes_delete_now")}</ButtonTheme>   
          <ButtonTheme color="primary" outline onClick={onClose}  className="w-1/2 px-4 py-2">{t("no_cancel_the_deletion")}</ButtonTheme>   
        </div>
    </div>
   </Modal.Body>
   <Modal.Footer>
    
   </Modal.Footer>
 </Modal>
    
  )
}
