import { UserType } from "../../enums/user-type.enum";

export class CreateUserDto {
    clerkUserId: string;
    role: UserType;
    name: string;
    email: string;
    password: string;
}