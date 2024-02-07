function idVerifier(req, res, next) {
    let userID = Number(req.params.userID)

    if(userID > 0){
        return next()
    } else {
        return res
        .status(400)
        .json({sucess: false, msg: "The number must be greater than zero"})
    }
}
export default idVerifier;