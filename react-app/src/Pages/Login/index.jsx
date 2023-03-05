import React, { useEffect, useState } from "react";
import "./style.css";
import Axios from 'axios'
import { Formik, Form, Field } from 'formik'
import handleStorage from "../../storage/storage";
import { Navigate } from "react-router-dom";

export default function Login() {

  const storage = handleStorage();
  const [isUserLogged, setIsUserLogged] = useState(null);

  useEffect(() => {
    if(storage.get()){
      setIsUserLogged(true);
    }else{
      setIsUserLogged(false);
    }
  }, [storage])
  
  // function redireciona(){
  //   window.location.href="/users";
  // }
  const handleClickLogin = (values)=>{
    Axios.post("http://localhost:3009/auth/login", {
      codigo: values.codigo,
    senha: values.senha
    }).then(({data})=>{
      storage.save(data);
      setIsUserLogged(true);
    }).catch(({response})=>{
      if(response.data !== undefined && response.data.error){
        alert(response.data.error)
      }else{
        alert("Erro desconhecido.")
      }
    })
  }
  console.log(isUserLogged);
  return (
    <>
    {isUserLogged === true && <Navigate to={"/users-tarefas"} />}
    {isUserLogged === false && (
      <section className="section-login">
        <Formik className="container" initialValues={{
          codigo: '',
          senha: ''
        }} onSubmit={handleClickLogin}>
          <Form id="form-login">
            <div className="form-group">
              <label htmlFor="codigo">Usuário</label>
              <Field
                id="codigo"
                name="codigo"
                type='text'
                placeholder="Digite seu usuário"
              />
            </div>
            <div className="form-group">
              <label htmlFor="senha">Senha</label>
              <Field
                id="senha"
                name="senha"
                type="password"
                placeholder="Digite sua senha"
              />
            </div>
            <div className="button-group input-btn">
              <input type="submit" value="Entrar"/>
            </div>
          </Form>
        </Formik>
      </section>
    )}
  </>
  );
}
