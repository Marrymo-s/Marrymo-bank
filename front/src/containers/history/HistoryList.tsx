'use client'

import React, { useState } from 'react'
import {historyListContainer} from "@/containers/history/index.css";
import axios from "axios";

//type
import {moneygifts} from "@/types/history";
import {HistoryListProps} from "@/containers/history/index";

type SelectedProp = Pick<HistoryListProps, 'selected'>

const HistoryList = ({selected} : SelectedProp) => {
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

    // 선택된 타입에 따라 데이터를 필터링하는 로직 추가
    const filteredData = historyData.filter(history => {
        if (selected === 'all') return true; // 모든 데이터 표시
        if (selected === 'wish' && history.type === 'ITEM') return true; // 위시리스트 펀딩만 표시
        if (selected === 'moneygift' && history.type === 'CASH') return true; // 축의금만 표시
        return false; // 그 외의 경우 데이터를 표시하지 않음
    })

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
                    {filteredData?.map((history,  index) => (
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