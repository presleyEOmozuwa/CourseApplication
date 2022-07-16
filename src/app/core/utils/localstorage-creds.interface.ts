import { JwtHelperService } from "@auth0/angular-jwt";
import { ILocalStoreToken } from "../models/localstorage-token.interface";

export function localStoreToken(){
   const helper = new JwtHelperService();
   const localStore: any = localStorage.getItem('token');
   const decode: any = helper.decodeToken(localStore);
   const localToken : ILocalStoreToken = {
    nameid: decode.nameid,
    family_name : decode.family_name,
    given_name: decode.given_name,
    name: decode.name,
    email: decode.email
   }
   return localToken;
}