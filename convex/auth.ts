import GitHub from "@auth/core/providers/github";
import Google from "@auth/core/providers/google";
import { convexAuth } from "@convex-dev/auth/server";
import {Password} from "@convex-dev/auth/providers/Password";
import { DataModel } from "../convex/_generated/dataModel";

const customPassword = Password<DataModel>({
  profile(params){
    return{
      email: params.email as string,
      name: params.name as string,
    }
  }
})

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [ customPassword, GitHub, Google],
});