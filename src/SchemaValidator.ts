import Ajv, {_, Code, ErrorObject, JSONSchemaType, KeywordCxt, ValidateFunction} from "ajv";
import addFormats from 'ajv-formats'
import ajvErrors from 'ajv-errors'
import {FastMonetaryRecordV01, FastRecordV01} from "./FastModels";
import {error} from "ajv/dist/vocabularies/applicator/dependencies";
import {DataValidateFunction, DataValidationCxt} from "ajv/dist/types";
import {fastSchemaV01} from "./Schemas";

export class SchemaValidator {

    goodData = {
        foo: 1,
        bar: "abc"
    };

    badData = {
        foo: 1,
        bar: 1
    };

    private readonly ajv: Ajv;

    constructor() {
        this.ajv = new Ajv({allErrors: true});
        addFormats(this.ajv);
        ajvErrors(this.ajv);
        this.addKeywords();
    }

    basicValidation = (data) => {
        const schema = {
            type: 'object',
            properties: {
                foo: {type: 'integer'},
                bar: {type: 'string'}
            },
            required: ['foo'],
            additionalProperties: false
        }

        const validate = this.ajv.compile(schema);

        console.log('Data being validated:');
        console.log(data);

        const valid = validate(data);
        if (!valid) console.log(validate.errors);
    }

    private addKeywords = () => {
        this.ajv.addKeyword({
            keyword: 'pastDate',
            validate: (schema, data) => {
                if (!schema) return false;
                //todo schema value here should indicate the upper bound of what makes data valid
                //  for instance if schema == '$NOW$' then we should compare data to the Date representation of
                //  "right now". schema could also be a static date in the data format, or a path to another schema
                //  property value?
                if (schema === '$NOW$') {
                    let d = new Date(data);
                    console.log(d);
                    let today = new Date();
                    return today > d;
                }
                return false;
            },
            errors: true
        });

        /**
         * The 'after' keyword expects a schema that is a sibling property or a date in full-date format yyyy-mm-dd
         */
        this.ajv.addKeyword({
            keyword: 'after',
            validate: (schema: string, data, parentSchema, dataCx: DataValidationCxt<string>) => {
                if (!schema) return false;
                //check schema for what property of the parent scope we are asserting data is after
                let valid = true;
                const token = schema.split('$')
                if (token.length > 1) {
                    console.log('checking if after: ' + token[1]);
                    let lhs = new Date(data);
                    let rhs = new Date(dataCx.parentData[token[1]]);
                    valid = lhs > rhs;
                } else {
                    console.log('checking if after: ' + schema);
                    let lhs = new Date(data);
                    let rhs = new Date(schema);
                    valid = lhs > rhs;
                }
                console.log(schema)
                console.log(data)
                console.log(parentSchema)
                console.log(dataCx.parentData[token[1]])
                //assert data is after property in schema
                //return assertion
                return valid;
            }
        })
    }

    keywordValidation = (data, schema): {valid:boolean, validate:ValidateFunction} => {
        const validate = this.ajv.compile(schema);
        const valid = validate(data);
        console.log(`Is valid: ${valid}`);
        if (!valid) {
            const errors = validate.errors;
            if (errors && errors.length > 0) {
                for (const errorsKey of errors) {
                    if (errorsKey.keyword === 'errorMessage') {
                        console.log(errorsKey.message);
                        if (errorsKey.params.errors && errorsKey.params.errors.length > 0) {
                            for (const error of errorsKey.params.errors) {
                                console.log(`Validation failed for ${error.instancePath} due to ${error.keyword}`);
                            }
                        }
                    }
                }
            }
            console.log(validate.errors);
        }
        return {valid, validate};
    }

    validationFromCodeGeneration = (data) => {
        this.ajv.addKeyword({
            keyword: 'pastDate',
            type: 'string',
            code(ctx: KeywordCxt) {
                const {data, schema} = ctx
                console.log(ctx)
                console.log('generated code validation for "pastDate"')
                console.log(schema)
                console.log(data)
                let now = Date.now();
                console.log(_`${data}`)
                let d = new Date(data.toString()).getDate();
                let code: Code = _`${now} < ${d}`;
                console.log(code);
                console.log(ctx.it.dataNames)
                ctx.pass(code);
            }
        });

        const validate = this.ajv.compile(fastSchemaV01);
        let valid = validate(data);
        console.log(valid);
        console.log(validate.errors);
    }

}