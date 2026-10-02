import {defineConfig} from 'vite';
import {resolve} from 'node:path';
export default defineConfig({build:{rollupOptions:{input:{home:resolve('index.html'),about:resolve('sobre/index.html'),solutions:resolve('solucoes/index.html'),product:resolve('likawave/index.html'),contact:resolve('contato/index.html'),equipmentGuide:resolve('equipamentos-de-ondas-de-choque/index.html')}}}});
