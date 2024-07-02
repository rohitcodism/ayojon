import 'next-auth';

declare module 'next-auth'{
    interface Profile {
        isVerified : boolean,
    }
}