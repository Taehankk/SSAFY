import { StoryObj, Meta } from "@storybook/react/*";
import { ToDoListContextProvider } from "../../../contexts/ToDoList";
import { ToDoListPage } from ".";
import { BrowserRouter } from "react-router-dom";

const meta: Meta<typeof ToDoListPage> = {
    title: "Pages/ToDoListPage",
    component: ToDoListPage,
    decorators: [
        (Story) => (
            <ToDoListContextProvider>
                <BrowserRouter>
                    <Story />
                </BrowserRouter>
            </ToDoListContextProvider>
        ),
    ],
};

export default meta;

type Story = StoryObj<typeof ToDoListPage>;

export const Default: Story = {};
