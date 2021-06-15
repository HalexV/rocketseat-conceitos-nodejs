const express = require("express");
const cors = require("cors");

const { v4: uuid } = require("uuid");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0,
  };

  repositories.push(repository);

  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const [repository] = repositories.filter(
    (repository) => repository.id === id
  );

  if (!repository) return response.status(400).end();

  if (title != null) repository.title = title;
  if (url != null) repository.url = url;
  if (techs != null) repository.techs = techs.slice();

  return response.json(repository);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const index = repositories.findIndex((repository) => repository.id === id);

  if (index === -1) return response.status(400).end();

  repositories.splice(index, 1);

  return response.status(204).end();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const [repository] = repositories.filter(
    (repository) => repository.id === id
  );

  if (!repository) return response.status(400).end();

  repository.likes += 1;

  return response.json(repository);
});

module.exports = app;
