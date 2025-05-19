export function obterDiaDaSemana(dataString: string): string {
  const dias = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];

  if (!/^\d{4}-\d{2}-\d{2}$/.test(dataString)) {
    throw new Error("Formato inválido. Use YYYY-MM-DD");
  }

  const partes = dataString.split("-");
  const ano = parseInt(partes[0]);
  const mes = parseInt(partes[1]) - 1;
  const dia = parseInt(partes[2]);

  if (isNaN(ano) || isNaN(mes) || isNaN(dia)) {
    throw new Error("Valores numéricos inválidos");
  }

  const data = new Date(ano, mes, dia);

  if (data.getFullYear() !== ano || data.getMonth() !== mes || data.getDate() !== dia) {
    throw new Error("Data inválida");
  }

  return dias[data.getDay()];
}
