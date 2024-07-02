import styled from "styled-components";

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const StyledButton = styled.button`
  padding: 16px 24px;
  border-radius: 8px;
  background-color: #fff;
  color: #383838;
  border: 1px solid #bdbdbd;
  transition: border-color 0.3s, color 0.3s;
  flex: 1 1 auto; /* PC화면 : 균등 분배 */
  max-width: 800px;
  @media (max-width: 768px) {
    width: 100%; /* 모바일 환경에서는 가로로 꽉 채움 */
  }
  &:hover,
  &:focus,
  &:active {
    color: #bdbdbd;
    border-color: #bdbdbd;
  }
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;

  img {
    height: auto;
    max-width: 24px;
  }

  p {
    font-size: 16px;
    font-weight: 700;
    margin: 0;
  }
`;

export const ExportButton = ({ onClick, imgSrc, imgAlt, buttonText }) => {
  return (
    <StyledButton onClick={onClick}>
      <img src={imgSrc} alt={imgAlt} />
      <p>{buttonText}</p>
    </StyledButton>
  );
};

export default ExportButton;
