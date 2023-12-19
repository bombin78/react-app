// Record<Адрес страницы, позиция скролла от верхнего края страницы>
export type ScrollSchema = Record<string, number>;

export interface UISchema {
	scroll: ScrollSchema;
}
