import React from 'react'

export default function RecordCard({card}) {
  return (
    <div  className={`${card.class}  p-6 rounded-xl w-1/4`}>
    <h2>{card.title}</h2>
    <strong className="mb-4 text-3xl font-black">{card.number}</strong>
  </div>
  )
}
