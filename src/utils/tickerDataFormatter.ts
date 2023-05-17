export const tickerDataFormatter = (data: any) => ({
    BID: data[1][0],
    BID_SIZE: data[1][1],
    ASK: data[1][2],
    ASK_SIZE: data[1][3],
    DAILY_CHANGE: data[1][4],
    DAILY_CHANGE_RELATIVE: data[1][5],
    LAST_PRICE: data[1][6],
    VOLUME: data[1][7],
    HIGH: data[1][8],
    LOW: data[1][9]
})
