import { StoryObj, Meta } from "@storybook/react";
import { BrowserRouter } from "react-router-dom";
import { AppTitle } from ".";

const meta: Meta<typeof AppTitle> = {
    title: "Atoms/AppTitle",
    component: AppTitle,
    decorators: [
        (Story) => (
            <BrowserRouter>
                <Story />
            </BrowserRouter>
        ),
    ],
    parameters: {
        backgrounds: {
            default: "Header background color",
            values: [{ name: "Header background color", value: "#304ffe" }],
        },
    },
};

export default meta;

type Story = StoryObj<typeof AppTitle>;

export const Default: Story = {};
