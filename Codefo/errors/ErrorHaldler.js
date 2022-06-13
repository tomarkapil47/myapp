class ErrorHaldler {
    constructor(status,msg){
            this.status=status;
            this.message=msg;
    }

    static validationError(message='All fields are required!'){
        return new ErrorHaldler(422,message)
    }
     static nofornotError(message="Not Found!"){
         return new ErrorHaldler(404,message)
     }
     static serverError(message="internal Error!"){
         return new ErrorHaldler(500,message)
     }
     static ForbiddenError(message="Not Allowed!"){
         return new ErrorHaldler(403,message)
     }
}

module.exports= ErrorHaldler;