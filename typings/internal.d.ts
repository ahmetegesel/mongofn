import {EnhancedOmit, WithId} from "mongodb";

export declare function mapResultWith<T>(
  transform: <TItem> (item: TItem | null) => TItem, result: T | T[]
): T | T[] | null
export declare function mapResultWith<T>(
  transform: <TItem> (item: TItem | null) => TItem
): (result: T | T[]) => T | T[] | null

export declare type InferModelIdType<TSchema> = TSchema extends {
    id: infer IdType;
} ? Record<any, never> extends IdType ? never : IdType : TSchema extends {
    id?: infer IdType;
} ? unknown extends IdType ? string : IdType : string;

export declare type OptionalId<TSchema> = EnhancedOmit<TSchema, 'id'> & {
    id?: InferModelIdType<TSchema>;
};

export declare type OptionalUnlessRequiredId<TSchema> = TSchema extends {
    id: any;
} ? TSchema : OptionalId<TSchema>;

export declare function toModel<TSchema>(doc: Array<WithId<TSchema>>): Array<OptionalUnlessRequiredId<TSchema>>;
export declare function toModel<TSchema>(doc: WithId<TSchema>): OptionalUnlessRequiredId<TSchema>;
export declare function toModel<TSchema>(doc: WithId<TSchema> | null): OptionalUnlessRequiredId<TSchema> | null;

export declare function toDoc<T, TSchema>(model: OptionalUnlessRequiredId<T>): WithId<TSchema>;