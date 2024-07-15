import { Meta, StoryObj } from "@storybook/react";

import { Title } from ".";

const meta: Meta<typeof Title> = {
    title: "Atoms/Title",
    component: Title,
};

export default meta;

type Story = StoryObj<typeof Title>;

export const Default: Story = {
    args: {
        label: "Counter App",
    },
};
