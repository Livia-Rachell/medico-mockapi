import { Agendamento, Atendimentos, Convenio, Disponibilidade, Especialidade } from "./types";

type Database = {
  especialidades: Especialidade[];
  convenios: Convenio[];
  agendamentos: Agendamento[];
  disponibilidades: Disponibilidade[];
  atendimentos: Atendimentos[];
};

export const db: Database = {
  especialidades: [{ id: 1, nome: "Cardiologia" }],
  convenios: [{ id: 1, nome: "Unimed" }],
  disponibilidades: [],
  agendamentos: [],
  atendimentos: [],
};

let idCounter = 2;

export const getNextId = () => idCounter++;
