import {MongoClientLike} from "./client";
import {Db} from "mongodb";

export declare function useDb(client: MongoClientLike, databaseName: string): Promise<Db>
export declare function useDb(client: MongoClientLike): (databaseName: string) => Promise<Db>

export default useDb;