
import React, { useEffect, useRef } from "react";
import styled from 'styled-components';
import axios from 'axios'
import { toast } from "react-toastify";


const FormContainer = styled.form`
    display:flex;
    align-items:flex-end;
    gap:10px;
    flex-wrap:wrap;
    background-color:#fff;
    padding: 20px;
    box-shadow: 0px 0px 5px #ccc;
    border-radius:5px;
`;

const InputArea = styled.div`
    display:flex;
    flex-direction:column;
`;

const Input = styled.input`
    width:120px;
    padding:0 10px;
    border: 1px solid #bbb;
    border-radius:5px;
    height:40px;
`;

const Label = styled.label`
    
`;

const Button = styled.button`
    padding:10px;
    cursor:pointer;
    border-radius:5px;
    border:none;
    background-color:#2c73d2;
    color:white;
    height:42px;
`;


const Form = ({ getUsers, onEdit, setOnEdit }) => {
    const ref = useRef();

    useEffect(() => {
        //Verifica se o formulario tem algum item de edição
        if (onEdit) {
            //Se tiver, ele libera
            const user = ref.current;

            //Edição
            user.nome.value = onEdit.nome;
            user.email.value = onEdit.email;
            user.fone.value = onEdit.fone;
            user.data_nascimento.value = onEdit.data_nascimento;
        }
    }, [onEdit]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const user = ref.current;

        //Verifica se os inputs estao preenchidos
        if (
            !user.nome.value ||
            !user.email.value ||
            !user.fone.value ||
            !user.data_nascimento.value
        ) {
            return toast.warn("Preencha todos os campos")
        }

        //Edição
        if (onEdit) {
            //Fazendo a edição com o id
            await axios
                .put("http://localhost:3001/" + onEdit.id, {
                    nome: user.nome.value,
                    email: user.email.value,
                    fone: user.fone.value,
                    data_nascimento: user.data_nascimento.value,
                })
                //Certo
                .then(({ data }) => toast.success(data))
                //Error
                .catch(({ data }) => toast.error(data));
        } else {
            await axios
                .post("http://localhost:3001/", {
                    nome: user.nome.value,
                    email: user.email.value,
                    fone: user.fone.value,
                    data_nascimento: user.data_nascimento.value,
                })
                //Certo
                .then(({ data }) => toast.success(data))
                //Error
                .catch(({ data }) => toast.error(data));
        }

        //Limpando o formulaio
        user.nome.value = "";
        user.email.value = "";
        user.fone.value = "";
        user.data_nascimento.value = "";

        //Depois da edição fazer uma inclusão
        setOnEdit(null);
        //atualizando o getuser
        getUsers();
    }
    return (
        <FormContainer ref={ref} onSubmit={handleSubmit}>
            <InputArea>
                <Label>Nome:</Label>
                <Input name="nome" />
            </InputArea>
            <InputArea>
                <Label>E-mail:</Label>
                <Input name="email" type="email" />
            </InputArea>
            <InputArea>
                <Label>Telefone:</Label>
                <Input name="fone" />
            </InputArea>
            <InputArea>
                <Label>Data de nascimento:</Label>
                <Input name="data_nascimento" type="date" />
            </InputArea>

            <Button type="submit">SALVAR</Button>
        </FormContainer>
    );
};

export default Form;