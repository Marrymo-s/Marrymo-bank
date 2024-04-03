'use client'

import React, { useState } from 'react'
import * as styles from './index.css'
import Header from '@/components/Header'
import Checkboxes from "@/containers/history/Checkboxes";
import HistoryList from "@/containers/history/HistoryList";

export interface HistoryListProps {
  selected: 'all' | 'wish' | 'moneygift',
  setSelected: (value: 'all' | 'wish' | 'moneygift') => void
}

const History = () => {
  const [selected, setSelected] = useState<'all' | 'wish' | 'moneygift'>('all');

  return (
    <>
      <Header title='축의금 내역' hasPrevious/>
      <main className={styles.historyWrapper}>
        <div>
            <Checkboxes selected={selected} setSelected={setSelected}/>
            <HistoryList selected={selected}/>
        </div>
      </main>
    </>
  )
}

export default History;