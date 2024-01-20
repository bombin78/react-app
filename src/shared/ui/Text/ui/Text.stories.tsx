import React from 'react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {
    Text,
    TextSize,
    TextTheme,
} from './Text';

export default {
    title: 'shared/Text',
    component: Text,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Text>;

const Template: ComponentStory<typeof Text> = (args) => <Text {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    title: 'Some kind of title text',
    text: `
		A lot of some paragraph text text text text text text text text text
		text text text text text text text text text text text text text text
		text text text text text text text text text text text text text text
		text text text text text text text text text text text text text text
		text text text text text text text text text text text text text text
	`,
};

export const Error = Template.bind({});
Error.args = {
    title: 'Some kind of title text',
    text: `
		A lot of some paragraph text text text text text text text text text
		text text text text text text text text text text text text text text
		text text text text text text text text text text text text text text
		text text text text text text text text text text text text text text
		text text text text text text text text text text text text text text
	`,
    theme: TextTheme.ERROR,
};

export const OnlyTitle = Template.bind({});
OnlyTitle.args = {
    title: 'Some kind of title text',
};

export const OnlyText = Template.bind({});
OnlyText.args = {
    text: `
		A lot of some paragraph text text text text text text text text text
		text text text text text text text text text text text text text text
		text text text text text text text text text text text text text text
		text text text text text text text text text text text text text text
		text text text text text text text text text text text text text text
	`,
};

export const PrimaryDark = Template.bind({});
PrimaryDark.args = {
    title: 'Some kind of title text',
    text: `
		A lot of some paragraph text text text text text text text text text
		text text text text text text text text text text text text text text
		text text text text text text text text text text text text text text
		text text text text text text text text text text text text text text
		text text text text text text text text text text text text text text
	`,
};
PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)];

export const OnlyTitleDark = Template.bind({});
OnlyTitleDark.args = {
    title: 'Some kind of title text',
};
OnlyTitleDark.decorators = [ThemeDecorator(Theme.DARK)];

export const OnlyTextDark = Template.bind({});
OnlyTextDark.args = {
    text: `
		A lot of some paragraph text text text text text text text text text
		text text text text text text text text text text text text text text
		text text text text text text text text text text text text text text
		text text text text text text text text text text text text text text
		text text text text text text text text text text text text text text
	`,
};
OnlyTextDark.decorators = [ThemeDecorator(Theme.DARK)];

export const SizeL = Template.bind({});
SizeL.args = {
    title: 'Some kind of title text',
    text: `
		A lot of some paragraph text text text text text text text text text
		text text text text text text text text text text text text text text
		text text text text text text text text text text text text text text
		text text text text text text text text text text text text text text
		text text text text text text text text text text text text text text
	`,
    size: TextSize.L,
};

export const SizeM = Template.bind({});
SizeM.args = {
    title: 'Some kind of title text',
    text: `
		A lot of some paragraph text text text text text text text text text
		text text text text text text text text text text text text text text
		text text text text text text text text text text text text text text
		text text text text text text text text text text text text text text
		text text text text text text text text text text text text text text
	`,
    size: TextSize.M,
};

export const SizeS = Template.bind({});
SizeS.args = {
    title: 'Some kind of title text',
    text: `
		A lot of some paragraph text text text text text text text text text
		text text text text text text text text text text text text text text
		text text text text text text text text text text text text text text
		text text text text text text text text text text text text text text
		text text text text text text text text text text text text text text
	`,
    size: TextSize.S,
};
