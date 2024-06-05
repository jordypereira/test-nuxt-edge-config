import { get } from '@vercel/edge-config';

export const config = { matcher: '/:slug' };

export async function middleware (request: Request) {
  // Simple A/B test logic
  const variant = Math.random() < 0.5 ? 'A' : 'B';

  // Set a cookie to persist the variant for the user
  const random = Math.random();
  console.log("🚀 ~ eventHandler ~ random:", random)
  const random50Percent = random < 0.5;
  console.log("🚀 ~ eventHandler ~ random10Percent:", random50Percent)
  const showPlpHeader = random50Percent ? await get('greeting') : false;
  const cookieFeature = showPlpHeader ? 'greeting' : 'no-greeting';
  const cookie = `feature=${cookieFeature}; Path=/; Max-Age=60`;
  const cookie2 = `variant=${variant}; Path=/; HttpOnly`;

  const cookieString = request.headers.get('cookie'); 
  console.log("🚀 ~ eventHandler ~ cookieString:", cookieString)
  console.log("🚀 ~ eventHandler ~ cookie:", cookie)
  const cookieArray = [];
  console.log("🚀 ~ eventHandler ~ cookieArray:", cookieArray)
  const newCookieArray = cookieArray.filter((cookie) => {
    return !cookie.includes('feature');
  });
  console.log("🚀 ~ eventHandler ~ newCookieArray:", newCookieArray)
  newCookieArray.push(cookie);
  newCookieArray.push(cookie2);
  console.log("🚀 ~ eventHandler ~ newCookieArray:", newCookieArray)
  const newCookie = newCookieArray.join(';');
  console.log("🚀 ~ eventHandler ~ newCookie:", newCookie)


  return new Response(null, {
    headers: {
      'Set-Cookie': newCookie,
    },
  });
}
