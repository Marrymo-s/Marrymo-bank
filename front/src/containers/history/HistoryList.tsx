'use client'

import React, { useState } from 'react'
import {historyListContainer} from "@/containers/history/index.css";
import axios from "axios";
import {historyResponse} from "@/types/history";
import {moneygifts} from "@/types/history";

const HistoryList = () => {
    const [historyData, setHistoryData] = useState<moneygifts[]>()

    const getHistory = async () => {
        try {
            const response = await axios.get<historyResponse>('/moneygift')
            console.log(response);
            // setHistoryData(response.data.items.moneyList); //서버 정상화되면 연결해서 테스트해볼 예정
        } catch(error) {
            console.error('moneygift history get중 오류 발생', error)
        }
    }

    return (
        <>
            <div className={historyListContainer}>
                <table>
                    <thead>
                    <tr>
                        <th>이름</th>
                        <th>금액</th>
                        <th>유형</th>
                        <th>하객</th>
                        <th>비고</th>
                    </tr>
                    </thead>
                    <tbody>
                    {historyData?.map((history,  index) => (
                        <tr key={index}>
                            <td>{history.sender}</td>
                            <td>{history.amount}</td>
                            <td>{history.type}</td>
                            <td>{history.guestType}</td>
                            <td>{history.relationship}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>

            </div>
        </>
    )
}

export default HistoryList;