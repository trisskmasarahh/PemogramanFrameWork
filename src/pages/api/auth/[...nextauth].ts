import NextAuth, {NextAuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import Email from "next-auth/providers/email";

export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },
    secret:process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                fullname: { label: "Full Name", type: "text" },
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                const user : any = {
                    id: 1,
                    Email: credentials?.email,
                    password: credentials?.password,
                    fullname: credentials?.fullname,
                };
                if (user) {
                    //console.log("user", user);
                    return user;
                } else {
                    return null;
                }
            },
        }),
    ],

    callbacks: {
        async jwt({ token, account, profile, user }:any) {
            if (account?.provider === "credentials" && user) {
                token.email = user.Email;
                token.fullname = user.fullname;

            }
            //console.log("jwt calback", {token, account, profile, user});
            return token;
        },
        async session({ session, token }:any) {
            if (token.email) {
                session.user.email = token.email;
            }
            if(token.fullname){
                session.user.fullname = token.fullname;
            }
            //console.log("session callback", {session, token});
            return session;
        },
    },
};

export default NextAuth(authOptions);