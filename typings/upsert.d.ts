import {OptionalUnlessRequiredId, WithId} from "mongodb";
import {MongoClientLike} from "./client";

type UpsertDocument<TSchema> = OptionalUnlessRequiredId<TSchema> | TSchema

export declare function upsert<TSchema>(client: MongoClientLike, databaseName: string, collectionName: string, doc: UpsertDocument<TSchema>): Promise<WithId<TSchema>>;
export declare function upsert<TSchema>(client: MongoClientLike, databaseName: string, collectionName: string): (doc: UpsertDocument<TSchema>) => Promise<WithId<TSchema>>;
export declare function upsert<TSchema>(client: MongoClientLike, databaseName: string): (collectionName: string) => (doc: UpsertDocument<TSchema>) => Promise<WithId<TSchema>>;
export declare function upsert<TSchema>(client: MongoClientLike, databaseName: string): (collectionName: string, doc: UpsertDocument<TSchema>) => Promise<WithId<TSchema>>;
export declare function upsert<TSchema>(client: MongoClientLike): (databaseName: string) => (collectionName: string) => (doc: UpsertDocument<TSchema>) => Promise<WithId<TSchema>>;

export default upsert;