export interface historyResponse {
    moneygiftListSum: number,
    wishItemListSum: number,
    totalSum: number,
    moneyList: moneygifts[]
}

export interface moneygifts {
    moneygiftSequence: number,
    userSequence: number,
    wishItemSequence?: number | null,
    type: string,
    sender: string,
    amount: number,
    relationship?: string | null,
    wishItemName?: string | null,
    guestType: string
}

export enum MoneygiftType {
    CASH = '축의금',
    ITEM = '펀딩',
}