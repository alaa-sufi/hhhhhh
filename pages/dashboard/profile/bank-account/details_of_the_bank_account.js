import React, { useState } from 'react'
import useTranslation from 'next-translate/useTranslation'
import { ProfileContainer } from "@/container"
import { Location, ClipboardText, Lock1, Call } from 'iconsax-react'
export default function DetailsOfTheBankAccount() {
  const { t, lang } = useTranslation("profile")
 
  return (
    <ProfileContainer tab={"bankAccount"}>
      Personal
    </ProfileContainer>
  )
}
