import { StoryObj, Meta } from '@storybook/react';
import { Home } from '.';

const meta: Meta<typeof Home> = {
  title: 'Pages/Home',
  component: Home,
};

export default meta;

type Story = StoryObj<typeof Home>;

export const Story = {};
