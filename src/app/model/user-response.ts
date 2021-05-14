import {Role} from './role';
import {Profile} from './profile';
import {Session} from './session';

export interface UserResponse{
  id: number;
  email: string;
  active: boolean;
  createdAt: number;
  userRoles: Array<Role>;
  profile: Profile;
  sessions: Array<Session>;
}
