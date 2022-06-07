import React from 'react'
import { MoneyRecive, Wallet3, CardReceive, Clock } from 'iconsax-react'
import useTranslation from 'next-translate/useTranslation'
import { Modal } from 'rsuite';
import ButtonTheme from '@/ui/ButtonTheme';
export default function DepositModal({ open, onClose }) {
  const { t } = useTranslation("dashboard")

  return (
    <Modal backdrop={true} keyboard={true} open={open} onClose={() => onClose()} className="less-size-modal">
      <Modal.Header>
        <Modal.Title></Modal.Title>
      </Modal.Header>
      <Modal.Body >
        <div className="text-center px-4">
          <MoneyRecive size="120" className="mx-auto mb-6 text-primary more-linear" />
          <p className="mb-8 font-bold text-black">{t("do_you_want_to_deposit_now")}</p>
          <ButtonTheme color="primary" as="link" href="/" block className="mb-4 py-3 ">
            <div className="flex gap-2 justify-center items-center ">
              <Wallet3 />
              {t("deposit_from_my_wallet")}
            </div>
          </ButtonTheme>
          <ButtonTheme color="primary" as="link" href="/" block className="mb-4 py-3 ">
            <div className="flex gap-2 justify-center items-center ">
              <CardReceive />
              {t("live_deposit")}
            </div>
          </ButtonTheme>
          <ButtonTheme color="primary" as="link" href="/" outline block className="py-3 ">
            <div className="flex gap-2 justify-center items-center ">
              <Clock />
              {t("deposit_from_my_wallet")}
            </div>
          </ButtonTheme>

        </div>
      </Modal.Body>
    </Modal>

  )
}
