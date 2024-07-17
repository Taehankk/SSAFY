import { StoryObj, Meta } from "@storybook/react/*";
import { InputToDo } from ".";

const meta: Meta<typeof InputToDo> = {
  title: "Organisms/InputToDo",
  component: InputToDo,
};

export default meta;

type Story = StoryObj<typeof InputToDo>;

export const Default: Story = {};
