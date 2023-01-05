import styled from 'styled-components';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import GlobalStyles from './styles/global'
import Formjs from './components/Form';


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
  return (
    <>

      <Container>
        <Title>Usuarios</Title>
        <Formjs />
      </Container>
      <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_LEFT} />
      <GlobalStyles />

    </>
  );
}

export default App;
