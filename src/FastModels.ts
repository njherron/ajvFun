
export interface FastMonetaryRecordV01 {
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
export interface FastRecordV01 {
    endDate: string;
    fastAccountingId: number;
    fastAccountingName: string;
    fidUserEmail: string;
    fidUserName: string;
    fileNumber: number;
    lastUpdatedDate: string;
    monetaryRecord: FastMonetaryRecordV01;
    startDate: string;
    startingBalance: number;
    submittedDate: string;
}

export interface FastMonetaryRecordV02 {
    assets : {type:string, amount?:number, serialNumber?:string, description?:string}[];
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
    income: {type:string, amount:number, description?:string, months?:number}[]
}

export interface FastRecordV02 {
    endDate: string;
    fastAccountingId: number;
    fastAccountingName: string;
    fidUserEmail: string;
    fidUserName: string;
    fileNumber: number;
    lastUpdatedDate: string;
    monetaryRecord: FastMonetaryRecordV02;
    startDate: string;
    startingBalance: number;
    submittedDate: string;
}