import {Document, WithId} from "mongodb";

type MongoDocument<TSchema extends { [key: string]: any } = Document> = TSchema | WithId<TSchema>;

export declare function mapResultWith<TSchema extends MongoDocument>(
  transform: <TItem extends Document> (item: TItem | null) => TItem, result: MongoDocument<TSchema> | MongoDocument<TSchema>[]
): TSchema | TSchema[] | null
export declare function mapResultWith<TSchema extends MongoDocument>(
  transform: <TItem extends Document> (item: TItem | null) => TItem
): (result: MongoDocument<TSchema> | MongoDocument<TSchema>[]) => TSchema | TSchema[] | null

export declare function toModel<TSchema>(doc: WithId<TSchema> | null): TSchema | null;
export declare function toModel<TSchema>(doc: Array<WithId<TSchema>> | null): Array<TSchema> | null;
export declare function toModel<TSchema>(doc: TSchema | null): TSchema | null;

export declare function toDoc<TSchema extends Document>(model: TSchema): WithId<TSchema>;