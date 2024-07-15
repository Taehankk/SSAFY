import { StoryObj, Meta } from "@storybook/react/*";
import { CounterApp } from ".";

const meta: Meta<typeof CounterApp> = {
    title: "Templates/CounterApp",
    component: CounterApp,
};

export default meta;

type Story = StoryObj<typeof CounterApp>;

export const Default: Story = {};
