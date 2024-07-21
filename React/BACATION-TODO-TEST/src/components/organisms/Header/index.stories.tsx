import { StoryObj, Meta } from "@storybook/react/*";
import { BrowserRouter } from "react-router-dom";
import { Header } from ".";

const meta: Meta<typeof Header> = {
  title: "Organisms/Header",
  component: Header,
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Header>;

export const Default: Story = {};
