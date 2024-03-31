# autoresponse-manager

Desarrollar una interfaz de usuario avanzada y una base de datos MySQL para un sistema de gestión de autorespuestas, optimizado para integración con WhatsApp. Este sistema permitirá la creación, edición y organización de autorespuestas, incluyendo funcionalidades para derivar a enlaces externos o reiniciar el flujo de preguntas. Los requerimientos específicos incluyen:

Interfaz de Usuario (UI) Intuitiva: Con botones para acciones comunes, drag-and-drop para reorganización, y capacidades avanzadas de búsqueda y filtrado.
Base de Datos MySQL: Con tablas para autorespuestas, usuarios, y logs de cambios, incluyendo campos para gestionar derivaciones a enlaces o al inicio del árbol de preguntas.
Gestión de Respuestas: Formularios para añadir/editar respuestas con opciones para texto, enlace o reinicio del flujo de conversación.
Autenticación y Roles de Usuario: Para controlar el acceso y las acciones permitidas dentro del sistema.
Adaptabilidad y Responsividad: Asegurando una experiencia de usuario coherente en diferentes dispositivos.
La idea central es ofrecer una herramienta eficiente y flexible para gestionar autorespuestas en WhatsApp, facilitando la interacción del usuario con opciones dinámicas de respuesta, como acceso a información adicional mediante enlaces o la capacidad de comenzar de nuevo la conversación para explorar diferentes ramas del árbol de preguntas.

## Collaborate with GPT Engineer

This is a [gptengineer.app](https://gptengineer.app)-synced repository 🌟🤖

Changes made via gptengineer.app will be committed to this repo.

If you clone this repo and push changes, you will have them reflected in the GPT Engineer UI.

## Setup

```sh
git clone https://github.com/GPT-Engineer-App/autoresponse-manager.git
cd autoresponse-manager
npm i
```

```sh
npm run dev
```

This will run a dev server with auto reloading and an instant preview.

## Tech stack

- [Vite](https://vitejs.dev/)
- [React](https://react.dev/)
- [Chakra UI](https://chakra-ui.com/)

## Requirements

- Node.js & npm - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
