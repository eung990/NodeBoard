
const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
    userId: {
        type: String,
        kMaxLength: 50
    },
    userName: {
        type: String,
        trim: true,
        Unique: 1,
        kMaxLength: 50
    },
    email: {
        type: String,
        trim: true,
        Unique: 1,
        kMaxLength: 50
    },
    password: {
        type: String,
        trim: true,
        kMaxLength: 50
    },
    image: String,
    token: {
        type: String
    },
    tokenExp: {
        type: Number,

    },
    createdAt: {
        type: String,
        trim: true,
        kMaxLength: 50
    },
    updatedAt: {
        type: String,
        trim: true,
        kMaxLength: 50
    },


})

// userSchema.pre('save', function (next) {

//     //     //비밀번호 암호화 하기
//     //     //Salt를 먼저 생성
//     //     //saltRounds 몇글자로 할 건지
//     //     //Salt를 이용해서 비밀번호 암호화

//     // 여기서 this는 해당 스키마가 실행되는 인스턴스를 바라 보기 때문에 userSchema가 됨
//     var user = this;

//     if (user.isModified('password')) {
//         //Salt 생성
//         bcrypt.genSalt(saltRounds, function (err, salt) {
//             if (err) return next(err);

//             bcrypt.hash(user.password, salt, function (err, hash) {
//                 if (err) return next(err);
//                 user.password = hash;
//                 next();
//             });
//         });
//     } else {
//         next();
//     }
// });





module.exports = {userSchema };