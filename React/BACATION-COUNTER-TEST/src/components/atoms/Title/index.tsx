import styled from "@emotion/styled";

const Label = styled.h1`
    margin-bottom: 32px;
`;

interface Props {
    readonly label: string;
}

export const Title = ({ label }: Props) => {
    return <Label>{label}</Label>;
};
