import React from 'react'
import { CardPos } from 'iconsax-react';

export default function NoData({text}) {
    return (
        <div className="text-center py-20 col-span-2">
            <CardPos size="120" className="text-gray-400 mb-4 mx-auto" />
            <p className="font-bold text-3xl text-gray-400">{text}</p>
        </div>

    )
}
