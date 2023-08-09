import {MongoClientLike} from "./client";
import {Collection} from "mongodb";

export declare function useCollection<TSchema>(client: MongoClientLike, databaseName: string, collectionName: string): Promise<Collection<TSchema>>
export declare function useCollection<TSchema>(client: MongoClientLike, databaseName: string): (collectionName: string) => Promise<Collection<TSchema>>
export declare function useCollection<TSchema>(client: MongoClientLike): (databaseName: string, collectionName: string) => Promise<Collection<TSchema>>
export declare function useCollection<TSchema>(client: MongoClientLike): (databaseName: string) => (collectionName: string) => Promise<Collection<TSchema>>


export default useCollection;