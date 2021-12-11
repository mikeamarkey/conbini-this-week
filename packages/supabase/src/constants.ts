export const apiUrl = process.env.SUPABASE_API_URL ?? ''
export const publicKey = process.env.SUPABASE_PUBLIC_KEY ?? ''

export const codegenUrl = `${apiUrl}/rest/v1/?apikey=${publicKey}`
export const writeFileName = `src/generate/api.ts`
