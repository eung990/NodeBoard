const bcrypt = require('bcrypt');
const saltRounds = 10;

const UserMiddleware = {
    PwBcrypt : function (userSchema) {userSchema.pre('save', function (next) {

        //     //비밀번호 암호화 하기
        //     //Salt를 먼저 생성
        //     //saltRounds 몇글자로 할 건지
        //     //Salt를 이용해서 비밀번호 암호화
    
        // 여기서 this는 해당 스키마가 실행되는 인스턴스를 바라 보기 때문에 userSchema가 됨
        var user = this;
    
        if (user.isModified('password')) {
            //Salt 생성
            bcrypt.genSalt(saltRounds, function (err, salt) {
                if (err) return next(err);
    
                bcrypt.hash(user.password, salt, function (err, hash) {
                    if (err) return next(err);
                    user.password = hash;
                    next();
                });
            });
        } else {
            next();
        }
    })},
}

module.exports = {
    UserMiddleware,
}

