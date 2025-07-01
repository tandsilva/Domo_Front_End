import React, { useState } from 'react';
import { criarUsuario } from '../services/usuarioService';

export default function UsuarioForm() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    await criarUsuario({ nome, email });
    setNome('');
    setEmail('');
    alert('Usuário criado!');
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Cadastrar Usuário</h2>
      <input
        placeholder="Nome"
        value={nome}
        onChange={e => setNome(e.target.value)}
        required
      />
      <input
        placeholder="Email"
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      <button type="submit">Salvar</button>
    </form>
  );
}
