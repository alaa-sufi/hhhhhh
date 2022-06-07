import React from 'react'
import useTranslation from 'next-translate/useTranslation'
import { Calendar } from 'iconsax-react';
import { DateRangePicker } from 'rsuite';

export default function CustomDateRangePicker() {
      const { t, lang } = useTranslation("dashboard")
    return (
        <div className="relative flex items-center gap-2 p-2 rounded-lg bg-secondary ">
            <DateRangePicker caretAs={"l"} character=" - " appearance="subtle" cleanable={false} isoWeek={true} showWeekNumbers={true} locale={{ today: t("the_today"), yesterday: t("yesterday"), last7Days: t("last7Days"), ok: t("ok") }} placement={lang === "ar" ? "bottomEnd" : "bottomStart"} />
            <div className="p-2 rounded-lg pointer-events-none bg-primary z-5">
                <Calendar className="text-white" size="30" />
            </div>
        </div>
    )
}
