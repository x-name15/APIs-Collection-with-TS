import {  Types  } from 'mongoose';
import {  IGenre  } from './genre.interface';
import {  IDeveloper  } from './developer.interface';
import {  IPublisher  } from './publisher.interface';  
import {  IPlatform  } from './platform.interface';
//
export interface IGame {
    title: string;
    genre: Types.ObjectId[] | IGenre[];
    developer: Types.ObjectId[]| IDeveloper[];
    publisher: Types.ObjectId[] | IPublisher[];
    platform: Types.ObjectId[] | IPlatform[];
}
