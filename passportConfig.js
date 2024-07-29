const LocalStrategy = require("passport-local");
const bcrypt = require("bcrypt");
const db = require("./db/index");
const { comparePasswords } = require("./helpers");

module.exports = (passport) => {
    passport.use(
        "local-signup",
        new LocalStrategy(
            {
                usernameField: "email",
                passwordField: "password",
                passReqToCallback: true,
            },
            async (req, email, password, done) => {
                try {
                    const userExists = await db.selectUser(email);

                    if (userExists) {
                        return done(null, false);
                    }

                    const user = await db.createUser(req.body.username, password, email);
                    return done(null, user);
                } catch (error) {
                    return done(error);
                }
            }
        )
    );

    passport.use(
        "local-login",
        new LocalStrategy(
            {
                usernameField: "email",
                passwordField: "password",
            },
            async (email, password, done) => {
                try {
                    const user = await db.selectUser(email);
                    if (!user) return done(null, false);

                    const isMatch = await comparePasswords(password, user.password);
                    if (!isMatch) return done(null, false);

                    return done(null, { id: user.id, email: user.email, username: user.username });
                } catch (error) {
                    return done(error);
                }
            }
        )
    );
};
