export const SERVICE_PUBLIC_SLUGS: Record<string, string> = {
  'cacamba-4m': 'aluguel-cacamba-4m3-guarulhos',
  'cacamba-5m': 'aluguel-cacamba-5m3-guarulhos',
  'cacamba-6m': 'aluguel-cacamba-6m3-guarulhos',
  'cacamba-7m': 'aluguel-cacamba-7m3-guarulhos',
  'cacamba-8m': 'aluguel-cacamba-8m3-guarulhos',
  'cacamba-roll-on': 'aluguel-cacamba-roll-on-guarulhos',
};

export const getServicePublicSlug = (contentSlug: string) =>
  SERVICE_PUBLIC_SLUGS[contentSlug] ?? contentSlug;

export const getServicePath = (contentSlug: string) =>
  `/servicos/${getServicePublicSlug(contentSlug)}`;
