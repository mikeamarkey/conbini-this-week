const apiUrl = process.env.SUPABASE_API_URL
const publicKey = process.env.SUPABASE_PUBLIC_KEY

export const codegenUrl = `${apiUrl}/rest/v1/?apikey=${publicKey}`
export const writeDirName = './types'
export const writeFileName = `${writeDirName}/supabase.ts`
