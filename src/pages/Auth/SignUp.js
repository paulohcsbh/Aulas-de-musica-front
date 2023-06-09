import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from '../../assets/images/logo.png';
import axios from "axios";

const SignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');    
    const navigate = useNavigate();
    const [desabilitar, setDesabilitar] = useState(false);

    function signUp(e) {
        if(password !== confirmPassword){
            alert("As senhas devem ser iguais!")
            return;
        }
        setDesabilitar(true)
        
        e.preventDefault()
        const requisicao = axios.post("http://localhost:5000/users", { email: email, name: name, password: password })
        requisicao.then(() => { alert("Cadastro realizado com sucesso!"); setDesabilitar(false); navigate("/") })
        requisicao.catch(() => { alert("Erro no cadastro!"); setDesabilitar(false) })

    }
    return(
        <Geral> 
            <Logo src={logo} ></Logo>
            <h1>Cadastro do aluno</h1>
        <ContainerInput>
            <form onSubmit={signUp}>
                <InputName type='name' placeholder='Nome' value={name} onChange = { (e) => setName(e.target.value) } required disabled={desabilitar}></InputName>
                <InputEmail type='email' placeholder='Email' value={email} onChange = { (e) => setEmail(e.target.value) } required disabled={desabilitar}></InputEmail>
                <InputPassword type='password' placeholder='Senha' value={password} onChange = { (e) => setPassword(e.target.value) } required disabled={desabilitar}></InputPassword>
                <InputConfirmPassword type='password' placeholder='Confirmar Senha' value={confirmPassword} onChange = { (e) => setConfirmPassword(e.target.value) } required disabled={desabilitar}></InputConfirmPassword>
                <SignUpButton disabled={desabilitar}>Criar conta</SignUpButton>
                <Link to={"/"}>
                    <SignIn>Já possui uma conta? Faça login!</SignIn>
                </Link>
            </form>
        </ContainerInput>
    </Geral>
  )
}

const Geral = styled.div`
width: 100%;
min-height: 100vh;
background-color: #e5e5e5;
padding: 1.75em 0;
text-align: center;
font-family: 'Alkatra', cursive;
@media(min-height: 50.65em){
    height: 100vh;
}
>h1{
    margin-bottom: 1em;
    font-size: 1.5em;
}
`
const Logo = styled.img`
width: 30%;
`
const ContainerInput = styled.div`
width: 90%;
text-align: center;
border: 2px solid #fff;
margin: auto;
background-color: #ccc;
border-radius: .8em;
padding: 2em 0;

`
const InputName = styled.input`
width: 60%;
height: 3em;
margin-top: 1.6em;
border: none;
border-radius: .4em;
padding-left: .7em;
font-family: 'Lexend Deca', sans-serif;
opacity: .4;
@media(max-width: 56.25em){
    width: 90%;
}
`
const InputEmail = styled(InputName)`
`
const InputPassword = styled(InputName)`
`
const InputConfirmPassword = styled(InputName)`
`
const SignUpButton = styled.button`
width: 22%;
height: 3em;
font-size: 1em;
color: #fff;
display: block;
background-color: #52b6ff;
margin: 4em auto;
border-radius: .8em;
border: none;
cursor: pointer;
@media(max-width: 56.25em){
    width: 40%;
}
`
const SignIn = styled.p`
width: 15em;
height: 1.2em;
margin: auto;
font-weight: 400;
color: #fff;
cursor: pointer;
text-decoration: underline;
font-size: 1em;
`
   
export default SignUp;