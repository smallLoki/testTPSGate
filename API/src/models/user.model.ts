import { RowDataPacket } from "mysql2"
import { v4 as uuidv4 } from 'uuid';

export default interface User extends RowDataPacket {
    id?: number;
    password?: string;
    email?: string;
}

export default class User implements RowDataPacket {
    id?: number;
    password?: string;
    email?: string;

    constructor(user: any) {
        this.id = user.id;
        this.email = user.email;
        this.password = user.password;
    }

    public getAuthData(): any {
        const { id, email } = this;
        const now = new Date();
        const end = now.getTime() + 60000000000;
        const payload = {
            sub: id?.toString(),
            email,
            iat: now.getTime(),
            exp: end,
            jti: uuidv4()
        };
        return {
            payload
        }
    }
}
