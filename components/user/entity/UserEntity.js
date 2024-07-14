
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const { Unique } = require('typeorm');

const userSchema = mongoose.Schema({
    userId: {
        type: Number,
        kMaxLength: 50
    },
    username: {
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
        type: Number,
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
    created_at: {
        type: String,
        trim: true,
        kMaxLength: 50
    },
    updated_at: {
        type: String,
        trim: true,
        kMaxLength: 50
    },


})

userSchema.pre('save', (next) => {
    //비밀번호 암호화 하기
    //Salt를 먼저 생성
    //saltRounds 몇글자로 할 건지
    //Salt를 이용해서 비밀번호 암호화

    var user = this; // 여기서 this는 해당 스키마가 실행되는 인스턴스를 바라 보기 때문에 userSchema가 됨

    if (user.isModfifed('password')) {
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, function(err, hash){
                // Store hash in your password DB.
                if (err) {
                    return next(err);
                }
                user.password = hash
                next();
            });
        });

    }
})

// userSchema.pre('save', function(next) {
//     // 여기서 this는 mongoose.Schema.Document 객체를 가리킴
//     if (this.isModified('password')) {
//       bcrypt.genSalt(saltRounds, function(err, salt) {
//         if (err) {
//           return next(err);
//         }
//         bcrypt.hash(this.password, salt, function(err, hash) {
//           if (err) {
//             return next(err);
//           }
//           this.password = hash;
//           next();
//         }.bind(this)); // this를 바인딩해야 함
//       });
//     } else {
//       next();
//     }
//   });
  

const User = mongoose.model('User', userSchema);

module.exports = { User };