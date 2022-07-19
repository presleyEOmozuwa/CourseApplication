import { ILoginTracker } from "../models/login-tracker.interface";


export function loggerHelper(logger: ILoginTracker, res: any) {
    logger.isAuthenticated = res.response.isAuthenticated;
    logger.isEmailConfirmed = res.response.isEmailConfirmed;
    logger.isExternalLogger = res.response.isExternalLogger;
    logger.isSubscriber = res.response.isSubscriber;
    logger.isLoggedInFromAnotherDevice = res.response.isLoggedInFromAnotherDevice;
    logger.isVerificationCodeSent = res.response.isVerificationCodesent;
    logger.userId = res.response.userId;
    logger.isAuthCodeValidationSuccessful = res.response.isAuthCodeValidationSuccessful;
    logger.isAccountDeleted = res.response.isAccountDeleted;
    logger.isEmailInvalid = res.response.isEmailInvalid;
    logger.isPasswordInvalid = res.response.isPasswordInvalid;
}