import styled from 'styled-components';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import GlobalStyles from './styles/global'
import Formjs from './components/Form';
import Grid from './components/Grid';
import {useEffect, useState } from 'react';
import axios from 'axios';


const Container = styled.div`
    margin-top: 20px;
    width: 100%;
    max-width: 800px;
    align-items: center;
    display:flex;
    flex-direction:column;
    gap:10px;
`;

export const Title = styled.h2`
`;

function App() {

  //Receber os usuarios do banco
  const [users,setUsers] = useState([])
  const [onEdit, setOnEdit] = useState(null);

  const getUsers = async() => {
    try{
      const res = await axios.get("http://localhost:3001"); //Espera o await fazer um get no local do projeto
      setUsers(res.data.sort((a,b) => (a.none > b.none ? 1 : -1)));//com a resposta ele salva e guarda com o sort que organiza por ordem alfabetica
    }catch (error){
      toast.error(error)
    }
  }

  useEffect(() =>{
    getUsers();
  }, [setUsers])//Recarega sempre para um usuario

  return (
    <>

      <Container>
        <Title>Usuarios</Title>
        <Formjs onEdit={onEdit} setOnEdit={setOnEdit} getUsers={getUsers}/>
        <Grid users={users} setUsers={setUsers} setOnEdit={setOnEdit}/>{/**Setando no grud**/}
      </Container>
      <ToastContainer autoClose={3001} position={toast.POSITION.BOTTOM_LEFT} />
      <GlobalStyles />

    </>
  );
}

export default App;
