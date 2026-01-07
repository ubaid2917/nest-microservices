import { SetMetadata } from "@nestjs/common";
import { UserType } from "../enums/user-type.enum";

export const REQUIRED_ROLE_KEY='requiredRole';

export const Admin = () => SetMetadata(REQUIRED_ROLE_KEY, UserType.ADMIN);     