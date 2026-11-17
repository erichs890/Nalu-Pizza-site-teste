// Estado da unidade escolhida, no navegador. Sem framework.
import { unidades, type Unidade } from '../config/unidades';
import { statusUnidade } from './horario';

const KEY = 'nalu:unidade';

export function lerEscolha(): Unidade | undefined {
  try {
    const s = localStorage.getItem(KEY);
    return unidades.find((u) => u.slug === s);
  } catch {
    return undefined;
  }
}

export function salvarEscolha(slug: string) {
  try { localStorage.setItem(KEY, slug); } catch { /* modo privado: segue sem salvar */ }
  aplicar(unidades.find((u) => u.slug === slug));
  document.dispatchEvent(new CustomEvent('nalu:unidade', { detail: slug }));
}

/** Atualiza tudo que tem data-u-* na página. */
export function aplicar(u = lerEscolha()) {
  document.documentElement.dataset.unidade = u?.slug ?? '';
  document.querySelectorAll<HTMLElement>('[data-u-nome]').forEach((el) => {
    el.textContent = u ? u.nome : el.dataset.uNome || 'Escolher unidade';
  });
  document.querySelectorAll<HTMLAnchorElement>('a[data-u-pedido]').forEach((a) => {
    if (u?.pedido) {
      a.href = u.pedido;
      a.target = '_blank';
      a.rel = 'noopener';
      a.removeAttribute('data-abre-seletor');
    } else {
      a.href = '#escolher-unidade';
      a.removeAttribute('target');
      a.setAttribute('data-abre-seletor', '');
    }
  });
  document.querySelectorAll<HTMLAnchorElement>('a[data-u-whats]').forEach((a) => {
    if (u?.whatsapp) {
      a.href = `https://wa.me/${u.whatsapp}`;
      a.target = '_blank';
      a.rel = 'noopener';
      a.removeAttribute('data-abre-seletor');
    } else if (u) {
      a.href = `/unidades/${u.slug}#contato`;
      a.removeAttribute('target');
      a.removeAttribute('data-abre-seletor');
    } else {
      a.href = '#escolher-unidade';
      a.setAttribute('data-abre-seletor', '');
    }
  });
  document.querySelectorAll<HTMLElement>('[data-status-slug]').forEach((el) => {
    const alvo = unidades.find((x) => x.slug === el.dataset.statusSlug);
    if (!alvo) return;
    const s = statusUnidade(alvo);
    el.dataset.estado = s.estado;
    el.textContent = s.texto;
  });
}

const rad = (g: number) => (g * Math.PI) / 180;
export function maisProxima(lat: number, lng: number) {
  let melhor = unidades[0];
  let dMin = Infinity;
  for (const u of unidades) {
    const dLat = rad(u.coords.lat - lat);
    const dLng = rad(u.coords.lng - lng);
    const a = Math.sin(dLat / 2) ** 2 + Math.cos(rad(lat)) * Math.cos(rad(u.coords.lat)) * Math.sin(dLng / 2) ** 2;
    const d = 6371 * 2 * Math.asin(Math.sqrt(a));
    if (d < dMin) { dMin = d; melhor = u; }
  }
  return { unidade: melhor, km: dMin };
}
