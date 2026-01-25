/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  // Agrega más variables de entorno aquí si las necesitas
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// Declaración para process.env (para compatibilidad con Jest)
declare namespace NodeJS {
  interface ProcessEnv {
    readonly VITE_API_BASE_URL?: string;
  }
}
<<<<<<< HEAD
=======

// Declaraciones para CSS modules
declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}
>>>>>>> 9590e4f209acff68db4dc49b898d6d75cc29b111
