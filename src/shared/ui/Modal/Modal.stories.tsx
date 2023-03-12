import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { Modal } from './Modal';

export default {
    title: 'shared/Modal',
    component: Modal,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = (args) => <Modal {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    isOpen: true,
    children: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Saepe eaque nisi ipsum, sequi at doloremque odio eius dignissimos excepturi ad aliquid cum numquam possimus. Odio doloremque, molestiae rerum, voluptatem neque atque culpa at facilis corporis libero dolores perferendis ut deserunt vitae, magni maxime sequi aperiam repellat. Sed, tempore iure officia distinctio fugiat explicabo quam. Qui aperiam illum, dolore eligendi dolor reprehenderit nesciunt commodi omnis a sunt incidunt optio animi praesentium ipsa temporibus ab molestiae, dolorum, cupiditate reiciendis autem. Sunt dolor molestiae, architecto at iure numquam? Nemo iure ipsa sequi ratione quidem quod saepe iusto optio facere, laboriosam eligendi, assumenda porro?',
};

export const Dark = Template.bind({});
Dark.args = {
    isOpen: true,
    children: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Saepe eaque nisi ipsum, sequi at doloremque odio eius dignissimos excepturi ad aliquid cum numquam possimus. Odio doloremque, molestiae rerum, voluptatem neque atque culpa at facilis corporis libero dolores perferendis ut deserunt vitae, magni maxime sequi aperiam repellat. Sed, tempore iure officia distinctio fugiat explicabo quam. Qui aperiam illum, dolore eligendi dolor reprehenderit nesciunt commodi omnis a sunt incidunt optio animi praesentium ipsa temporibus ab molestiae, dolorum, cupiditate reiciendis autem. Sunt dolor molestiae, architecto at iure numquam? Nemo iure ipsa sequi ratione quidem quod saepe iusto optio facere, laboriosam eligendi, assumenda porro?',
};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
