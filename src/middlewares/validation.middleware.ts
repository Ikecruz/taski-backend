import { plainToInstance } from "class-transformer";
import { ValidationError, validate } from "class-validator";
import { Request, RequestHandler } from "express";
import { logger } from "../utils/logger";
import { sanitize } from "class-sanitizer";
import HttpException from "../utils/exception";
import ErrorMessage from "../enums/validation.error.enums";

type ErrorMessage =  (typeof ErrorMessage)[keyof typeof ErrorMessage]

const dtoValidationMiddleware =
    (
        type: any,
        value: "body" | "query" | "params" = "body",
        message: ErrorMessage,
        skipMissingProperties = false,
        whitelist = true,
        forbidNonWhitelisted = false,
    ): RequestHandler => {
        return (req: Request, res, next) => {
            const dtoObject = plainToInstance(type, req[value])
            validate(dtoObject, {
                skipMissingProperties,
                whitelist,
                forbidNonWhitelisted
            }).then((errors: ValidationError[]) => {
                if (errors.length > 0) {
                    logger.error(errors)
                    next(new HttpException(400, message))
                } else {
                    sanitize(dtoObject)
                    req[value] = dtoObject
                    next()
                }
            })
        }
    }

export default dtoValidationMiddleware