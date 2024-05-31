import { get } from '@vercel/edge-config';

export const config = { matcher: '/api/welcome' };

export async function middleware(request: Request): Response {
  const random = Math.random();
  console.log("🚀 ~ eventHandler ~ random:", random)
  const random50Percent = random < 0.5;
  console.log("🚀 ~ eventHandler ~ random10Percent:", random50Percent)
  const showPlpHeader = random50Percent ? await get('greeting') : false;
  const cookieFeature = showPlpHeader ? 'greeting' : 'no-greeting';
  const cookie = `feature=${cookieFeature}; Path=/; Max-Age=60`;

  if (showPlpHeader) {
    const url = new URL(request.url);
    url.pathname = '/api/welcome2';
    return Response.redirect(url);
  }
  
  return new Response(null, {
    headers: {
      'Set-Cookie': cookie,
    },
  });
}
