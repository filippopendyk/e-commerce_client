import passport from "passport";
import { Strategy } from "passport-local";
import { selectUserDetails, selectUser } from "../db/index.js"; // Explicitly specify the file

passport.serializeUser((user, done) => {
    console.log("Inside serialize user");
    console.log(user);
    done(null, user.username);
});

passport.deserializeUser(async (username, done) => {
    console.log("Inside deserializer");
    console.log(`Deserializing username: ${username}`);
    try {
        const findUser = await selectUser(username);
        const foundUser = findUser.rows[0];
        const foundUsername = foundUser.username;
        if (username !== foundUsername) {
            throw new Error("User not found!");
        }
        done(null, username);
    } catch (err) {
        done(err, null);
    }
})

passport.use(
    new Strategy(async (username, password, done) => {
        console.log(username, password);
        try {
            const findUser = await selectUserDetails(username, password);
            if (!findUser) {
                throw new Error("Invalid Credentials!");
            }
            done(null, findUser);
        } catch (err) {
            done(err, null);
        }
    })
);

export default passport;