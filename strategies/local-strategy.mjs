import passport, { use } from "passport";
import { Strategy } from "passport-local";
import { selectUser, selectUserDetails } from "../db";

passport.use(
    new Strategy((username, password, done) => {
        try {
            const findUser = selectUserDetails(username, password);
            if(!findUser){
                throw new Error("Invalid Credentials!");
            }
            done(null, findUser);
        } catch (err) {
            done(err, null)
        }
    })
)