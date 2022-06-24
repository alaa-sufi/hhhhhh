import React from 'react'
import { Information } from 'iconsax-react'
import useTranslation from 'next-translate/useTranslation'
import { Modal } from 'rsuite';

export default function WarningModal({open ,onClose ,message , size}) {

  return (
    <Modal backdrop={true} keyboard={true} open={open} onClose={()=>onClose()} className={size =="sm" ? "less-size-modal" : "more-size-modal"}>
    <Modal.Header>
       <Modal.Title></Modal.Title>
     </Modal.Header>
   <Modal.Body>
   <div className="text-center px-4">
        <Information size="150" className="mx-auto mb-6 text-orange-500 more-linear"/>
       {message}
    </div>
   </Modal.Body>
   <Modal.Footer>
    
   </Modal.Footer>
 </Modal>
    
  )
}
