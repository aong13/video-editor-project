import React, { useState } from "react";
import styled from "styled-components";

const LoginContainer = styled.div`
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
`;

const Label = styled.label`
  margin-bottom: 5px;
  text-align: left;
  font-weight: bold;
  color: #0e3487;
  width: 100%;
`;

const Button = styled.button`
  padding: 10px 15px;
  margin: 10px 0;
  width: 100%;
  border-radius: 30px;
  border: none;
  background-color: #0e3487;
  color: white;
  font-size: 16px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #06205b;
  }
`;

const LinkContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 10px;
`;

const LinkSpan = styled.span`
  color: #7c7c7c;
  text-align: center;
  font-size: 14px;
  flex: 1;
  cursor: pointer;

  &:not(:last-child) {
    border-right: 1px solid #ccc;
  }
`;

const LoginForm = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {};

  return (
    <LoginContainer>
      <form onSubmit={handleSubmit}>
        <Label htmlFor="id">ID</Label>
        <Input
          type="text"
          id="id"
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="아이디"
        />
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호"
        />
        <Button type="submit">Login</Button>
      </form>
      <LinkContainer>
        <LinkSpan>회원가입</LinkSpan>
        <LinkSpan>아이디/비밀번호찾기</LinkSpan>
      </LinkContainer>
    </LoginContainer>
  );
};

export default LoginForm;
