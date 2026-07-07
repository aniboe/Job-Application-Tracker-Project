class ApiError extends Error{
    constructor(
        statuscode,
        message = "something went wrong",
        errors = [],
        stack = "",
    ){
        super(message) // accessing message property of Error, look in first line of class
        this.statuscode = statuscode
        this.data = null // dont know what it is used for
        this.message = message
        this.success = false
        this.errors = errors
        
        if(stack){ 
            this.stack = stack
        }
        else{
            Error.captureStackTrace(this, this.constructor) // stores error stack trace upto 10 level
        }
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/captureStackTrace
    }
}

export { ApiError }