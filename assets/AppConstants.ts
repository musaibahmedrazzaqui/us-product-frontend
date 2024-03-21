export const AppConstants = {
    loginHeaderBlue : '#004DBC',
    GenericErrorResponse : {
        message : "Some error occurred",
        subMessage : "E-mail us at help@elphinstone.us if the error persists.",
        isSuccess : false
    }
}
export const AlpacaAccountsError = (msg: string, errorCode: number, orderType: string) => ({
    GenericErrorResponse : {
        message : `Your ${orderType.toLowerCase()} order has been rejected with status code ${errorCode} due to ${msg}`,
        subMessage : "E-mail us at help@elphinstone.us if the error persists.",
        isSuccess : false
    }
});

export const humanReadableDate = (ts : any) => {
    const timestamp = Date.now();
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);
    const seconds = ('0' + date.getSeconds()).slice(-2);
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}