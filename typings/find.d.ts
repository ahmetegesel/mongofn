import {MongoClientLike} from "./client";
import {FindOptions, WithId} from "mongodb";
import {Predicate} from "./utils";

type FindResult<TSchema> = WithId<TSchema>[] | [WithId<TSchema>[], number];
type FindIdParams = string | number | [string | number, Pick<FindOptions, "projection">];

declare function findBy<TSchema>(client: MongoClientLike, databaseName: string, collectionName: string, predicate: Predicate<FindOptions, TSchema>): Promise<FindResult<TSchema>>;
declare function findBy<TSchema>(client: MongoClientLike, databaseName: string, collectionName: string): (predicate: Predicate<FindOptions, TSchema>) => Promise<FindResult<TSchema>>;
declare function findBy<TSchema>(client: MongoClientLike, databaseName: string): (collectionName: string) => (predicate: Predicate<FindOptions, TSchema>) => Promise<FindResult<TSchema>>;
declare function findBy<TSchema>(client: MongoClientLike, databaseName: string): (collectionName: string, predicate: Predicate<FindOptions, TSchema>) => Promise<FindResult<TSchema>>;
declare function findBy<TSchema>(client: MongoClientLike): (databaseName: string) => (collectionName: string) => (predicate: Predicate<FindOptions, TSchema>) => Promise<FindResult<TSchema>>;

declare function findById<TSchema>(client: MongoClientLike, databaseName: string, collectionName: string, id: FindIdParams): Promise<WithId<TSchema> | null>;
declare function findById<TSchema>(client: MongoClientLike, databaseName: string, collectionName: string): (id: FindIdParams) => Promise<WithId<TSchema> | null>;
declare function findById<TSchema>(client: MongoClientLike, databaseName: string): (collectionName: string) => (id: FindIdParams) => Promise<WithId<TSchema> | null>;
declare function findById<TSchema>(client: MongoClientLike, databaseName: string): (collectionName: string, id: FindIdParams) => Promise<WithId<TSchema> | null>;
declare function findById<TSchema>(client: MongoClientLike): (databaseName: string) => (collectionName: string) => (id: FindIdParams) => Promise<WithId<TSchema> | null>;

declare function findByObjectId<TSchema>(client: MongoClientLike, databaseName: string, collectionName: string, id: FindIdParams): Promise<WithId<TSchema> | null>;
declare function findByObjectId<TSchema>(client: MongoClientLike, databaseName: string, collectionName: string): (id: FindIdParams) => Promise<WithId<TSchema> | null>;
declare function findByObjectId<TSchema>(client: MongoClientLike, databaseName: string): (collectionName: string) => (id: FindIdParams) => Promise<WithId<TSchema> | null>;
declare function findByObjectId<TSchema>(client: MongoClientLike, databaseName: string): (collectionName: string, id: FindIdParams) => Promise<WithId<TSchema> | null>;
declare function findByObjectId<TSchema>(client: MongoClientLike): (databaseName: string) => (collectionName: string) => (id: FindIdParams) => Promise<WithId<TSchema> | null>;

declare function findAll<TSchema>(client: MongoClientLike, databaseName: string, collectionName: string): Promise<FindResult<TSchema>>;
declare function findAll<TSchema>(client: MongoClientLike, databaseName: string): (collectionName: string) => Promise<FindResult<TSchema>>;
declare function findAll<TSchema>(client: MongoClientLike): (databaseName: string) => (collectionName: string) => Promise<FindResult<TSchema>>;

export {
  findBy,
  findById,
  findByObjectId,
  findAll
}
