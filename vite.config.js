import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vite is the "workshop" that builds and runs the project.
// The react() plugin teaches it how to understand JSX.
export default defineConfig({
  plugins: [react()],
})
