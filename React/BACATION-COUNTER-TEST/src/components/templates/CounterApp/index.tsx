import styled from '@emotion/styled';

import { Title } from '../../atoms/Title';
import { Counter } from '../../organisms/Counter';

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const CounterApp = () => {
  return (
    <Container>
      <Title label="Counter App" />
      <Counter />
    </Container>
  );
};
