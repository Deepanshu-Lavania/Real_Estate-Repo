export const ManualErrorHandler = (statusCode,message)=>{
    const error= new Error();
    error.statusCode=statusCode
    error.message=message
    return error
};
