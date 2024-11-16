import 'next-auth';
import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
    interface Profile {
        _id?: string,
        username?: string,
        isVerified?: boolean,
        picture: string | undefined
    }
    interface User {
        _id?: string,
        username?: string,
        isVerified?: boolean,
        profilePicture: string | undefined
    }
    interface Session {
        user: {
            _id?: string,
            username?: string,
            isVerified?: boolean,
            profilePicture: string | undefined
        } & DefaultSession['user']
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        _id?: string,
        username?: string,
        isVerified?: boolean,
    }
}