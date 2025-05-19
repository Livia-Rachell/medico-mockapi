import express from "express";
import cors from "cors";
import type { Request, Response } from "express";
import { Agendamento, Convenio, Disponibilidade, Especialidade } from "./types";
import { db } from "./db";
import { getNextId } from "./db";
import { obterDiaDaSemana } from "./utils";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/especialidades", (req: Request, res: Response) => {
  const { nome } = req.body;
  if (!nome) return res.status(400).send("Nome é obrigatório");

  const novaEspecialidade: Especialidade = {
    id: getNextId(),
    nome,
  };

  db.especialidades.push(novaEspecialidade);
  res.status(201).json(novaEspecialidade);
});

app.get("/api/especialidades", (req: Request, res: Response) => {
  res.json(db.especialidades);
});

// Convênios
app.post("/api/convenios", (req: Request, res: Response) => {
  const { nome } = req.body;
  if (!nome) return res.status(400).send("Nome é obrigatório");

  const novoConvenio: Convenio = {
    id: getNextId(),
    nome,
  };
  db.convenios.push(novoConvenio);
  res.status(201).json(novoConvenio);
});

app.get("/api/convenios", (req: Request, res: Response) => {
  res.json(db.convenios);
});

// Disponibilidades
app.post("/api/disponibilidades/definir", (req: Request, res: Response) => {
  const disponibilidade: Disponibilidade = {
    id: getNextId(),
    ...req.body,
  };

  db.disponibilidades.push(disponibilidade);
  res.status(201).json(disponibilidade);
});

app.post("/api/disponibilidades", (req: Request, res: Response) => {
  const { especialidadeId, data, medico } = req.body;
  const response = db.disponibilidades.filter((d) => {
    return d.especialidadeId === especialidadeId && d.medico === medico && d.diaSemana === obterDiaDaSemana(data);
  });

  res.json(response);
});

// Agendamento
app.post("/api/agendamentos", (req: Request, res: Response) => {
  const { paciente, especialidadeId, convenioId, dataHora } = req.body;

  const disponibilidades = db.disponibilidades.filter((d) => {
    return d.especialidadeId === especialidadeId && d.diaSemana === obterDiaDaSemana(dataHora);
  });

  if (disponibilidades.length === 0) {
    return res.status(400).send("Horário não disponível para essa especialidade!");
  }

  const disponibilidade = disponibilidades[0];

  const novoAgendamento: Agendamento = {
    id: getNextId(),
    paciente,
    especialidadeId,
    convenioId,
    dataHora,
    medico: disponibilidade.medico,
  };

  db.agendamentos.push(novoAgendamento);
  res.status(201).json({
    ...novoAgendamento,
  });
});

app.get("/api/agendamentos", (req: Request, res: Response) => {
  let agendamentos = db.agendamentos;
  const { paciente, dataInicio, dataFim } = req.query;

  if (paciente) {
    console.log(agendamentos, paciente);
    agendamentos = agendamentos.filter((ag) => ag.paciente.toLowerCase().includes(paciente.toString().toLowerCase()));
    console.log("Filtrados", agendamentos);
  }

  if (dataInicio || dataFim) {
    agendamentos = agendamentos.filter((ag) => {
      const data = new Date(ag.dataHora);
      if (dataInicio && data < new Date(dataInicio.toString())) return false;
      if (dataFim && data > new Date(dataFim.toString())) return false;
      return true;
    });
  }

  res.json(agendamentos);
});

app.post("/api/atendimentos", (req: Request, res: Response) => {
  const { agendamentoId, observacoes } = req.body;
  res.status(201).json({
    id: 1,
    agendamentoId,
    dataAtendimento: new Date().toISOString(),
    observacoes,
  });
});

const PORT = 30300;

app.listen(PORT, () => {
  console.log(`Mock API running on port ${PORT}`);
});
