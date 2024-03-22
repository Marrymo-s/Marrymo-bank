'use client'

import React, { useState } from 'react'
import * as styles from './index.css'
import Checkbox from '@/components/Checkbox'

const Checkboxes = () => {
    const [selected, setSelected] = useState<string>('all')

    const handleChange = (value: string) => {
        setSelected(value);
    }

    return (
        <>
            <div>
                <Checkbox checked={selected === 'all'} onChange={() => handleChange('all')}>전체</Checkbox>
                <Checkbox checked={selected === 'wish'} onChange={() => handleChange('wish')}>위시리스트 펀딩</Checkbox>
                <Checkbox checked={selected === 'moneygift'} onChange={() => handleChange('moneygift')}>축의금</Checkbox>
            </div>
        </>
    )
}

export default Checkboxes;