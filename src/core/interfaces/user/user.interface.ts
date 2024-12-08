import { Role } from "../role/role.interface";

export interface User {
    email: string;
    password: string;
    name: string;
    role: Role;
}