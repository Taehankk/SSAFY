import { StoryObj, Meta } from "@storybook/react/*";
import { PageTitle } from ".";

const meta: Meta<typeof PageTitle> = {
    title: "Atoms/PageTitle",
    component: PageTitle,
};

export default meta;

type Story = StoryObj<typeof PageTitle>;

export const Default: Story = {
    args: {
        label: "할 일 목록",
    },
};
