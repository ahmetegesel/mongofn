import {Document, InsertOneResult, ModifyResult, OptionalUnlessRequiredId} from "mongodb";
import {MongoClientLike} from "./client";

type UpsertResult<TSchema extends Document = Document> = InsertOneResult<TSchema> | ModifyResult<TSchema>

type UpsertDocument<TSchema extends Document = Document> = OptionalUnlessRequiredId<TSchema> | TSchema

declare function upsert<TSchema extends Document = Document>(client: MongoClientLike, databaseName: string, collectionName: string, doc: UpsertDocument): Promise<UpsertResult<TSchema>>;
declare function upsert<TSchema extends Document = Document>(client: MongoClientLike, databaseName: string, collectionName: string): (doc: UpsertDocument) => Promise<UpsertResult<TSchema>>;
declare function upsert<TSchema extends Document = Document>(client: MongoClientLike, databaseName: string): (collectionName: string) => (doc: UpsertDocument) => Promise<UpsertResult<TSchema>>;
declare function upsert<TSchema extends Document = Document>(client: MongoClientLike): (databaseName: string) => (collectionName: string) => (doc: UpsertDocument) => Promise<UpsertResult<TSchema>>;

export default upsert;