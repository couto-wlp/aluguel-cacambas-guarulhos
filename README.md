# 🚧 Caçambas Guarulhos | Plataforma de Alta Performance

Bem-vindo ao repositório oficial da **Caçambas Guarulhos**, uma plataforma completa desenvolvida para captação de leads e geração de negócios locais no setor de construção civil e descarte ecológico.

## 🚀 Status do Projeto
**Status:** PRONTO PARA PRODUÇÃO (Ready for Production) 🟢

## ⚙️ Tecnologias e Arquitetura
Este projeto foi desenvolvido focado em máxima performance (Lighthouse 100), SEO Técnico e Conversão de Elite.
- **Framework Core:** [Astro](https://astro.build/) (v4) - Server-Side Rendering (SSR).
- **Estilização:** Tailwind CSS (com integração nativa @astrojs/tailwind).
- **Conteúdo e Banco de Dados:** Astro Content Collections com Zod (Validação estrita de posts e serviços).
- **SEO & Tráfego Local:** JSON-LD Automático (`@type: LocalBusiness`), Sitemap XML dinâmico (`@astrojs/sitemap`) e Open Graph.
- **Deploy Target:** Vercel (Configurado com adaptador Serverless para máxima flexibilidade).

## 🛠️ Como Rodar Localmente

Certifique-se de ter o Node.js v18+ instalado.

1. Instale as dependências:
   ```bash
   npm install
   ```

2. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

3. Para criar o Build de produção local:
   ```bash
   npm run build
   ```

## 🏗️ Estrutura de Diretórios
- `/src/pages/` - Rotas do site (Estáticas e Dinâmicas)
- `/src/content/` - Base de dados Markdown para (Serviços e Blog)
- `/src/components/` - Componentes reutilizáveis (SEO, Schema, Botão WhatsApp)
- `/src/layouts/` - Layout Base Global (Navbar indestrutível e Footer)
- `/src/data/config.ts` - "Cérebro" de configuração global do site (Nome, Domínio, Telefones).

---
*Desenvolvido com foco em excelência UI/UX e SEO Técnico Avançado.*
