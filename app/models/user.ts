export interface User {
    user_id: string;
    name: string;
    email: string;
    reservations: Array<any>,
    listings: Array<any>,
    favorite_ids: Array<any>,
    accounts: Array<any>,
    token: string
}