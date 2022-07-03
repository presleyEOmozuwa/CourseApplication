export interface TokenObj{
    result: string;
}

export interface loginTrackers{
    isSubscriber: boolean;
    isAuthenticated: boolean,
    isExternalLogger: boolean,
    isEmailConfirmed: boolean
}

export interface IToken{
   token: TokenObj
   response: loginTrackers
}