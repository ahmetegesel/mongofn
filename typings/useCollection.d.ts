import {MongoClientLike} from "./client";
import {Collection} from "mongodb";

export declare function useCollection(client: MongoClientLike, databaseName: string, collectionName: string): Promise<Collection>
export declare function useCollection(client: MongoClientLike, databaseName: string): (collectionName: string) => Promise<Collection>
export declare function useCollection(client: MongoClientLike): (databaseName: string, collectionName: string) => Promise<Collection>
export declare function useCollection(client: MongoClientLike): (databaseName: string) => (collectionName: string) => Promise<Collection>

export default useCollection;