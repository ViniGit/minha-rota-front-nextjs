import { GetServerSideProps, GetServerSidePropsContext } from "next"
import { parseCookies } from "nookies"

export function withSSRGuest(fn: GetServerSideProps) {
    return async (ctx: GetServerSidePropsContext) => {
        const cookies = parseCookies(ctx)
        if (cookies['minha-rota-token']) {
            return {
                redirect: {
                    destination: '/painel',
                    permanent: false
                }
            }
        }
        return await fn(ctx)
    }
}