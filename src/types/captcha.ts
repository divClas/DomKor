export interface I_Captcha {
    action: string
    challenge_ts: string
    hostname: string
    score: number
    success: boolean
    'error-codes'?: string[]
}