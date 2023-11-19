import { User } from 'entities/User';

export enum ArticleBlockType {
	CODE = 'CODE',
	IMAGE = 'IMAGE',
	TEXT = 'TEXT',
}

export interface ArticleBlockBase {
	id: string;
	type: ArticleBlockType;
}

export interface ArticleCodeBlock extends ArticleBlockBase {
	// Дополнительно указываем более конкретный тип,
	// чтобы работал автокомплит
	type: ArticleBlockType.CODE;
	code: string;
}

export interface ArticleImageBlock extends ArticleBlockBase {
	// Дополнительно указываем более конкретный тип,
	// чтобы работал автокомплит
	type: ArticleBlockType.IMAGE;
	src: string;
	title: string;
}

export interface ArticleTextBlock extends ArticleBlockBase {
	// Дополнительно указываем более конкретный тип,
	// чтобы работал автокомплит
	type: ArticleBlockType.TEXT;
	paragraphs: string[];
	title?: string;
}

export type ArticleBlock = ArticleCodeBlock | ArticleImageBlock | ArticleTextBlock;

export enum ArticleType {
	IT = 'IT',
	SCIENCE = 'SCIENCE',
	ECONOMICS = 'ECONOMICS',
}

// В дальнейшем, если ни чего не поменяется, заменить на list и tail
export enum ArticleView {
	BIG = 'BIG',
	SMALL = 'SMALL',
}

export interface Article {
	id: string;
	user: User;
	title: string;
	subtitle: string;
	img: string;
	views: number;
	createdAt: string;
	type: ArticleType[];
	blocks: ArticleBlock[];
}
