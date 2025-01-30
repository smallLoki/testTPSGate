import { scryptSync } from 'crypto';
import connection from "../db";
import User from "../models/user.model";
import Login from "../models/login.model";
import { SECRET_KEY } from "../middleware/auth";




interface IAuthRepository {
    loginAdmin(auth: Login): Promise<User[]>;
}

class AuthRepository implements IAuthRepository {

    loginAdmin(auth: Login): Promise<User[]> {
        return new Promise((resolve, reject) => {
            const { email, password } = auth;
            const pass = scryptSync(password, SECRET_KEY.toString(), 32).toString('hex');
            connection.query<User[]>(
                `SELECT
                     id,
                     email
                    FROM users
                    WHERE email = ?
                      AND password = ?`,
                [email, pass],
                (err, res) => {
                    if (err) reject(err);
                    else resolve(res);
                }
            );
        });
    }
}

export default new AuthRepository();
