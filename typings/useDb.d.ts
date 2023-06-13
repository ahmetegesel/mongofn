import {MongoClientLike} from "./client";
import {Db} from "mongodb";

declare function useDb(client: MongoClientLike, databaseName: string): Promise<Db>
declare function useDb(client: MongoClientLike): (databaseName: string) => Promise<Db>

export default useDb;