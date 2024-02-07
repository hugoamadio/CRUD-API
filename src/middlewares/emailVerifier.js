function emailVerifier(req, res, next) {
    const data = req.body;

    if(data.email.includes("@")){
        return next()
    } else {
        return res
        .status(400)
        .json({sucess: false, msg: "The email is not a valid email."})
    }
}
export default emailVerifier;