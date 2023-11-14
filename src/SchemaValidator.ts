import Ajv, {_, Code, ErrorObject, JSONSchemaType, KeywordCxt} from "ajv";
import addFormats from 'ajv-formats'
import {FastRecordSchema, FastSchema} from "./FastSchema";

export class SchemaValidator {

    goodData = {
        foo: 1,
        bar: "abc"
    };

    badData = {
        foo: 1,
        bar: 1
    };

    fastRecordSchema: JSONSchemaType<FastRecordSchema> = {
        type: "object",
        properties: {
            assets: {
                type: 'object',
                required:[],
                properties: {
                    bonds: {
                        type: 'array',
                        items: {
                            type: 'object',
                            required:[],
                            properties: {
                                amount: {type: 'number'},
                                serialNumber: {type: 'string'}
                            }
                        }
                    },
                    cds: {
                        type: 'array',
                        items: { type: 'number'}
                    },
                    checking: {
                        type: 'array',
                        items: { type: 'number'}
                    },
                    other: {
                        type: 'array',
                        items: {
                            type: 'object',
                            required:[],
                            properties: {
                                amount: {type: 'number'},
                                description: {type: 'string'}
                            }
                        }
                    },
                    savings: {
                        type: 'array',
                        items: { type: 'number'}
                    },
                }
            },
            expenses: {
                type: 'object',
                required:[],
                properties: {
                    spending: {
                        type: 'array',
                        items: {
                            type: 'object',
                            required:[],
                            properties: {
                                amount: {type: 'number'},
                                description: {type: 'string'}
                            }
                        }
                    },
                    summary: {
                        type: 'object',
                        required:[],
                        properties: {
                            clothing: {type: 'number'},
                            dependentSupport: {type: 'number'},
                            entertainment: {type: 'number'},
                            fiduciaryFee: {type: 'number'},
                            personal: {type: 'number'},
                            roomAndBoard: {type: 'number'}
                        }
                    }
                }
            },
            income: {
                type: 'object',
                required:[],
                properties: {
                    deposits: {
                        type: 'array',
                        items: {type: 'number'}
                    },
                    lumpSum: {
                        type: 'array',
                        items: {type: 'number'}
                    },
                    otherIncome: {
                        type: 'array',
                        items: {
                            type: 'object',
                            required:[],
                            properties: {
                                amount: {type: 'number'},
                                description: {type: 'string'}
                            }
                        }
                    },
                    receivedFromSs: {
                        type: 'array',
                        items: {
                            type: 'object',
                            required:[],
                            properties: {
                                monthlyAmount: {type: 'number'},
                                months: {type: 'integer'}
                            }
                        }
                    },
                    receivedFromVa: {
                        type: 'array',
                        items: {
                            type: 'object',
                            required:[],
                            properties: {
                                monthlyAmount: {type: 'number'},
                                months: {type: 'integer'}
                            }
                        }
                    }
                }
            }
        },
        // required: ["assets", "expenses", "income"],
        required: [],
        additionalProperties: false
    };
    //
    fastSchema: JSONSchemaType<FastSchema> = {
        type: 'object',
        required:[
            "endDate",
            "fastAccountingId",
            "fastAccountingName",
            "fidUserEmail",
            "fidUserName",
            "fileNumber",
            "lastUpdatedDate",
            // "monetaryRecord",
            "startDate",
            "startingBalance",
            "submittedDate"
        ],
        properties: {
            endDate: {
                type: 'string',
                format: 'date',
                pastDate: '$NOW$',
                after: '$startDate'
            },
            fastAccountingId: {
                type: 'integer'
            },
            fastAccountingName: {
                type: 'string'
            },
            fidUserEmail: {
                type: 'string'
            },
            fidUserName: {
                type: 'string'
            },
            fileNumber: {
                type: 'integer'
            },
            lastUpdatedDate: {
                type: 'string',
                format: 'date'
            },
            monetaryRecord: this.fastRecordSchema,
            startDate: {
                type: 'string',
                format: 'date',
                pastDate: '$NOW$'
            },
            startingBalance: {
                type: 'number'
            },
            submittedDate: {
                type: 'string',
                format: 'date'
            }
        },
        // pastDate: ['startDate', 'endDate']
    };

    // s: JSONSchemaType<FastRecordSchema> = {
    //     anyOf: [], oneOf: []
    //
    // }

    private readonly ajv: Ajv;


    constructor() {
        this.ajv = new Ajv();
        addFormats(this.ajv);
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
            validate: (schema, data, parentSchema, dataCxt) => {
                console.log('in validate');
                // console.log(schema);
                // console.log(data);
                // console.log(parentSchema)
                // console.log(dataCxt)
                let d = new Date(data);
                console.log(d);
                let today = new Date();
                let valid = today > d;
                // if (!valid) {
                //     let error = {
                //         keyword: 'pastDate',
                //         instancePath: dataCxt?.instancePath,
                //         schemaPath: '',
                //         message: 'should be before today.',
                //         params: {keyword: 'pastDate'}
                //     } as ErrorObject
                //     validate.errors instanceof Array ? validate.errors.push(error) : validate.errors = [error];
                // }
                return valid;
            },
            errors: true
        });

        this.ajv.addKeyword({
            keyword: 'before',
            validate: (schema, data, parentSchema) => {
                if (!schema) return false;
                //check schema for what property of the parent scope we are asserting data is before
                //assert data is before property in schema
                //return assertion
                return false;
            }
        })
    }

    keywordValidation = (data) => {
        const validate = this.ajv.compile(this.fastSchema);
        let valid = validate(data);
        console.log(`Is valid: ${valid}`);
        if (!valid) {
            console.log(validate.errors);
        }
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

        const validate = this.ajv.compile(this.fastSchema);
        let valid = validate(data);
        console.log(valid);
        console.log(validate.errors);
    }

}