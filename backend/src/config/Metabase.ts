import jwt from 'jsonwebtoken';




export function Metabase(){
    try{
        const { METABASE_SECRET_KEY } = process.env;
    const payload = {
        resource: { dashboard: 1 },
        params: {},
        };
    const token = jwt.sign( payload, METABASE_SECRET_KEY! );
    return token;
    }
    catch(error: any){
        throw new Error(error.message);
    }
}