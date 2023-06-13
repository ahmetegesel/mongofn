import {MongoClientLike} from "./client";
import {Collection} from "mongodb";

declare function useCollection(client: MongoClientLike, databaseName: string, collectionName: string): Promise<Collection>
declare function useCollection(client: MongoClientLike, databaseName: string): (collectionName: string) => Promise<Collection>
declare function useCollection(client: MongoClientLike): (databaseName: string, collectionName: string) => Promise<Collection>
declare function useCollection(client: MongoClientLike): (databaseName: string) => (collectionName: string) => Promise<Collection>

export default useCollection;