const API_URL = 'http://localhost:8080/api/usuarios'; // ajuste a URL pro seu backend

export async function listarUsuarios() {
  const res = await fetch(API_URL);
  return res.json();
}

// export async function criarUsuario(usuario) {
//   const res = await fetch(API_URL, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(usuario),
//   });
//   return res.json();
// }
function criarUsuario(e) {
    e.preventDefault();
    fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, email }),
    })
      .then(async (res) => {
        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(errorText || "Erro ao criar usuário");
        }
        return res.json();
      })
      .then(() => {
        setNome("");
        setEmail("");
        fetchUsuarios();
      })
      .catch((err) => alert(err.message));
  }
  
export async function deletarUsuario(id) {
  await fetch(`${API_URL}/id/${id}`, { method: 'DELETE' });
}
