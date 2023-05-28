import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled, { keyframes } from "styled-components";
import {
  register,
  registerFailure,
  registerSuccess,
} from "../../redux/userSlice.js";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(to bottom, #667eea, #764ba2);
`;
const slideIn = keyframes`
  from {
    transform: translateX(-100%);
    opacity: 0;
  }

  to {
    transform: translateX(0);
    opacity: 1;
  }
`;
const Wrapper = styled.div`
  background-color: #fff;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  overflow: hidden;
  width: 350px;
  animation: ${slideIn} 0.5s ease;
`;
const Title = styled.h1`
  font-size: 2rem;
  color: #333;
  text-align: center;
  margin: 1rem 0;
`;
const SubTitle = styled.h1`
  font-size: 1rem;
  color: #333;
  text-align: center;
  margin: 1rem 0;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 0 2rem 2rem 2rem;
`;
const Input = styled.input`
  background-color: #f0f0f0;
  border: none;
  border-radius: 5px;
  padding: 0.8rem;
  margin-bottom: 1rem;
  font-size: 1rem;
  color: #333;

  &:focus {
    outline: none;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);
  }
`;

const Button = styled.button`
  background-color: #4B56D2;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 1rem;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background-color: #472183;
    transition: all 0.2s ease-in-out;
  }
`;

const Error = styled.p`
  color: red;
  font-size: 0.8rem;
  margin-top: 0.5rem;
  text-align: center;
`;

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage2, setErrorMessage2] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    dispatch(register());
    try {
      const res = await axios.post("/auth/signup", { name, email, password });
      dispatch(registerSuccess(res.data));
      navigate("/");
    } catch (err) {
      dispatch(registerFailure());
      setErrorMessage2("Geçersiz kullanıcı bilgileri !");
    }
  };

  return (
    <Container>
      <Wrapper>
        <Form>
          <Title>Kayıt ol</Title>
          <Input
            placeholder="Kullanıcı adı"
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            placeholder="E-posta"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Şifre"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={handleRegister}>Kayıt ol</Button>
          <Error>
            {errorMessage2 && <div>{errorMessage2}</div>}
          </Error>
          <SubTitle>Zaten hesabın var mı ?</SubTitle>
          <Button onClick={() => navigate("/login")}>Giriş yap</Button>{" "}
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Signup;
