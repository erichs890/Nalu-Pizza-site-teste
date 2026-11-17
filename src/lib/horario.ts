import type { Unidade } from '../config/unidades';

const TZ = 'America/Fortaleza';

/** Dia da semana (0=dom) e minutos desde 00:00 no fuso de Fortaleza. */
export function agoraFortaleza(d = new Date()) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: TZ, weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
  }).formatToParts(d);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? '';
  const dia = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(get('weekday'));
  return { dia, min: Number(get('hour')) * 60 + Number(get('minute')) };
}

const toMin = (hhmm: string) => {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
};

export type Status = { estado: 'aberto' | 'fechado' | 'indefinido'; texto: string };

export function statusUnidade(u: Unidade, d = new Date()): Status {
  if (!u.horarios?.length) return { estado: 'indefinido', texto: 'Horário a confirmar' };
  const { dia, min } = agoraFortaleza(d);
  const ontem = (dia + 6) % 7;
  for (const h of u.horarios) {
    const a = toMin(h.abre);
    let f = toMin(h.fecha);
    const viraNoite = f <= a;
    if (h.dias.includes(dia as never) && min >= a && (viraNoite || min < f)) {
      return { estado: 'aberto', texto: `Aberto agora · fecha às ${h.fecha.replace(':00', 'h')}` };
    }
    if (viraNoite && h.dias.includes(ontem as never) && min < f) {
      return { estado: 'aberto', texto: `Aberto agora · fecha às ${h.fecha.replace(':00', 'h')}` };
    }
  }
  // próxima abertura hoje
  const hoje = u.horarios.filter((h) => h.dias.includes(dia as never) && toMin(h.abre) > min);
  if (hoje.length) return { estado: 'fechado', texto: `Fechado · abre às ${hoje[0].abre.replace(':00', 'h')}` };
  return { estado: 'fechado', texto: 'Fechado agora' };
}

export function naluManiaHoje(dias: readonly number[], d = new Date()) {
  return dias.includes(agoraFortaleza(d).dia);
}

export const brl = (v: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v);
