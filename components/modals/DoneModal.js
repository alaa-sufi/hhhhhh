import React from 'react'
import { Verify } from 'iconsax-react'
import useTranslation from 'next-translate/useTranslation'
import { Modal } from 'rsuite';
export default function DoneModal({open ,onClose , shiny , account}) {
  const { t, lang } = useTranslation()

  return (
    <Modal backdrop={true} keyboard={true} open={open} onClose={()=>onClose()}>
    <Modal.Header>
       <Modal.Title></Modal.Title>
     </Modal.Header>
   <Modal.Body>
   <div className="text-center">
        <Verify size="120" className="mx-auto mb-6 text-success"/>
        <p className="mb-4 font-bold text-black">{t("dashboard:done")}</p>
        <p className="mb-4 font-bold text-black">{`${t("dashboard:successfully_an_amount_has_been_deposited")} ${shiny} ${t("dashboard:to_account")} ${account} ${t("dashboard:to_account")}`}</p>
    </div>
   </Modal.Body>
   <Modal.Footer>
    
   </Modal.Footer>
 </Modal>
   
  )
}
