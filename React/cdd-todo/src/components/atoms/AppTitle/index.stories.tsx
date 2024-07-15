import { StoryObj, Meta } from "@storybook/react";
import { BrowserRouter } from "react-router-dom";
import { AppTitle } from ".";

const meta: Meta<typeof AppTitle> = {
    title: "Atoms/AppTitle",
    component: AppTitle,
};

export default meta;

type Story = StoryObj<typeof AppTitle>;

const Template: Story = {
    render: () => {
        <BrowserRouter>
            <AppTitle />
        </BrowserRouter>;
    },
};

export const Default = Template.bind({}): 
