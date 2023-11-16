import { VFC, SVGProps } from 'react';

export interface SidebarItemType {
	path: string;
	Icon: VFC<SVGProps<SVGSVGElement>>;
	text: string;
	authOnly?: boolean;
}
