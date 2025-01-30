import connection from "../db";
import User from "../models/user.model";
import {OkPacket} from 'mysql2';

interface ICalendarRepository {
    retrieveAll(searchParams?: {title: string, published: boolean}): Promise<User[]>;
}

class CalendarRepository implements ICalendarRepository {

    retrieveAll(): Promise<User[]> {
        let query: string = "SELECT * FROM dates";
        return new Promise((resolve, reject) => {
            connection.query<any[]>(query, (err, res) => {
                if (err) reject(err);
                else resolve(res);
            });
        });
    }

    retrieveAccessAll(): Promise<User[]> {
      let d = new Date( );
      const day = d.getDay();
      const hours = d.getHours();
      const minutes = d.getMinutes();
      const seconds = d.getSeconds();
      const nowTime = (( (hours * 60) + minutes ) * 60 + seconds ) * 1000;


      let query: string = `SELECT day FROM dates
            WHERE id = ${day} AND (
                (start_time < ${nowTime} AND end_time > ${nowTime}) OR
                (start_time > ${nowTime} AND end_time < ${nowTime})
              )`;
        return new Promise((resolve, reject) => {
            connection.query<any[]>(query, (err, res) => {
                if (err) reject(err);
                else {
                  if (res.length) {
                    let query: string = "SELECT * FROM dates";
                    connection.query<any[]>(query, (err, res) => {
                      if (err) reject(err);
                      else resolve(res);
                    });
                  } else resolve(res);
                }
            });
        });
    }

  changeRow(body?: any): Promise<User[]> {
      return new Promise((resolve, reject) => {
        let query = `UPDATE dates
            SET start_time = ?, end_time = ? WHERE id = ?;`;

        connection.query<OkPacket>(
          query,
          [ body.startTime , body.endTime , body.id ],
          (err, res) => {
            if (err) reject(err);
            else { // @ts-ignore
              resolve(res.affectedRows);
            }
          }
        );
      });
    }
}

export default new CalendarRepository();
