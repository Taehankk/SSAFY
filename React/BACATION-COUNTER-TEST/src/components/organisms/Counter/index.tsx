// import styled from '@emotion/styled';

import { Button } from '../../atoms/Button';
import { Count } from '../../atoms/Count';

import useCountStore from '../../../store/useStore';

// const Container = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: center;
// `;

export const Counter = () => {
  const setCount = useCountStore((state) => state.setCount);

  return (
    // <Container>
    <div className="flex items-center justify-center">
      <Button label="-" onClick={() => setCount(-1)} />
      <Count />
      <Button label="+" onClick={() => setCount(1)} />
    </div>
    // </Container>
  );
};
