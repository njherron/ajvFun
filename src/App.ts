import {SchemaValidator} from "./SchemaValidator";

let validator = new SchemaValidator();

validator.basicValidation(validator.goodData);
validator.basicValidation(validator.badData);

const data: unknown = {
    endDate: '2023-10-05',
    fastAccountingId: 1234,
    fastAccountingName: 'This is the name of the Account.',
    fidUserEmail: 'bigJohn@email.com',
    fidUserName: 'BigJohn85',
    fileNumber: 999822110,
    lastUpdatedDate: '2023-11-10',
    monetaryRecord: {},
    startDate: '2022-10-05',
    startingBalance: 1234.56,
    submittedDate: '2023-10-10'
}

// validator.keywordValidation(data);
validator.keywordValidation(data);
