export interface ILoginTracker 
{
    isAuthenticated: boolean,
    isExternalLogger: boolean,
    isEmailConfirmed: boolean,
    isSubscriber: boolean,
    isLoggedInFromAnotherDevice: boolean,
    isVerificationCodesent: boolean
}