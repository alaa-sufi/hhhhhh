import React from 'react'
import { Wallet3 } from 'iconsax-react';
import useTranslation from 'next-translate/useTranslation'
export default function LastActivity() {
      const { t} = useTranslation("dashboard")
  return (
    <section className="p-8 mb-6 bg-white rounded-lg md:rounded-xl">
          <h2 className="mb-6 text-sm text-gray-500">{t('your_last_activity')}</h2>
          <ul className="p-0 m-0">
            {Array.from({ length: Number.parseInt(3) }, (item, index) => (
              <li className="flex items-start gap-1 " key={index}>
                <div className="mb-2 icon-container">
                  <Wallet3 size="18" className="text-primary" />
                </div>
                <div>
                  <h3 className="mb-0 text-sm leading-none">ايداع مبلغ 320$ في حسابك</h3>
                  <span className="text-xs text-gray-400">منذ 2 ساعة</span>
                </div>
              </li>
            ))}

          </ul>

        </section>
  )
}
