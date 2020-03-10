import React, { useRef, useState, useEffect } from 'react';
import { Form } from '@unform/web';
import './App.css';
import Input from './components/Form/Input';
import { Scope } from '@unform/core';
import * as Yup from 'yup';

function App() {
  const FormRef = useRef(null);

  async function handleSubmit(data, { reset }){
    try {

      const schema = Yup.object().shape({
        name: Yup.string().required('O nome é obrigatório'),
        email: Yup.string()
          .email('Digite um e-mail válido')
          .required('O e-mail é obrigatório'),
        address: Yup.object().shape({
          city: Yup.string()
            .min(3, 'no mínimo 3 caracteres')
            .required('A cidade é obrigatória')
        })
      });
      await schema.validate(data, {
        abortEarly: false,
      })

      console.log(data);

      FormRef.current.setErrors({});

      reset();
    } catch (err){
      if (err instanceof Yup.ValidationError){
        const errorMessages = {};

        err.inner.forEach(error => {
          errorMessages[error.path] = error.message;
        })

        FormRef.current.setErrors(errorMessages);
      }
    }
  }

  useEffect(() => {
    setTimeout(() => {
      FormRef.current.setData({
        name: 'Paulo Sérgio',
        email: 'paulo_sanches2012@hotmail.com',
        address: {
          city: 'Palmas'
        }

      })
    }, 2000)
  }, [])

  return (
    <div className="App">
      <Form ref={FormRef} onSubmit={handleSubmit}>
      <img
        src="https://storage.googleapis.com/golden-wind/unform/unform.svg"
        height="150"
        width="175"
        alt="Unform"
      />
        <Input label="Nome Completo" name="name" />
        <Input label="E-mail" name="email" />

        <Scope path="address" >
          <Input name="street" label="Rua" />
          <Input name="neighborhood" label="Bairro" />
          <Input name="city" label="Cidade" />
          <Input name="state" label="Estado" />
          <Input name="number" label="CEP" />
        </Scope>

        <button type="submit">Enviar</button>
      </Form>
    </div>
  );
}

export default App;
