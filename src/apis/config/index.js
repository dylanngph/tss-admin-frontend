let envRelease = 'sandbox'; // sandbox / staging / beta / production
const vesionApi = '/v1'; // v1 / v2

const tssAccount = {
    sandbox: 'https://sabxac.tss.vn',
    staging: 'https://stagac.tss.vn',
    beta: 'https://betaac.tss.vn',
    production: 'https://prodac.tss.vn'
}
export const API_ACCOUNT = tssAccount[envRelease]
export const API_ACCOUNT_VERSION = vesionApi;

const tssProject = {
    sandbox: 'https://sabxpj.tss.vn',
    staging: 'https://stagpj.tss.vn',
    beta: 'https://betapj.tss.vn',
    production: 'https://prodpj.tss.vn'
}
export const API_PROJECT = tssProject[envRelease]
export const API_PROJECT_VERSION = vesionApi;