import React, { useState } from 'react'
import useTranslation from 'next-translate/useTranslation'
import { ProfileContainer } from "@/container"
export default function FinancialInformation() {
  const { t, lang } = useTranslation("profile")

  return (
    <ProfileContainer>
      FinancialInformation
    </ProfileContainer>
  )
}
