import React from 'react'

export default function Error({message}) {
  return (
    <div>{message ? message :"Error"}</div>
  )
}
