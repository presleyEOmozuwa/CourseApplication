export interface IUser 
{
    nameid: string
    family_name: string;
    given_name: string;
    unique_name: string;
    email: string;
    isAuthenticated: boolean;
    isSubscriber: boolean;
    isExternalLogger: boolean;
    isEmailConfirmed: boolean;
}