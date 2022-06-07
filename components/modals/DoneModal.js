import React from 'react'
import { Verify } from 'iconsax-react'
import useTranslation from 'next-translate/useTranslation'
import { Modal } from 'rsuite';
export default function DoneModal({open ,onClose , shiny , account}) {
  const { t } = useTranslation("dashboard")
  return (
    <Modal backdrop={true} keyboard={true} open={open} onClose={()=>onClose()} className="more-size-modal">
    <Modal.Header>
       <Modal.Title></Modal.Title>
     </Modal.Header>
   <Modal.Body>
   <div className="text-center">
        <Verify size="120" className="mx-auto mb-6 text-success more-linear"/>
        <p className="mb-4 font-bold text-black">{t("done")}</p>
        <bdi className="mb-4 font-bold text-black">{`${t("successfully_an_amount_has_been_deposited")} ${shiny} ${t("from_account")} ${account} ${t("to_account")}`}</bdi>
    </div>
   </Modal.Body>
   <Modal.Footer>
    
   </Modal.Footer>
 </Modal>
   
  )
}
