import { get } from '@vercel/edge-config';

export const config = {
  runtime: 'edge',
};

export default async function eventHandler() {

  return {
    label: `This is the value of "greeting" in my Edge Config.`,
    value: 'dd',
  }
}
