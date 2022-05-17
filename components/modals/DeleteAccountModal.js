import React from 'react'
import { Information } from 'iconsax-react'
import useTranslation from 'next-translate/useTranslation'
import { Modal , Button} from 'rsuite';
export default function DeleteAccountModal({open ,onClose , onDelete}) {
  const { t, lang } = useTranslation()

  return (
    <Modal backdrop={true} keyboard={true} open={open} onClose={()=>onClose()}>
    <Modal.Header>
       <Modal.Title></Modal.Title>
     </Modal.Header>
   <Modal.Body>
   <div className="text-center">
        <Information size="120" className="mx-auto mb-6 text-orange-500"/>
        <p className="mb-4 font-bold text-black">{t("dashboard:do_you_want_to_delete_the_account")}</p>
        
    </div>
   </Modal.Body>
   <Modal.Footer>
    
   </Modal.Footer>
 </Modal>
    
  )
}
