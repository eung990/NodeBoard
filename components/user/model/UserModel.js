
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const { decode } = require('punycode');


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
        type: String,
        trim: true,
        kMaxLength: 50
    },
    isAuth: {
        type: String,
        trim: true,
        kMaxLength: 50
    },
    role: {
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

userSchema.pre('save', async function (next) {

    //     //비밀번호 암호화 하기
    //     //Salt를 먼저 생성
    //     //saltRounds 몇글자로 할 건지
    //     //Salt를 이용해서 비밀번호 암호화

    // 여기서 this는 해당 스키마가 실행되는 인스턴스를 바라 보기 때문에 userSchema가 됨
    var user = this;

    if (user.isModified('password')) {
        // //Salt 생성
        // bcrypt.genSalt(saltRounds, function (err, salt) {
        //     if (err) return next(err);

        //     bcrypt.hash(user.password, salt, function (err, hash) {
        //         if (err) return next(err);
        //         user.password = hash;
        //         next();
        //     });
        // });
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

// userSchema.pre('save', async function (next) {
//     const user = this;

//     if (user.isModified('password')) {
//         try {
//             const salt = await bcrypt.genSalt(saltRounds);
//             const hash = await bcrypt.hash(user.password, salt);
//             user.password = hash;
//             next();
//         } catch (error) {
//             next(error);
//         }
//     } else {
//         next();
//     }
// });

userSchema.methods.comparePassword = async function (plainPassword, cb) {
    // bcrypt.compare(plainPassword, this.password, function(err,isMatch){
    //     if(err) return cb(err);
    //     cb(null,isMatch);
    // })

    bcrypt.compare(plainPassword, this.password)
        .then((isMatch) => {
            cb(null, isMatch);
        })
        .catch((err) => {
            if (err) return cb(err);
        })

    // var isMatch = await bcrypt.compare(plainPassword, this.password);

    // if(isMatch){
    //     cb(null,isMatch);
    // }

    // cb(err);
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

userSchema.statics.findByToken = async function (token, cb) {
    var user = this;

    try {
        var decode = await jwt.verify(token, 'secretToken')
        var findUser = await user.findOne({ "_id": decode, "token": token })
        cb(null, findUser)
    }
    catch (err) {
        return cb(err);
    }
    // .then((decode) => {
    //     user.findOne({ "_id" : decode, "token" : token}, (err,user) => {
    //         if (err) return cb(err);

    //         cb(null,user);

    //     })
    // })
}

const User = mongoose.model('User', userSchema);


module.exports = User;