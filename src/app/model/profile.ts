import {Avatar} from './avatar';

export interface Profile{
  id: number;
  firstName: string;
  lastName: string;
  displayName: string;
  bio: string;
  avatar: Avatar;
}
