import { Designation } from "./designation";
import { Role } from "./role";

export class Account {
    constructor(
        public token: string,
        public user: {
            id: number,
            userId: string,
            fullName: string, 
            role: Role,
            profilePic: any,
            designation: Designation
        }
    ) { }
}