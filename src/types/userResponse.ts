import { User } from './User';

export interface UserApiResponse {
    data: User[];
    total: number;
    page: number;
    limit: number;
}
