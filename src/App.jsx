
import React, { useState, useEffect } from "react";
import "./App.css";

export default function App() {
  const [usuarios, setUsuarios] = useState([]);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [idBusca, setIdBusca] = useState("");
  const [usuarioEncontrado, setUsuarioEncontrado] = useState(null);
  const [frase, setFrase] = useState("");
  const [mensagemConfissao, setMensagemConfissao] = useState("");
  const [statusApi, setStatusApi] = useState("Conectando...");
  const [erroCadastro, setErroCadastro] = useState("");

  const API = "http://localhost:8080/api/usuarios";

  useEffect(() => {
    fetchUsuarios();
  }, []);

  function fetchUsuarios() {
    fetch(API)
      .then((res) => {
        if (!res.ok) throw new Error();
        setStatusApi("✅ Conectado ao backend");
        return res.json();
      })
      .then(setUsuarios)
      .catch(() => {
        setStatusApi("❌ Erro ao conectar com backend");
      });
  }

  function criarUsuario(e) {
    e.preventDefault();
    setErroCadastro("");
    fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, email }),
    })
      .then(async (res) => {
        if (!res.ok) {
          let errorText = await res.text();
          try {
            const errorJson = JSON.parse(errorText);
            errorText = errorJson.message || errorText;
          } catch {
            // mantém texto cru
          }
          throw new Error(errorText);
        }
        return res.json();
      })
      .then(() => {
        setNome("");
        setEmail("");
        fetchUsuarios();
      })
      .catch((error) => setErroCadastro(error.message));
  }

  function deletarUsuario(id) {
    fetch(`${API}/id/${id}`, { method: "DELETE" })
      .then(() => fetchUsuarios())
      .catch(console.error);
  }

  function buscarPorId(e) {
    e.preventDefault();
    fetch(`${API}/id/${idBusca}`)
      .then((res) => {
        if (!res.ok) throw new Error("Não encontrado");
        return res.json();
      })
      .then((data) => setUsuarioEncontrado(data))
      .catch(() => setUsuarioEncontrado(null));
  }
  function validaEmail(email) {
    // Regex simples para email básico
    return /^\S+@\S+\.\S+$/.test(email);
  }
  
  function criarUsuario(e) {
    e.preventDefault();
    setErroCadastro(""); // limpa erros anteriores
  
    if (!validaEmail(email)) {
      setErroCadastro("Email inválido. Use um formato como: usuario@exemplo.com");
      return;
    }
  
    fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, email }),
    })
      .then(async (res) => {
        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(errorText);
        }
        return res.json();
      })
      .then(() => {
        setNome("");
        setEmail("");
        fetchUsuarios();
      })
      .catch((error) => setErroCadastro(error.message));
  }
  
 

  return (
    <div className="container">
      <h1>Projeto Domo</h1>
      <p className={`status ${statusApi.includes("Erro") ? "error" : "ok"}`}>
        {statusApi}
      </p>

      {/* Criar usuário */}
      <section>
        <h2>Criar novo usuário</h2>
        <form onSubmit={criarUsuario}>
          <input
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Nome"
            required
          />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <button type="submit">Criar</button>
        </form>
        {erroCadastro && (
          <p style={{ color: "red", marginTop: "0.5rem" }}>{erroCadastro}</p>
        )}
      </section>

      {/* Lista de usuários */}
      <section>
        <h2>Lista de usuários</h2>
        {usuarios.length === 0 ? (
          <p>Nenhum usuário encontrado.</p>
        ) : (
          <ul>
            {usuarios.map((u) => (
              <li key={u.id}>
                <strong>{u.nome}</strong> — {u.email} (ID: {u.id})
                <button onClick={() => deletarUsuario(u.id)}>Deletar</button>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Buscar por ID */}
      <section>
        <h2>Buscar usuário por ID</h2>
        <form onSubmit={buscarPorId}>
          <input
            value={idBusca}
            onChange={(e) => setIdBusca(e.target.value)}
            placeholder="ID do usuário"
            required
          />
          <button type="submit">Buscar</button>
        </form>
        {usuarioEncontrado && (
          <p className="message">
            <strong>Nome:</strong> {usuarioEncontrado.nome} <br />
            <strong>Email:</strong> {usuarioEncontrado.email}
          </p>
        )}
        {idBusca && usuarioEncontrado === null && (
          <p className="message">Usuário não encontrado.</p>
        )}
      </section>

   
    </div>
  );
}
