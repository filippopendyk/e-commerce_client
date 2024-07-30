import passport, { use } from "passport";
import { Strategy } from "passport-local";
import { selectUser } from "../db";

passport.use(
    new Strategy((username, password, done) => {
        const user = selectUser(username);
    })
)