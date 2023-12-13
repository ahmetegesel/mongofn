import { EnhancedOmit, WithId } from "mongodb";

export declare function mapResultWith<T, TItem, PItem>(
    transform:  (item: TItem | null) => PItem  | null, result: T[]
): PItem[] | null
export declare function mapResultWith<T,TItem, PItem>(
    transform:  (item: TItem | null) => PItem  | null, result: T
):  PItem | null
export declare function mapResultWith<T,TItem, PItem>(
    transform: (item: TItem | null) => PItem | null
): (result: T ) =>  PItem | null
export declare function mapResultWith<T,TItem, PItem>(
    transform: (item: TItem | null) => PItem | null
): (result: T []) =>  PItem[] | null

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

export declare type WithModelId<TSchema> = EnhancedOmit<TSchema, '_id'> & {
    id: InferModelIdType<TSchema>;
};

export declare type DistributeModelIdOverUnions<T> = T extends any ? WithModelId<T> : never;

type IsUnion<T, U extends T = T> =
    T extends unknown ? [U] extends [T] ? false : true : false;

export declare function toModel<TSchema>(doc: Array<WithId<TSchema>>): IsUnion<TSchema> extends true ? Array<DistributeModelIdOverUnions<TSchema>> : Array<WithModelId<TSchema>>;
export declare function toModel<TSchema>(doc: Array<WithId<TSchema>> | null): IsUnion<TSchema> extends true ? Array<DistributeModelIdOverUnions<TSchema>> :Array<WithModelId<TSchema>> | null;
export declare function toModel<TSchema>(doc: WithId<TSchema>): IsUnion<TSchema> extends true ? DistributeModelIdOverUnions<TSchema> : WithModelId<TSchema>;
export declare function toModel<TSchema>(doc: WithId<TSchema> | null):IsUnion<TSchema> extends true ? DistributeModelIdOverUnions<TSchema> : WithModelId<TSchema> | null;

export declare function toDoc<T>(model: WithModelId<T>): WithId<T>;
export declare function toDoc<T>(model: OptionalUnlessRequiredId<T>): WithId<T>;

export declare function isResultWithoutCount<T>(value: T[] | [T[], number]): value is T[]

export declare function toModelWithCount<T>(value: WithId<T>[] | [WithId<T>[], number]): IsUnion<T> extends true ?
    DistributeModelIdOverUnions<T>[] | [DistributeModelIdOverUnions<T>[], number] :
    WithModelId<T>[] | [WithModelId<T>[], number];
