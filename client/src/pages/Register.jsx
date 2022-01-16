import styled from "styled-components";
import { mobile } from "../responsive";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { register } from "../redux/apiCalls";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://static.lexpress.fr/medias_12020/w_2048,h_1146,c_crop,x_0,y_154/w_1000,h_563,c_fill,g_north/v1550742170/sushi-saumon-maki-saumon-japonais_6154396.jpg")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const Register = () => {
const [name,setName]=useState("")
const [username,setUserName]=useState("")
const [lastName,setLastName]=useState("")
const [email,setEmail]=useState("")
const [password,setPassword]=useState("")
const [confPassword,setConfPassword]=useState("")

const dispatch = useDispatch();
const { isFetching, error } = useSelector((state) => state.user);
const handleClick = (e) => {
  e.preventDefault();
  register(dispatch, {name,username, lastName, email, password, confPassword });
};
  
  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form>
          <Input placeholder="name" onChange={(e) => setName(e.target.value)} />
          <Input placeholder="last name" onChange={(e) => setLastName(e.target.value)}/>
          <Input placeholder="username" onChange={(e) => setUserName(e.target.value) }/>
          <Input placeholder="email" onChange={(e) => setEmail(e.target.value)}/>
          <Input placeholder="password" onChange={(e) => setPassword(e.target.value)}/>
          <Input placeholder="confirm password" onChange={(e) => setConfPassword(e.target.value)}/>
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button onClick={handleClick} disabled={isFetching}>
            CREATE
          </Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
