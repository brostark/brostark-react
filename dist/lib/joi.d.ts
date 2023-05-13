import Joi from "joi";
export interface JoiStringExtend extends Joi.StringSchema {
    minOfUppercase(min: number): this;
    minOfLowercase(min: number): this;
    minOfSpecialCharacters(min: number): this;
    minOfNumeric(min: number): this;
    noWhiteSpaces(): this;
}
export interface JoiPasswordExtend extends Omit<Joi.Root, "string"> {
    string(): JoiStringExtend;
}
export declare const joiPasswordExtension: (joi: Joi.Root) => {
    type: string;
    base: Joi.StringSchema<string>;
    messages: {
        "password.minOfUppercase": string;
        "password.minOfSpecialCharacters": string;
        "password.minOfLowercase": string;
        "password.minOfNumeric": string;
        "password.noWhiteSpaces": string;
    };
    rules: {
        minOfUppercase: {
            method(min: any): any;
            args: {
                name: string;
                assert: (value: any) => boolean;
                message: string;
            }[];
            validate: (value: string, helpers: Joi.CustomHelpers, { min }: any) => string | Joi.ErrorReport;
        };
        minOfLowercase: {
            method(min: any): any;
            args: {
                name: string;
                assert: (value: any) => boolean;
                message: string;
            }[];
            validate: (value: string, helpers: Joi.CustomHelpers, { min }: any) => string | Joi.ErrorReport;
        };
        minOfSpecialCharacters: {
            method(min: any): any;
            args: {
                name: string;
                assert: (value: any) => boolean;
                message: string;
            }[];
            validate: (value: string, helpers: Joi.CustomHelpers, { min }: any) => string | Joi.ErrorReport;
        };
        minOfNumeric: {
            method(min: any): any;
            args: {
                name: string;
                assert: (value: any) => boolean;
                message: string;
            }[];
            validate: (value: string, helpers: Joi.CustomHelpers, { min }: any) => string | Joi.ErrorReport;
        };
        noWhiteSpaces: {
            validate: (value: string, helpers: Joi.CustomHelpers) => string | Joi.ErrorReport;
        };
    };
};
export declare const JoiPassword: JoiPasswordExtend;
//# sourceMappingURL=joi.d.ts.map