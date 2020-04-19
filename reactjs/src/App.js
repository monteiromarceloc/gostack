import React, { useEffect, useState } from "react";
import "./styles.css";
import api from './services/api'

function App() {
  const [repositories, setRepositories] = useState([])

  useEffect(()=>{
    fetchRepositories();
  },[])

  async function fetchRepositories() {
    const res = await api.get('repositories')
    setRepositories(res.data)
  }

  async function handleAddRepository() {
    const data = {
      id: "123",
      url: "https://github.com/josepholiveira",
      title: "Desafio ReactJS",
      techs: ["React", "Node.js"],
    }
    const res = await api.post('repositories', data);
    setRepositories([...repositories, res.data])
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    setRepositories(repositories.filter(e => e.id !== id))
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {
          repositories.map(({id, title}) => <li key={id}>
            {title}
            <button onClick={() => handleRemoveRepository(id)}>
              Remover
            </button>
          </li>
          )
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
