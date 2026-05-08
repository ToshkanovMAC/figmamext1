export const useRouter = () => ({
  push: () => {},
  replace: () => {},
  back: () => {},
  prefetch: () => {},
  pathname: '/',
})

export const usePathname = () => '/'
export const useSearchParams = () => new URLSearchParams()
export const notFound = () => { throw new Error('NEXT_NOT_FOUND') }
export const redirect = (url: string) => { throw new Error(`NEXT_REDIRECT:${url}`) }
