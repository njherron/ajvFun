import {JSONSchemaType} from "ajv/dist/types/json-schema";
import {FastMonetaryRecordV01, FastMonetaryRecordV02, FastRecordV01, FastRecordV02} from "./FastModels";

export const fastRecordSchemaV01: JSONSchemaType<FastMonetaryRecordV01> = {
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
                        },
                    },
                    maxItems: 100
                },
                otherInterest: {
                    type: 'array',
                    items: {
                        type: 'object',
                        required:[],
                        properties: {
                            amount: {type: 'number'},
                            description: {type: 'string'}
                        },
                    },
                    maxItems: 100
                },
                receivedFromSs: {
                    type: 'array',
                    items: {
                        type: 'object',
                        required:[],
                        properties: {
                            monthlyAmount: {type: 'number'},
                            months: {type: 'integer', maximum: 99}
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
                        },
                    },
                    maxItems: 100
                }
            }
        }
    },
    // required: ["assets", "expenses", "income"],
    required: [],
    additionalProperties: false
} as const;

export const fastSchemaV01: JSONSchemaType<FastRecordV01> = {
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
            allOf: [ //provides order of validation
                {format: 'date'},
                {pastDate: '$NOW$'},
                {after: '$startDate'}
            ],
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
        monetaryRecord: fastRecordSchemaV01,
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
    errorMessage: {
        properties: {
            endDate: 'this is custom ${/endDate}'
        }
    }
} as const;


// @ts-ignore
export const fastRecordSchemaV02: JSONSchemaType<FastMonetaryRecordV02> = {
    type: "object",
    properties: {
        assets: {
            type: 'array',
            items: [
                {
                    type: 'object',
                    required: ['type', 'amount', 'serialNumber'],
                    properties: {
                        type: {type: 'string'},
                        amount: {type: 'number'},
                        serialNumber: {type: 'string'}
                    }
                },
                {
                    type: 'object',
                    required: ['type', 'amount'],
                    properties: {
                        type: {type: 'string'},
                        amount: {type: 'number'}
                    }
                },
                {
                    type: 'object',
                    required: ['type', 'amount', 'description'],
                    properties: {
                        type: {type: 'string'},
                        amount: {type: 'number'},
                        description: {type: 'string'}
                    }
                }
            ],
            additionalItems: true
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
            type: 'array',
            items: [
                {
                    type: 'object',
                    required: ['type', 'amount'],
                    properties: {
                        type: {type: 'string'},
                        amount: {type: 'number'}
                    }
                },
                {
                    type: 'object',
                    required: ['type', 'amount', 'description'],
                    properties: {
                        type: {type: 'string'},
                        amount: {type: 'number'},
                        description: {type: 'string'}
                    }
                },
                {
                    type: 'object',
                    required: ['type', 'amount'],
                    properties: {
                        type: {type: 'string'},
                        amount: {
                            type: 'number',
                            minimum: -9999999.99,
                            maximum: 10000000.00
                        },
                        month: {
                            type: 'integer',
                            minimum: 0,
                            maximum: 99
                        },
                    }
                },
            ]
        }
    },
    // required: ["assets", "expenses", "income"],
    required: [],
    additionalProperties: false
} as const;

export const fastSchemaV02: JSONSchemaType<FastRecordV02> = {
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
            allOf: [ //provides order of validation
                {format: 'date'},
                {pastDate: '$NOW$'},
                {after: '$startDate'}
            ],
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
        monetaryRecord: fastRecordSchemaV02,
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
    errorMessage: {
        properties: {
            endDate: 'this is custom ${/endDate}'
        }
    }
} as const;

