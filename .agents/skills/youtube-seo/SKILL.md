---
name: YouTube SEO Optimizer
description: Optimiza metadatos y configuración avanzada de videos para maximizar el posicionamiento (SEO) y visibilidad, con un enfoque especial en canales nuevos que buscan crecimiento rápido.
version: 1.1.0
author: Creator SEO IA
category: seo
tags:
  - youtube
  - seo
  - metadata
  - visibility
  - growth
  - new-channels
department: marketing
capabilities:
  - Optimización de títulos para alto CTR y retención en canales sin audiencia previa
  - Redacción estructurada de descripciones para dominar el SEO de cola larga (long-tail)
  - Investigación y jerarquización de etiquetas (tags)
  - Configuración avanzada: Categoría, Ubicación, Idioma y Certificación de subtítulos
  - Sugerencias para ganar visibilidad inicial mediante búsquedas y recomendaciones
input:
  - Tema o nicho del video
  - Palabras clave principales
  - Resumen o transcripción del video
  - Público objetivo
  - País o región principal de la audiencia
output:
  - Títulos optimizados (varias opciones)
  - Descripción estructurada (gancho, cuerpo, marcas de tiempo, enlaces)
  - Lista de etiquetas estratégicas (enfocadas en baja competencia)
  - Configuración sugerida (Categoría, Ubicación, Idioma, Subtítulos)
  - Recomendaciones para el despegue inicial del canal
languages:
  - es
  - en
related_skills:
  - youtube-automation
  - seo-analyzer
---

# YouTube SEO Optimizer

Habilidad especializada para optimizar los metadatos y la configuración de un video de YouTube. Está diseñada especialmente para **creadores que empiezan desde cero** (canales nuevos) y necesitan ganar visibilidad rápida aprovechando el tráfico de búsqueda y temas de baja competencia antes de depender de las recomendaciones del algoritmo.

## Flujo de Trabajo Principal

### 1. Proceso de Optimización SEO

```text
FLUJO DE OPTIMIZACIÓN SEO:
┌─────────────────┐
│ Input del Video │
│ (Tema/Resumen)  │
└────────┬────────┘
         ▼
┌─────────────────┐
│ Análisis de     │
│ Palabras Clave  │
└────────┬────────┘
         ▼
┌─────────────────┐
│ Generación de   │
│ Títulos (CTR)   │
└────────┬────────┘
         ▼
┌─────────────────┐
│ Estructura de   │
│ Descripción     │
└────────┬────────┘
         ▼
┌─────────────────┐
│ Estrategia de   │
│ Etiquetas (Tags)│
└─────────────────┘
```

## Estrategias de Optimización

### 1. Optimización de Títulos (Prioridad: CTR + SEO)

El título es el factor más importante junto con la miniatura. Debe contener la palabra clave principal y generar curiosidad (evitando el clickbait engañoso).

```yaml
title_strategy:
  objectives:
    - Incluir la palabra clave principal lo más al principio posible.
    - Mantener la longitud ideal (debajo de 60 caracteres para evitar recortes).
    - Usar palabras de poder o emocionales (Increíble, Secreto, Guía, Rápido).
    - Generar curiosidad o resolver un problema específico.

  formulas:
    - "Cómo {{logro}} en {{tiempo}} ({{año}})"
    - "El Secreto para {{resultado_deseado}}"
    - "{{palabra_clave}}: Todo lo que necesitas saber"
    - "No hagas {{acción}} sin antes ver esto"

  variations_to_generate:
    - 2 opciones orientadas 100% a búsqueda (SEO puro)
    - 2 opciones orientadas a curiosidad/recomendación (Browse features)
    - 1 opción combinada (Híbrida)
```

### 2. Estructura de la Descripción (SEO Profundo)

La descripción ayuda al algoritmo a entender el contexto exacto del video. Los primeros 150 caracteres son cruciales porque aparecen en los resultados de búsqueda.

```yaml
description_structure:
  1_hook:
    length: "Primeras 2-3 líneas (aprox 150 caracteres)"
    content: "Resumen atractivo del video incluyendo la palabra clave principal y una secundaria de forma natural."

  2_body:
    length: "1-2 párrafos"
    content: "Explicación detallada de lo que trata el video. Debe responder a la intención de búsqueda del usuario y usar sinónimos de las palabras clave."

  3_timestamps:
    format: "00:00 - Título del capítulo"
    purpose: "Ayuda a la retención y permite a Google indexar fragmentos del video en sus resultados de búsqueda."

  4_links_and_ctas:
    content:
      - "Llamado a la acción (Suscríbete: [link])"
      - "Enlaces a redes sociales"
      - "Enlaces a recursos o productos mencionados"
      - "Enlace a otros videos o listas de reproducción del canal"

  5_hashtags:
    limit: "Máximo 3-5 hashtags al final de la descripción"
    strategy: "#PalabraClavePrincipal #Nicho #TemaSecundario"
```

### 3. Estrategia de Etiquetas (Tags)

Aunque YouTube dice que las etiquetas tienen un peso menor, siguen siendo útiles para errores ortográficos y variaciones de búsqueda.

