import React, { useEffect, useState } from 'react';
import { listarUsuarios, deletarUsuario } from '../services/usuarioService';

export default function UsuarioList() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    carregarUsuarios();
  }, []);

  async function carregarUsuarios() {
    const dados = await listarUsuarios();
    setUsuarios(dados);
  }

  async function handleDelete(id) {
    await deletarUsuario(id);
    carregarUsuarios();
  }

  return (
    <div>
      <h1>Lista de Usuários</h1>
      <ul>
        {usuarios.map(u => (
          <li key={u.id}>
            {u.nome} - {u.email}
            <button onClick={() => handleDelete(u.id)}>Deletar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
