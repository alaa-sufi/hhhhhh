import React, { useState } from 'react'
import useTranslation from 'next-translate/useTranslation'
import { ProfileContainer } from "@/container"
import { Location, ClipboardText, Lock1, Call } from 'iconsax-react'
export default function ConfirmTheAddress() {
  const { t, lang } = useTranslation("profile")
 
  return (
    <ProfileContainer tab={"uploadDocuments"}>
      Personal
    </ProfileContainer>
  )
}
