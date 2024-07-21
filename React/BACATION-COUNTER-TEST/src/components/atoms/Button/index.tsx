import styled from '@emotion/styled';

// const Container = styled.button`
//   border: 0;
//   color: #ffffff;
//   background-color: #ff5722;
//   cursor: pointer;
//   padding: 8px 16px;
//   border-radius: 4px;

//   &:hover {
//     background-color: #ff5722;
//     opacity: 0.8;
//   }

//   &:active {
//     box-shadow: inset 5px 5px 10px rgba(0, 0, 0, 0.2);
//   }
// `;

interface Props {
  readonly label: string;
  readonly onClick?: () => void;
}

export const Button = ({ label, onClick }: Props) => {
  console.log(label);
  // return <Container onClick={onClick}>{label}</Container>;
  return (
    <button
      className="border-0 text-white bg-orange-500 cursor-pointer px-4 py-2 rounded hover:opacity-80 active:shadow-inner active:shadow-black/20"
      onClick={onClick}
    >
      {label}
    </button>
  );
};
