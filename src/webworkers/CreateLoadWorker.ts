export default function CreateLoadWorker(): Worker {
  return new Worker(new URL('./LoadWorker.ts', import.meta.url), { type: 'module' });
}
