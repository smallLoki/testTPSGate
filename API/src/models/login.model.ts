import { RowDataPacket } from "mysql2"

export default interface Login extends RowDataPacket {
    email: string;
    password: string;
}
