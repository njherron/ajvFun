import {SchemaValidator} from "../src/SchemaValidator";
import {fastSchemaV01} from "../src/Schemas";

const data: unknown = {
    endDate: '2023-10-11',
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
describe('Validation Schemes', ()=> {
    test('Schema Version 01', () => {
        let validator = new SchemaValidator();
        const {valid, validate} = validator.keywordValidation(data, fastSchemaV01);
        expect(valid).toBe(true)
        expect(validate.errors).toBe(null)
    })
})