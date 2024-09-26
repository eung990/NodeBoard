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

let admin = async (req, res, next) => {
    let token = req.cookies.x_auth; // 클라이언트 토큰 가져오는 거
    console.log("====token=====", token);

    try {
        const user = await User.findByToken(token) //토큰 가지고 디코드 한 후 그 값으로 해당 유저 찾음 

        if (!user) {
            return res.status(401).json({ isAdmin: false, error: true, message: "인증 실패: 사용자를 찾을 수 없습니다." });
        }

        req.token = token;

        if (user.role === 'admin') {
            req.user = user;
            req.role = user.role;
            next();
        } else {
            return res.status(403).json({ isAdmin: false, error: true, message: "접근 권한이 없습니다: 관리자만 접근 가능합니다." });
        }
    } catch (err) {
        console.log("===auth.js==오류=====", err);
        return res.status(500).json({ isAdmin: false, error: true, message: "서버 오류가 발생했습니다." });
    }
}

module.exports = {
    auth,
    admin
};