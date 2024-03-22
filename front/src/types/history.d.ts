export interface historyResponse {
    moneygiftListSum: number,
    wishItemListSum: number,
    totalSum: number,
    moneyList: moneygifts[]
}

export interface moneygifts {
    moneySequence: number,
    userSequence: number,
    type: string,
    sender: string,
    amount: number,
    relationship: string,
    name: string,
    guestType: string
}