```yaml
tag_strategy:
  structure:
    primary:
      - Palabra clave exacta
      - Variaciones directas
    secondary:
      - Palabras clave de cola larga (long-tail)
      - Preguntas frecuentes sobre el tema
    broad:
      - Categoría general del video
      - Nombre del canal

  rules:
    - LÍMITE ESTRICTO DE 500 CARACTERES: La longitud sumada de TODAS las etiquetas, incluyendo las comas que las separan, JAMÁS debe superar los 500 caracteres.
    - No incluir etiquetas irrelevantes o engañosas.
    - Ordenar de mayor a menor importancia (la más relevante primero).
    - Para canales nuevos: enfocar al menos un 70% en frases long-tail de baja competencia.
```

### 4. Configuración Avanzada del Video

Para un canal nuevo, darle señales muy específicas al algoritmo sobre de qué trata el video y a quién va dirigido es vital para no desperdiciar impresiones iniciales.

```yaml
advanced_configuration:
  category:
    purpose: "Ayuda a YouTube a agrupar tu contenido con videos similares."
    strategy: "Elegir la categoría más exacta posible. Si es un tutorial, Educación o Ciencia y Tecnología suele funcionar mejor que Entretenimiento."

  location:
    purpose: "Útil para contenido regional o vlogs."
    strategy: "Si el contenido es global y en español, puede dejarse en blanco. Si buscas una audiencia de un país específico (ej. México o España) para conseguir tracción local inicial, inclúyela."

  language:
    purpose: "Crucial para los subtítulos automáticos y el público objetivo."
    strategy: "Configurar explícitamente el idioma original del video (ej. 'Español (Latinoamérica)' o 'Español (España)')."

  subtitle_certification:
    purpose: "Cumplimiento normativo (FCC en EE. UU.) y claridad para el algoritmo."
    strategy: "Para creadores de contenido nativo en YouTube, normalmente seleccionar 'Este contenido no se ha emitido en la televisión de EE. UU.' (This content has never aired on television in the U.S.)."
```

## Reglas de Comportamiento del Agente

1. **Mentalidad de Canal Nuevo**: Al estar empezando desde cero, prioriza siempre el "Search Intent" (búsquedas). Genera títulos que respondan a preguntas específicas que la gente está buscando activamente (Long-tail SEO) antes de intentar títulos muy amplios que compiten con canales grandes.
2. **Priorizar el Lenguaje Natural**: Nunca satures de palabras clave (keyword stuffing). El contenido debe ser atractivo para humanos primero, y para algoritmos después.
3. **Consistencia Total**: Asegúrate de que el título, las etiquetas, la descripción y la configuración de idioma/categoría estén perfectamente alineados semánticamente.
4. **Marcas de Tiempo Obligatorias**: Siempre debes sugerir una estructura de capítulos (timestamps), ya que mejoran drásticamente el SEO en Google Search. Usa el formato `00:00 - Introducción`. NO inventes timestamps si no conoces la duración; ajústalos lógicamente a la duración real del video.
5. **Formato Listo para Publicar (CRÍTICO)**: Las descripciones generadas DEBEN estar listas para copiarse y pegarse en YouTube sin modificaciones. Cumple estrictamente lo siguiente:
   - **CERO Markdown Avanzado**: NO generes tablas (`|---|`), no uses encabezados (`##`), ni abuses de negritas/cursivas (`**` o `*`). YouTube sólo soporta texto plano básico.
   - **Timestamps en Forma de Lista Vertical**: Escribe cada capítulo en una línea completamente nueva. El formato debe ser estrictamente `00:00 Nombre del capítulo`. JAMÁS los pongas en una sola línea, ni uses tablas, ni el símbolo `|`.
   - **Uso Mínimo de Emojis**: Usa emojis ÚNICAMENTE para iniciar las secciones principales (ej. `📎 Enlaces útiles` o `💡 Sigueme en:`). NO uses emojis en el medio de las oraciones ni en los timestamps.
   - **Saltos de línea reales**: Asegúrate de usar saltos de línea genuinos (`\n`) para separar cada párrafo y cada timestamp. No agrupes información en bloques de texto densos.
   - **No incluyas la duración del video**: No escribas el tiempo total del video en la descripción ni en el título.
   - **CERO Placeholders**: No uses textos como `[URL]`, `(inserta aquí)`, o mensajes al usuario como `(ver sección tags)`. Escribe de manera natural y deja un espacio en blanco si va un link.
   - **Hashtags Obligatorios**: NUNCA olvides agregar de 3 a 5 hashtags estratégicos al final de la descripción, separados por espacios y en una línea nueva.

## Ejemplo de Prompt para el Agente

```text
Actúa como un experto en SEO para YouTube, especializado en hacer crecer canales desde cero.
Tengo un video nuevo sobre: "[Tema del video]".
Mi palabra clave principal es: "[Palabra clave]".
El público objetivo es: "[Audiencia]".
País/Región principal (opcional): "[País]"

Por favor, genera:
1. 5 opciones de títulos optimizados (3 muy enfocados en búsquedas long-tail de baja competencia, 2 de curiosidad/recomendación).
2. Una descripción completa estructurada (gancho, cuerpo, capítulos sugeridos, y llamados a la acción).
3. Una lista de etiquetas (tags) enfatizando frases de cola larga.
4. La configuración recomendada exacta para: Categoría, Ubicación del video, Idioma y Certificación de subtítulos.
5. 3 hashtags relevantes para incluir al final.
```
