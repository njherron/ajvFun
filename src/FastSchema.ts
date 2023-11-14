
export interface FastRecordSchema {
    assets: {
        bonds: {amount: number, serialNumber: string;}[];
        cds: number[];
        checking: number[];
        other: {amount: number, description: string;}[];
        savings: number[];
    };
    expenses: {
        spending: {amount: number, description: string;}[];
        summary: {
            clothing: number;
            dependentSupport: number;
            entertainment: number;
            fiduciaryFee: number;
            personal: number;
            roomAndBoard: number;
        }
    };
    income: {
        deposits: number[];
        lumpSum: number[];
        otherIncome: {amount: number, description: string;}[];
        receivedFromSs: {monthlyAmount: number, months: number;}[];
        receivedFromVa: {monthlyAmount: number, months: number;}[];
    };
}
export interface FastSchema {
    endDate: string;
    fastAccountingId: number;
    fastAccountingName: string;
    fidUserEmail: string;
    fidUserName: string;
    fileNumber: number;
    lastUpdatedDate: string;
    monetaryRecord: FastRecordSchema;
    startDate: string;
    startingBalance: number;
    submittedDate: string;
}