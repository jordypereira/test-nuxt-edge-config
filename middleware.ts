import { get } from '@vercel/edge-config';

export const config = { matcher: '/welcome' };

export async function middleware(request: Request): Response {
  const random = Math.random();
  console.log("🚀 ~ eventHandler ~ random:", random)
  const random50Percent = random < 0.5;
  console.log("🚀 ~ eventHandler ~ random10Percent:", random50Percent)
  const showPlpHeader = random50Percent ? await get('greeting') : false;

  if (showPlpHeader) {
    const url = new URL(request.url);
    url.pathname = '/new-homepage';
    return Response.redirect(url);
  }
}
