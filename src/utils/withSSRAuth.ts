import { GetServerSideProps, GetServerSidePropsContext } from "next"
import { destroyCookie, parseCookies } from "nookies"
import { AuthTokenError } from "../services/errors/AuthTokenError"

export function withSSRAuth(fn: GetServerSideProps) {
    return async (ctx: GetServerSidePropsContext) => {
        console.log(ctx)
        const cookies = parseCookies(ctx)
        if (!cookies['minha-rota-token']) {
            return {
                redirect: {
                    destination: '/',
                    permanent: false
                }
            }
        }
        try {
            return await fn(ctx)
        } catch (error) {
            if (error instanceof AuthTokenError) {
                console.log(error)
                destroyCookie(ctx, 'minha-rota-token')
                destroyCookie(ctx, 'minha-rota-refresh-token')

                return {
                    redirect: {
                        destination: '/',
                        permanent: false
                    }
                }
            }
        }
    }
}