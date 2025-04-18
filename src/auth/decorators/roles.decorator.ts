import { SetMetadata } from "@nestjs/common";
import { Role } from "src/user/user.entity";


export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);