// src/vite-env.d.ts

/// <reference types="vite/client" />

declare module "*.svg" {
  const src: string;
  export default src;
}
