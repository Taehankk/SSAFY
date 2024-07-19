import { StoryObj, Meta } from "@storybook/react/*";
import { InputToDo } from ".";
import { BrowserRouter } from "react-router-dom";

const meta: Meta<typeof InputToDo> = {
    title: "Organisms/InputToDo",
    component: InputToDo,
    decorators: [
        (Story) => (
            <BrowserRouter>
                <Story />
            </BrowserRouter>
        ),
    ],
};

export default meta;

type Story = StoryObj<typeof InputToDo>;

export const Default: Story = {};
