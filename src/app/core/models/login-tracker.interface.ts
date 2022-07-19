export interface ILoginTracker 
{
    userId: string;
    isAuthenticated: boolean;
    isExternalLogger: boolean;
    isEmailConfirmed: boolean;
    isSubscriber: boolean;
    isLoggedInFromAnotherDevice: boolean;
    isVerificationCodeSent: boolean;
    isAccountDeleted: boolean;
    isEmailInvalid: boolean;
    isPasswordInvalid: boolean;
    isAuthCodeValidationSuccessful: boolean;
}