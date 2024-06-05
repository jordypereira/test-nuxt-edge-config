import { get } from '@vercel/edge-config';
import { RequestCookies, ResponseCookies } from '@edge-runtime/cookies'

export const config = { matcher: '/:slug' };

export async function middleware (request: Request) {
  const headers = new Headers()
  const responseCookies = new ResponseCookies(headers)

  // Simple A/B test logic
  const variant = Math.random() < 0.5 ? 'A' : 'B';

  // Set a cookie to persist the variant for the user
  const random = Math.random();
  const random50Percent = random < 0.5;
  const showPlpHeader = random50Percent ? await get('greeting') : false;
  const cookieFeature = showPlpHeader ? 'greeting' : 'no-greeting';

  responseCookies.set('feature', cookieFeature, { maxAge: 33360 });
  responseCookies.set('variant', variant, { httpOnly: true });


  return new Response(null, {
    headers,
    status: 200,
  });
}
