
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');


const userSchema = mongoose.Schema({
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
    isAdmin: {
        type: Boolean,
        trim: true,
        kMaxLength: 50
    },
    isAuth: {
        type: Boolean,
    },
    role: {
        type: Number,
        trim: true,
        default:0
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
        default: mongoose.now
    },
    updatedAt: {
        type: String,
        trim: true,
        default: mongoose.now
    },


})

userSchema.pre('save', async function (next) {

    //     //비밀번호 암호화 하기
    //     //Salt를 먼저 생성
    //     //saltRounds 몇글자로 할 건지
    //     //Salt를 이용해서 비밀번호 암호화

    // 여기서 this는 해당 스키마가 실행되는 인스턴스를 바라 보기 때문에 userSchema가 됨
    var user = this;

    if (user.isModified('password')) {
        // //Salt 생성

        let salt = await bcrypt.genSalt(saltRounds);

        if (!salt) {
            return next(err);
        }

        let hash = await bcrypt.hash(user.password, salt);

        if (!hash) {
            return next(err)
        }

        user.password = hash;
        next();
    } else {
        next();
    }
});


userSchema.methods.comparePassword = async function (plainPassword, cb) {


    bcrypt.compare(plainPassword, this.password)
        .then((isMatch) => {
            cb(null, isMatch);
        })
        .catch((err) => {
            if (err) return cb(err);
        })

}

userSchema.methods.generateToken = function (cb) {
    var user = this;
    //jwt 토큰 생성
    var token = jwt.sign(user._id.toHexString(), 'secretToken')

    user.token = token;
    user.save()
        .then((user) => {
            cb(null, user)
        })
        .catch((err) => {
            return cb(err);
        })
}

userSchema.statics.findByToken = async function (token) {
    var user = this;

    // jwt.verify(token, 'secretToken', (err, decode) => {
    //     const userInfo = user.findOne({ "_id": decode, "token": token });

    //     if (err) {
    //         return console.log("=====오류2=====" + err + "==========")
    //     }
    //     console.log("=====userInfo=====" + userInfo + "==========")
    //     return userInfo
    // })

    try {
        // // jwt.verify를 Promise로 감싸서 await 사용 가능하게 함
        // const decode = await new Promise((resolve, reject) => {
        //   jwt.verify(token, 'secretToken', (err, decoded) => {
        //     if (err) reject(err);
        //     else resolve(decoded);
        //   });
        // });

        const decode = await jwt.verify(token, 'secretToken')

        if(!decode){
            return console.log("error")
        }
    
        const userInfo = await user.findOne({ "_id": decode, "token": token });
        console.log("=====userInfo=====" + userInfo + "==========");
        return userInfo;
      } catch (err) {
        console.log("=====오류=====" + err + "==========");
        throw err; // 에러를 상위로 전파
      }
};


const User = mongoose.model('User', userSchema);


module.exports = User;