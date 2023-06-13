import {MongoClient, MongoClientOptions} from "mongodb";

declare function createClient(connectionString: string, options: MongoClientOptions): Promise<MongoClient>;
declare function useMemoizedClient(connectionString: string, options: MongoClientOptions): Promise<MongoClient>;
declare const DEFAULT_OPTIONS: MongoClientOptions;

declare type MongoClientLike = string| Promise<MongoClient> | MongoClient | (() => Promise<MongoClient>)

export {
    createClient,
    DEFAULT_OPTIONS,
    MongoClientLike,
}