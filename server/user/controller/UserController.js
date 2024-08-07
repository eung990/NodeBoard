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


            console.log(
              "=========x_auth=====" + user.token
            )
            return res.cookie("x_auth", user.token)
              .status(200)
              .json({ loginSuccess: true, _id: user._id })
          })
        })

      })

      .catch((err) => {
        console.log(err);
      });
  },

  signUp: async (req, res) => {
    const user = new User(req.body)
    console.log('=====user======= ' + user)
    try {
      const isEmail = await User.findOne({ email: req.body.email });
      if (isEmail) return res.json({ success: false, message: "이미 존재하는 이메일입니다" });
      const isName = await User.findOne({ userName: req.body.userName });
      if (isName) return res.json({ success: false, message: "이미 존재하는 이름입니다" });

      // 최초 회원가입자 확인 및 관리자 권한 부여
      const userCount = await User.countDocuments();
      if (userCount === 0) {
        user.role = 'admin';
        user.isAdmin = true;
      }

      await user.save();
      return res.status(200).json({ success: true })
    } catch (err) {
      console.log('============ ' + err)
      return res.json({ success: false, err })
    }
  },

  loginOut: async (req, res) => {
    //유저를 찾아서 업데이트 시킴
    console.log("====req.user._id=====" + req.user._id)
    console.log("====req.token=====" + req.token)
    // findOneAndUpdate 비동기 함수를 await로 감싸주니 값 업데이트 제대로 함
    const userUpdate = await User.findOneAndUpdate({ _id: req.user._id }, { token: "" });
    console.log("====userUpdate=====" + userUpdate)
    if (!userUpdate) {
      return res.json({
        success: false,
      })
    }

    return res.status(200).send({
      success: true
    })

  },

  userAuth: (req, res) => {
    res.status(200).json({
      _id: req.user._id,
      isAdmin: req.user.role === 0 ? false : true,
      isAuth: true,
      email: req.user.email,
      userName: req.user.name,
      role: req.user.role,

    })
  },

  findAllUsers: async (req, res) => {
    try {
      //페이지번호
      const page = parseInt(req.query.page) || 1;
      //한 페이지당 표시할 항목 수
      const limit = parseInt(req.query.limit) || 5;
      const skip = (page - 1) * limit;

      const users = await User.find().skip(skip).limit(limit);
      const total = await User.countDocuments();

      if (!users) {
        return res.status(400).json({ success: false });
      }

      res.status(200).json({
        success: true,
        users,
        totalPages: Math.ceil(total / limit),
        currentPage: page
      });
    } catch (err) {
      res.status(404).json({ success: false, error: err.message });
    }
  },
  deleteUser: async (req, res) => {
    try {
      console.log('====req.query.userId: ', req.query.userId)
      await User.findByIdAndDelete(req.query.userId);
      return res.status(200).json({ success: true });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ success: false, error: err.message });
    }
  }
}

module.exports = {
  input
}