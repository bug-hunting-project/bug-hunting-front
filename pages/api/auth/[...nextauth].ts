import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";


export default NextAuth({
    providers: [
        CredentialsProvider({
            name: "Sign",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "Press your ID" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                const user = { id: 1, name: "J Smith", email: "jsmith@example.com" }
                const user2 = { id: 2, name: "Smith", email: "1234" }

                if (user) {
                    return user
                } else {
                    return null
                }
            }
        })
    ]
})