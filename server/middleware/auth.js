const User = require("../user/model/UserModel")

let auth =  (req, res, next) => {
    //인증 처리하는곳
    //클라이언트에서 토큰을 가져온다
    //토큰을 복호화 한 후 유저 찾는다
    //유저 있으면 okey
    //유저 없으면 no

    let token = req.cookies.x_auth;
    console.log(token);

    try {
        var user =  User.findByToken(token)
        if (!user) return res.json({ isAuth: false, error: true });
        req.token = token;
        req.user = user;
        console.log("====req.token=====" + req.token + "==========")
        console.log("====req.user=====" + req.user + "==========")
        next();
    } catch (err) {
        return console.log("=====오류=====" + err + "==========")
    }

    // , (err,user) => {
    //     if(err) throw err;
    //     if(!user) return res.json({ isAuth: false, error: true});

    //     req.token = token;
    //     req.user = user;
    //     next();
    // })

}

module.exports = {
    auth,
};