// A reusable wrapper for async route handlers to catch errors and pass them to Express error middleware
const asyncHandler = (reqHandler) => {
    return (req, res, next) => {
        Promise.resolve(reqHandler(req, res, next)).catch(next); // Pass error to next middleware
    };
};

export { asyncHandler };





/*

//Usenig try cath method


// const asyncHandler=()=>{}
// const asyncHandler=(fun)=>()=>{}
// const asyncHandler=(fun)=> async()=>{}

 
// A wrapper using try-catch for better readability in some cases
const asyncHandler = (fun) => {
    return async (req, res, next) => {
        try {
            await fun(req, res, next); // Call original function
        } catch (err) {
            next(err); // Forward error to Express error middleware
        }
    };
};

export { asyncHandler };

    */