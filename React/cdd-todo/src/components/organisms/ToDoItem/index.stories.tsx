import { StoryObj, Meta } from "@storybook/react/*";
import { ToDoItem } from ".";

const meta: Meta<typeof ToDoItem> = {
  title: "Organisms/ToDoItem",
  component: ToDoItem,
};

export default meta;

type Story = StoryObj<typeof ToDoItem>;

export const Default: Story = {
  args: {
    label: "리액트 공부하기",
  },
};
