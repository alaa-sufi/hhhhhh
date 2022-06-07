import React from 'react'
import { Timer } from 'iconsax-react'
import useTranslation from 'next-translate/useTranslation'
import { Modal } from 'rsuite';
export default function ChangeLeverageModal({ open, onClose }) {
  const { t } = useTranslation("dashboard")
  return (
    <Modal backdrop={true} keyboard={true} open={open} onClose={()=>onClose()} className="more-size-modal">
       <Modal.Header>
          <Modal.Title></Modal.Title>
        </Modal.Header>
      <Modal.Body>
        <div className="text-center">
          <Timer size="120" className="mx-auto mb-6 text-gray-800" />
          <p className="mb-4 font-bold text-black ">{t("your_request_has_been_registered_to_change_the_leverage")}</p>
          <p className="mb-4 text-gray-500 mx-auto max-w-7/10">{t("the_addict_will_be_approved_in_a_very_short_time_you_will_appear_notice_if_the_customer_succeeds_or_not")}</p>
        </div>
      </Modal.Body>
      <Modal.Footer>
       
      </Modal.Footer>
    </Modal>

  )
}
