'use client'

import React, { useState } from 'react'
import {historyListContainer} from "@/containers/history/index.css";
import axios from "axios";


const HistoryList = () => {
    // const [historyData, sethistoryData] = useState<HistoryData[]

    const getHistory = async () => {
        try {
            const response = await axios.get('/moneygift')

        } catch(error) {
            console.error('moneygift history get중 오류 발생', error)
        }
    }

    return (
        <>
            <div className={historyListContainer}>
                아리소

            </div>
        </>
    )
}

export default HistoryList;