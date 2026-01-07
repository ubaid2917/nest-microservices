import {UserType} from './enums/user-type.enum';

export type UserContext = {
    clerkUserId: string;
    email: string;
    name: string;
    role: UserType;
    isAdmin: boolean;
    password: string;
}