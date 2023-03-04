import React from "react";
import "./style.css";
import Axios from 'axios'
import { Formik, Form, Field } from 'formik'


export default function Login() {
  
  // function redireciona(){
  //   window.location.href="/users";
  // }
const handleClickLogin = (values)=>{
   Axios.post("http://localhost:3009/auth/login", {
    codigo: values.codigo,
   senha: values.senha
   }).then((response)=>{
     console.log(response)
  })
}

  return (
    <section className="section-login">
    <Formik className="container" initialValues={{}} onSubmit={handleClickLogin}>
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
  );
}
