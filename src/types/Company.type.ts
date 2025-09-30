export interface CompanySchema {
    id: number
    name: string
    nit:string
    phone:string
    address:string
    email: string
}

export interface InfoProject{
    CompanyId : number
}