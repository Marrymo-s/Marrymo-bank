'use client'

import React, { useState } from 'react'
import * as styles from './index.css'
import Checkbox from '@/components/Checkbox'
import {HistoryListProps} from "@/containers/history/index";

const Checkboxes = ({selected, setSelected}: HistoryListProps) => {
    const handleChange = (value: 'all' | 'wish' | 'moneygift') => {
        setSelected(value);
    }

    return (
        <>
            <div className={styles.checkboxesContainer}>
                <Checkbox checked={selected === 'all'} onChange={() => handleChange('all')}>전체</Checkbox>
                <Checkbox checked={selected === 'wish'} onChange={() => handleChange('wish')}>위시리스트 펀딩</Checkbox>
                <Checkbox checked={selected === 'moneygift'} onChange={() => handleChange('moneygift')}>축의금</Checkbox>
            </div>
        </>
    )
}

export default Checkboxes;