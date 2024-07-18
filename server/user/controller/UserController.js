const User = require("../model/UserModel")
const { auth } = require("../../middleware/auth")

const input = {
    login: async (req, res) => {
        //요청된 id,pw가 db에 있는지 확인
        //있으면 비교 후 맞다면 토큰 생성
      
        // const user =  new User(req.body);
      
        await User.findOne({ email: req.body.email })
          .then((user) => {
            if (!user) {
              return res.json({
                loginSuccess: false,
                message: "계정이 존재하지 않습니다"
              })
            }
      
            user.comparePassword(req.body.password, (err, isMatch) => {
              if (!isMatch) {
                return res.json({
                  loginSuccess: false,
                  message: "비밀번호가 틀렸습니다"
                });
              }
              user.generateToken((err, user) => {
                if (err) return res.status(400).send(err);
      
                res.cookie("x_auth", user.token)
                  .status(200)
                  .json({ loginSuccess: true, _id: user._id })
              })
            })
      
          })
      
          .catch((err) => {
            console.log(err);
          });
      },

      signUp : async (req, res) => {
        const user = new User(req.body)
        console.log('=====user======= ' + user + ' ============')
        try {
          const isEmail = await User.findOne({ email: req.body.email });
          if (isEmail) return res.json({ success: false, message: "이미 존재하는 이메일입니다" });
          const isName = await User.findOne({ userName: req.body.userName });
          if (isName) return res.json({ success: false, message: "이미 존재하는 이름입니다" });
      
          await user.save();
          return res.status(200).json({ success: true })
        } catch (err) {
          console.log('============ ' + err + ' ============')
          return res.json({ success: false, err })
        }
      }
}

module.exports = {
    input
}