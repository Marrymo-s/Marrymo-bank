'use client'

import React, { useState } from 'react'
import {historyListContainer} from "@/containers/history/index.css";
import axios from "axios";
import {historyResponse} from "@/types/history";
import {moneygifts} from "@/types/history";

const HistoryList = () => {
    const [historyData, setHistoryData] = useState<moneygifts[]>([
                {
                    "moneygiftSequence": 3,
                    "userSequence": 8,
                    "wishItemSequence": null,
                    "type": "CASH",
                    "sender": "박도연",
                    "amount": 10000,
                    "relationship": "친척",
                    "wishItemName": null,
                    "guestType": "신랑"
                },
                {
                    "moneygiftSequence": 4,
                    "userSequence": 8,
                    "wishItemSequence": null,
                    "type": "CASH",
                    "sender": "박시하",
                    "amount": 20000,
                    "relationship": "친척",
                    "wishItemName": null,
                    "guestType": "신랑"
                },
                {
                    "moneygiftSequence": 5,
                    "userSequence": 8,
                    "wishItemSequence": 1,
                    "type": "ITEM",
                    "sender": "정지원",
                    "amount": 10000,
                    "relationship": "친척",
                    "wishItemName": "air conditional",
                    "guestType": "신랑"
                },
                {
                    "moneygiftSequence": 6,
                    "userSequence": 8,
                    "wishItemSequence": 2,
                    "type": "ITEM",
                    "sender": "김하연",
                    "amount": 40000,
                    "relationship": "친척",
                    "wishItemName": "microwave",
                    "guestType": "신랑"
                }


    ])
    const [totalSum, setTotalSum] = useState<number>()
    const [moneygiftSum, setMoneygiftSum] = useState<number>()
    const[wishSum, setWishSum] = useState<number>()

    // const getHistory = async () => {
    //     try {
    //         const response = await axios.get<historyResponse>('/moneygift')
    //         console.log(response);
    //
    //         setHistoryData(response.data.moneyList); //서버 정상화되면 연결해서 테스트해볼 예정
    //         setTotalSum(response.data.totalSum);
    //         setMoneygiftSum(response.data.moneygiftListSum);
    //         setWishSum(response.data.wishItemListSum);
    //     } catch(error) {
    //         console.error('moneygift history get중 오류 발생', error)
    //     }
    // }

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