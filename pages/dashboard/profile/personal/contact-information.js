import React, { useState } from 'react'
import useTranslation from 'next-translate/useTranslation'
import { ProfileContainer } from "@/container"
import { Location, ClipboardText, Lock1, Call } from 'iconsax-react'
export default function ContactInformation() {
  const { t, lang } = useTranslation("profile")
 
  return (
    <ProfileContainer tab={"personl"}>
      Personal
    </ProfileContainer>
  )
}
