import React from 'react'
import { Verify } from 'iconsax-react'
import useTranslation from 'next-translate/useTranslation'
import { Modal } from 'rsuite';
export default function DoneModal({open ,onClose , message}) {
  const { t } = useTranslation("dashboard")
  return (
    <Modal backdrop={true} keyboard={true} open={open} onClose={()=>onClose()} className="more-size-modal">
    <Modal.Header>
       <Modal.Title></Modal.Title>
     </Modal.Header>
   <Modal.Body>
   <div className="text-center">
        <Verify size="170" className="mx-auto mb-6 text-success more-linear"/>
      {message}
    </div>
   </Modal.Body>
   <Modal.Footer>
    
   </Modal.Footer>
 </Modal>
   
  )
}
