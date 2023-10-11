import { getCookie } from "@/app/actions";
import { UserCookieKey } from "./constants";
import { objectHasUndefinedValue, objectIsEmpty } from ".";

export async function userIsLoggedIn(){
  const userFromCookies = await getCookie(UserCookieKey)
  let res = Boolean(userFromCookies)

  if(!res) return false;
  if(objectHasUndefinedValue(userFromCookies!)) return false;
  if(objectIsEmpty(userFromCookies!)) return false;
  
  return true
}