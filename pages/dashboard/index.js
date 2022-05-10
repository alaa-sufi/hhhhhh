import React from 'react'
import {Wallet3 } from 'iconsax-react';
import useTranslation from 'next-translate/useTranslation'


export default function Dashboard() {
  const { t, lang } = useTranslation()

  return (
    <div className="grid gap-4 grid-cols-3 ">
      <div className=" col-span-2 ">
        <div className="bg-white rounded-lg md:rounded-xl p-4 mb-3 ">e</div>
      </div>
      <div>
        <div className="bg-white rounded-lg md:rounded-xl p-4 mb-3">
          <div className="flex gap-1 items-center">
            <div className="icon-container">
            <Wallet3 size="15" className="text-primary" />
            </div>
            <h2 className="text-sm text-gray-500 m-0">{t('dashboard:current_balance')}</h2>
          </div>
        </div>
        <div className="bg-white rounded-lg md:rounded-xl p-4 mb-3">e</div>
        <div className="bg-white rounded-lg md:rounded-xl p-4 mb-3">e</div>
      </div>
    </div>
  )
}
