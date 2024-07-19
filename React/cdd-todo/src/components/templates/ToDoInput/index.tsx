import styled from "@emotion/styled";
import { PageTitle } from "../../atoms/PageTitle";
import { Button } from "../../atoms/Button";
import { InputToDo } from "../../organisms/InputToDo";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #eeeeee;
`;

const Contents = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #ffffff;
    padding: 32px;
    border-radius: 8px;
`;

const ButtonContainer = styled.div`
    position: absolute;
    right: 40px;
    bottom: 40px;
    z-index: 1;
`;

export const ToDoInput = () => {
    const navigate = useNavigate();

    return (
        <Container>
            <Contents>
                <PageTitle label="할 일 추가" />
                <InputToDo />
            </Contents>
            <ButtonContainer>
                <Button label="닫기" onClick={() => navigate("/")} />
            </ButtonContainer>
        </Container>
    );
};
