import {MongoClientLike} from "./client";
import {DeleteOptions, DeleteResult, Document} from 'mongodb'
import {Predicate} from "./utils";

export declare function deleteBy<TSchema extends Document>(client: MongoClientLike, databaseName: string, collectionName: string, predicate: Predicate<DeleteOptions, TSchema>): Promise<DeleteResult>;
export declare function deleteBy<TSchema extends Document>(client: MongoClientLike, databaseName: string, collectionName: string): (predicate: Predicate<DeleteOptions, TSchema>) => Promise<DeleteResult>;
export declare function deleteBy<TSchema extends Document>(client: MongoClientLike, databaseName: string): (collectionName: string) => (predicate: Predicate<DeleteOptions, TSchema>) => Promise<DeleteResult>;
export declare function deleteBy<TSchema extends Document>(client: MongoClientLike, databaseName: string): (collectionName: string, predicate: Predicate<DeleteOptions, TSchema>) => Promise<DeleteResult>;
export declare function deleteBy<TSchema extends Document>(client: MongoClientLike): (databaseName: string) => (collectionName: string) => (predicate: Predicate<DeleteOptions, TSchema>) => Promise<DeleteResult>;
