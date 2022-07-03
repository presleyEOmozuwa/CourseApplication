import { IUser } from "../models/current-user.interface";
import { IToken } from "../models/token.interface";
import { JwtHelperService } from "@auth0/angular-jwt";
import { IDecodeToken } from "../models/decode-token.interface";

export function authUser(val: IToken, logger: IUser): void{
    const helper = new JwtHelperService();
    const decodedToken: IDecodeToken = helper.decodeToken(val.token.result);
    logger.nameid = decodedToken.nameid;
    logger.family_name = decodedToken.family_name;
    logger.given_name = decodedToken.given_name;
    logger.unique_name = decodedToken.unique_name;
    logger.email = decodedToken.email;
    logger.isSubscriber = val.response.isSubscriber;
    logger.isAuthenticated = val.response.isAuthenticated;
    logger.isExternalLogger = val.response.isExternalLogger;
    logger.isEmailConfirmed = val.response.isEmailConfirmed;
}