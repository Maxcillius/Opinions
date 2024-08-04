import { getServerSession, NextAuthOptions } from "next-auth";
import { db } from "./db";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import type { Adapter } from "next-auth/adapters";
import { SessionStrategy } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";


export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(db) as Adapter,
    session: {
        strategy: 'jwt' as SessionStrategy
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
              },
              async authorize(credentials, req) {
    
                if(!credentials?.password || !credentials?.username) {
                    return null
                }

                const user = await db.user.findUnique({
                    where: {
                        username: credentials?.username
                    }
                })

                if(credentials?.password !== user?.password) {
                    return null;
                }
          
                if (user) {
                    return user
                } else {
                  return null
                }
              }
        })
    ],
    callbacks: {

        async session({session, token}: any) {

            if(token) {
                session.user.id = token.uid;
                session.user.email = token.email;
                session.user.name = token.name;
                
            }
            return session;
        },

        async jwt({ token, user, profile }): Promise<JWT> {

            token.uid = token.sub

            return token;
        
        },

        redirect() {
            return 'http://localhost:3000'
        }
    },
    secret: process.env.NEXTAUTH_SECRET,
}

export const getAuthSession = () => getServerSession(authOptions);