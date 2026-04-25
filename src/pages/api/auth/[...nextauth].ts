import { signIn, signInWithGoogle } from "@/utils/db/servicefirebase";
import NextAuth, {NextAuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
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
                //fullname: { label: "Full Name", type: "text" },
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },

            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null;

                const user: any = await signIn(credentials.email);
                
                if(user){
                    const isPasswordValid = await bcrypt.compare(
                        credentials.password,
                        user.password,
                    );
                    if(isPasswordValid){
                        //pasrikan mengambalikan object user yang bersih 
                        return{
                            id: user.id,
                            email: user.email,
                            fullname:user.fullname,
                            role: user.role,
                        };
                    }
                }
                return null;
            },
        }),
        GoogleProvider({
            clientId : process.env.GOOGLE_CLIENT_ID || "",
            clientSecret :process.env.GOOGLE_CLIENT_SECRET || "",
        }),GitHubProvider({
            clientId : process.env.GITHUB_CLIENT_ID || "",
            clientSecret :process.env.GITHUB_CLIENT_SECRET || "",
        }),

    ],

    callbacks: {
        async jwt({ token, account, profile, user }: any) {
            if (account?.provider === "credentials" && user) {
                token.email = user.Email;
                token.fullname = user.fullname;
                token.role = user.role;
                console.log("=== JWT Callback ===", {
                    Email: token.email,
                    fullname: token.fullname,
                    role: token.role,
                });
            }
            //Jika login dengan google, tambhkan informasi yang diperlukanke token
            if (account?.provider === "google" || account?.provider === "github") {
                const data = {
                    fullname: user.name,
                    email: user.email,
                    image: user.image,
                    type: account.provider,
                };
                await signInWithGoogle(data, (result: any)=>{
                if (result.status){
                token.fullname = data.fullname;
                token.email = data.email;
                token. image = data.image;
                token. type = data.type;
                token.role = result.data.role;
                }
                
            });
        }
        
            return token;
    },
        async session({ session, token }: any) {
            if (token.email) {
                session.user.email = token.email;
            }
            if(token.fullname){
                session.user.fullname = token.fullname;
            }
            if (token.image){
                session.user.image = token.image;
            }
            if(token.role){
                session.user.role = token.role;
            }
            if (token.type){
                session.user.type = token.type;
            }
            console.log("=== session callback ===", session.user);
            return session;
        },
    },
    
    pages:{
        signIn:"/auth/login",
    },
};

export default NextAuth(authOptions);