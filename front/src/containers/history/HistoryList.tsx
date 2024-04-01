'use client'

import React, {useEffect, useState} from 'react'
import {historyListContainer} from "@/containers/history/index.css";

//type
import {historyResponse, moneygifts} from "@/types/history";
import {HistoryListProps} from "@/containers/history/index";
import {fetchInstance} from '@/services';
type SelectedProp = Pick<HistoryListProps, 'selected'>

const HistoryList = ({selected} : SelectedProp) => {
    const [historyData, setHistoryData] = useState<moneygifts[]>();
    const [totalSum, setTotalSum] = useState<number>()
    const [moneygiftSum, setMoneygiftSum] = useState<number>()
    const [wishSum, setWishSum] = useState<number>()

    useEffect(() => {
        getHistory()
    }, [historyData])

    const getHistory = async () => {
        try {
            const response = await fetchInstance('/moneygift').then((res) => res) as historyResponse
            console.log(response);

            setHistoryData(response.moneyList); //서버 정상화되면 연결해서 테스트해볼 예정
            setTotalSum(response.totalSum);
            setMoneygiftSum(response.moneygiftListSum);
            setWishSum(response.wishItemListSum);
        } catch(error) {
            console.error('moneygift history get중 오류 발생', error)
        }
    }

    // 선택된 타입에 따라 데이터를 필터링하는 로직 추가
    const filteredData = historyData?.filter(history => {
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
