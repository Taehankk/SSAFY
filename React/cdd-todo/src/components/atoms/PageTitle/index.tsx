import styled from "@emotion/styled";

const Container = styled.div`
    margin-top: 0;
`;

interface Props {
    readonly label: string;
}

export const PageTitle = ({ label }: Props) => {
    return <Container>{label}</Container>;
};
