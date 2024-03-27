import { Role } from "src/role.enum";

export class SignupDto {
    email: string;
    password: string;
    roles: Role[];
}