import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  async function handleAddRepository() {
    const newRepository = await api.post('/repositories', {
      id: "123",
      url: "https://github.com/josepholiveira",
      title: "Desafio ReactJS",
      techs: ["React", "Node.js"],
    });

    const resitory = [
      ...repositories,
      newRepository.data
    ];
    
    setRepositories(resitory);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);

    let filteredRepos = repositories.filter(repository => repository.id !== id);

    setRepositories(filteredRepos);
  }

  useEffect(() => {
    api.get('/repositories').then((response) => {
      setRepositories(response.data);
    });
  }, []);

  return (
    <div className="list-container">
      <h1>RepoList</h1>

      <ul data-testid="repository-list">

        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}

      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
