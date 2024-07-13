import  "next-auth";
declare module 'next-auth'{
    interface User{
        _id?: string,
        isVerified:boolean,
        isAcceptingMessages?:boolean,
        username?:string
    }
    interface Session{
        user:{
                _id?: string,
                isVerified:boolean,
                isAcceptingMessages?:boolean,
                username?:string
            } & DefaultSession['user']
    }
}
//We can also create the interface by directly from the module

declare module 'next-auth/jwt'{
    interface JWT{
        _id?: string,
        isVerified:boolean,
        isAcceptingMessages?:boolean,
        username?:string
    }
}