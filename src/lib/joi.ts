import Joi, { Schema } from "joi";

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

export const joiPasswordExtension = (joi: Joi.Root) => {
  return {
    type: "string",
    base: joi.string(),
    messages: {
      "password.minOfUppercase": "{#label} should contain at least {#min} uppercase character",
      "password.minOfSpecialCharacters": "{#label} should contain at least {#min} special character",
      "password.minOfLowercase": "{#label} should contain at least {#min} lowercase character",
      "password.minOfNumeric": "{#label} should contain at least {#min} numeric character",
      "password.noWhiteSpaces": "{#label} should not contain white spaces",
      // "password.notIncludeWith": "{#label} should not include {#field}",
    },
    rules: {
      minOfUppercase: {
        method(min: any) {
          return (this as any).$_addRule({
            name: "minOfUppercase",
            args: { min },
          });
        },
        args: [
          {
            name: "min",
            assert: (value: any) => typeof value === "number" && !isNaN(value),
            message: "must be a number",
          },
        ],
        validate: (value: string, helpers: Joi.CustomHelpers, { min = 0 }: any) => {
          if (!new RegExp(`(?=(.*[A-Z]){${min}})`).test(value))
            return helpers.error("password.minOfUppercase", { min });

          return value;
        },
      },
      minOfLowercase: {
        method(min: any) {
          return (this as any).$_addRule({
            name: "minOfLowercase",
            args: { min },
          });
        },
        args: [
          {
            name: "min",
            assert: (value: any) => typeof value === "number" && !isNaN(value),
            message: "must be a number",
          },
        ],
        validate: (value: string, helpers: Joi.CustomHelpers, { min = 0 }: any) => {
          if (!new RegExp(`(?=(.*[a-z]){${min}})`).test(value))
            return helpers.error("password.minOfLowercase", { min });

          return value;
        },
      },

      minOfSpecialCharacters: {
        method(min: any) {
          return (this as any).$_addRule({
            name: "minOfSpecialCharacters",
            args: { min },
          });
        },
        args: [
          {
            name: "min",
            assert: (value: any) => typeof value === "number" && !isNaN(value),
            message: "must be a number",
          },
        ],
        validate: (value: string, helpers: Joi.CustomHelpers, { min = 0 }: any) => {
          const numSpecial = value.length - (value.match(/[a-zA-Z0-9]/g) || []).length;
          if (numSpecial < min)
            return helpers.error("password.minOfSpecialCharacters", {
              min,
            });

          return value;
        },
      },
      minOfNumeric: {
        method(min: any) {
          return (this as any).$_addRule({
            name: "minOfNumeric",
            args: { min },
          });
        },
        args: [
          {
            name: "min",
            assert: (value: any) => typeof value === "number" && !isNaN(value),
            message: "must be a number",
          },
        ],
        validate: (value: string, helpers: Joi.CustomHelpers, { min = 0 }: any) => {
          if (!new RegExp(`(?=(.*[0-9]){${min}})`, "g").test(value))
            return helpers.error("password.minOfNumeric", { min });

          return value;
        },
      },
      noWhiteSpaces: {
        validate: (value: string, helpers: Joi.CustomHelpers) => {
          if (new RegExp(` `, "g").test(value)) return helpers.error("password.noWhiteSpaces");

          return value;
        },
      },
    },
  };
}

export const JoiPassword = Joi.extend(joiPasswordExtension) as JoiPasswordExtend;
