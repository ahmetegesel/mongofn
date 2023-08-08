import {WithId} from "mongodb";

export declare function mapResultWith<T>(
  transform: <TItem> (item: TItem | null) => TItem, result: T | T[]
): T | T[] | null
export declare function mapResultWith<T>(
  transform: <TItem> (item: TItem | null) => TItem
): (result: T | T[]) => T | T[] | null

export declare function toModel<TSchema>(doc: Array<WithId<TSchema>>): Array<TSchema>;
export declare function toModel<TSchema>(doc: WithId<TSchema>): TSchema;
export declare function toModel<TSchema>(doc: WithId<TSchema> | null): TSchema | null;

export declare function toDoc<TSchema>(model: TSchema): WithId<TSchema>;