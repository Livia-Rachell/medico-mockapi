export function obterDiaDaSemana(dataString: string): string {
  const dias = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
  ];

  const data = new Date(dataString);

  if (isNaN(data.getTime())) {
    throw new Error(
      "Data inválida. Use o formato YYYY-MM-DD ou uma data ISO válida."
    );
  }

  return dias[data.getDay()];
}
