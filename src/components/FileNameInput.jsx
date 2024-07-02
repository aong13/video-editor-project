import React from "react";
import styled from "styled-components";

const InputContainer = styled.div`
  display: flex;
`;

const StyledLabel = styled.label`
  font-weight: 700;
  margin-right: 10px;
  font-size: 16px;
  color: #333;
  display: flex;
  align-items: center;
`;

const StyledInput = styled.input`
  width: 300px;
  border-radius: 30px;
  padding: 10px 15px;
  border: 1px solid #ccc;
  font-size: 14px;
  transition: border-color 0.3s;

  &:focus {
    border-color: #0e3487;
    outline: none;
  }
`;

const FileNameInput = ({ customFileName, setCustomFileName }) => {
  return (
    <InputContainer>
      <StyledLabel>출력파일명</StyledLabel>
      <StyledInput
        type="text"
        placeholder="파일명"
        value={customFileName}
        onChange={(e) => setCustomFileName(e.target.value)}
      />
    </InputContainer>
  );
};

export default FileNameInput;
