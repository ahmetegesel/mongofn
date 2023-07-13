import {Document, OptionalUnlessRequiredId} from "mongodb";
import {MongoClientLike} from "./client";

type UpsertDocument<TSchema extends Document = Document> = OptionalUnlessRequiredId<TSchema> | TSchema

export declare function upsert<TSchema extends Document = Document>(client: MongoClientLike, databaseName: string, collectionName: string, doc: UpsertDocument): Promise<TSchema>;
export declare function upsert<TSchema extends Document = Document>(client: MongoClientLike, databaseName: string, collectionName: string): (doc: UpsertDocument) => Promise<TSchema>;
export declare function upsert<TSchema extends Document = Document>(client: MongoClientLike, databaseName: string): (collectionName: string) => (doc: UpsertDocument) => Promise<TSchema>;
export declare function upsert<TSchema extends Document = Document>(client: MongoClientLike, databaseName: string): (collectionName: string, doc: UpsertDocument) => Promise<TSchema>;
export declare function upsert<TSchema extends Document = Document>(client: MongoClientLike): (databaseName: string) => (collectionName: string) => (doc: UpsertDocument) => Promise<TSchema>;

export default upsert;