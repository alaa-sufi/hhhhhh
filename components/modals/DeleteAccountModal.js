import React from 'react'
import { Information } from 'iconsax-react'
import useTranslation from 'next-translate/useTranslation'
import { Modal } from 'rsuite';
import ButtonTheme from "@/ui/ButtonTheme"

export default function DeleteAccountModal({open ,onClose , onDelete}) {
  const { t, lang } = useTranslation()

  return (
    <Modal backdrop={true} keyboard={true} open={open} onClose={()=>onClose()} className="less-size-modal">
    <Modal.Header>
       <Modal.Title></Modal.Title>
     </Modal.Header>
   <Modal.Body>
   <div className="text-center">
        <Information size="120" className="mx-auto mb-6 text-orange-500"/>
        <p className="mb-4 font-bold text-black text-xl">{t("dashboard:do_you_want_to_delete_the_account")}</p>
        <div className="flex mt-8 justify-between p-1 gap-4">
          <ButtonTheme color="primary" onClick={onDelete} className="w-1/2 px-4 py-2">{t("dashboard:yes_delete_now")}</ButtonTheme>   
          <ButtonTheme color="primary" outline onClick={onClose}  className="w-1/2 px-4 py-2">{t("dashboard:no_cancel_the_deletion")}</ButtonTheme>   
        </div>
    </div>
   </Modal.Body>
   <Modal.Footer>
    
   </Modal.Footer>
 </Modal>
    
  )
}
