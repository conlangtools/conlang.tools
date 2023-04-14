import type { LayoutServerLoad } from './$types';
 
export const load = (({ cookies }) => {
  return {
    theme: cookies.get('theme') ?? 'light'
  };
}) satisfies LayoutServerLoad;
