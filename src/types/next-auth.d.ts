import NextAuth from 'next-auth';
import { JWT as NextAuthJWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface User {
    id: string;
    name: string;
    email: string;
    username?: string;
  }

  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      username?: string;
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id?: string;
    name?: string;
    email?: string;
    username?: string;
  }
}
