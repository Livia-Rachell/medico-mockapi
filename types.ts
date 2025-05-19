export interface Especialidade {
  id: number;
  nome: string;
}

export interface Convenio {
  id: number;
  nome: string;
}

export interface Disponibilidade {
  id: number;
  medico: string;
  especialidadeId: number;
  diaSemana: string;
  horaInicio: string;
  horaFim: string;
  duracaoConsultaMinutos: number;
}

export interface Agendamento {
  id: number;
  paciente: string;
  especialidadeId: number;
  convenioId: number;
  dataHora: string;
  medico: string;
}

export interface Atendimentos {
  id: number;
  agendamentoId: number;
  dataAtendimento: Date;
  observacoes: string;
}
