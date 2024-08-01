const User = require("../user/model/UserModel")

let auth = async (req, res, next) => {
    //인증 처리하는곳
    //클라이언트에서 토큰을 가져온다
    //토큰을 복호화 한 후 유저 찾는다
    //유저 있으면 okey
    //유저 없으면 no

    let token = req.cookies.x_auth; // 클라이언트 토큰 가져오는 거
    console.log("====token=====", token);

    try {
        const user = await User.findByToken(token) //토큰 가지고 디코드 한 후 그 값으로 해당 유저 찾음 

        if (!user) return res.json({ isAuth: false, error: true });
        req.token = token;

        //req.user =  JSON.stringify(user); // json객체를 문자열로 변환하기 때문에 user객체 속성에 접근 할 수 없다
        req.user = user;

        next();
    } catch (err) {
        return console.log("===auth.js==오류=====", err)
    }


}

module.exports = {
    auth,
};