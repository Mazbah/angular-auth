import { Designation } from "./designation";
import { Role } from "./role";

export class User {
    constructor(public userId: string,
                public role: Role,
                public token: string,
                public fullName: string,
                public profilePic: any,
                public designation: Designation) {}
}
