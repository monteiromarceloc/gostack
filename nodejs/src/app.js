const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, owner } = request.body;
  const newRepo = { id: uuid(), title, owner, likes: 0 };
  repositories.push(newRepo);
  return response.json(newRepo);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, owner } = request.body;
  const repoIndex = repositories.findIndex(repo => repo.id === id);
  if (repoIndex < 0) return response.status(400).json({error: 'Project not found'})
  const newRepo = {id, title, owner};
  repositories[repoIndex] = {...repositories[repoIndex], ...newRepo};
  return response.json(newRepo);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const repoIndex = repositories.findIndex(repo => repo.id === id);
  if (repoIndex < 0) return response.status(400).json({error: 'Project not found'})
  repositories.splice(repoIndex, 1)
  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
  const repoIndex = repositories.findIndex(repo => repo.id === id);
  if (repoIndex < 0) return response.status(400).json({error: 'Project not found'})
  const { likes } = repositories[repoIndex]
  repositories[repoIndex].likes = likes + 1
  return response.status(204).send();
});

module.exports = app;
