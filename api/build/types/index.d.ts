declare module "express-session" {
    interface Session {
        user: {
            id: string;
            username: string;
        };
    }
}
declare global {
    namespace Express {
        interface User {
            id: string;
            username: string;
        }
    }
}
export {};
