const { Product } = require('../model/ProductModel')
const multer = require('multer')
const fs = require('fs');
const ImageUpload = "/ImageUpload"

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'ImageUpload/')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`)
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if (ext !== '.jpg' || ext !== '.png') {
            return cb(res.status(400).end('only'))
        }
    },
})

var upload = multer({ storage: storage }).single("file")

const input = {

    uploadImage: (req, res) => {
        upload(req, res, err => {
            if (err) {
                console.log("======err======", err)
                return res.json({ success: false, err })
            }
            if (!fs.existsSync(ImageUpload)) {
                fs.mkdirSync(ImageUpload);
            }
            return res.json({ success: true, image: res.req.file.path, fileName: res.req.file.filename })
        })
    },

    uploadProduct: async (req, res) => {
        try {
            console.log("======req.body======", req.body);
            const product = new Product(req.body);
            await product.save();
            return res.status(200).json({ success: true });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ success: false, error: err.message });
        }
    },

    getProduct: async (req, res) => {
        try {
            const products = await Product.find();
            console.log("======products======", products)
            return res.status(200).json({ success: true, products });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ success: false, error: err.message });
        }
    },

    getProductById: async (req, res) => {

        let type = req.query.type;
        let id = req.query.id;
        console.log("req.query.id", req.query.id)

        if (type === "array") {
            let ids = req.query.id.split(',');
            id = [];
            id = ids.map(item => {
                return item
            })
        }
    
        try {
            // {_id:{&in:id}}에서 in 연산자는 배열 안의 값과 일치하는 값을 찾는다.
            const product = await Product.find({ _id: { $in: id } })
                .populate("writer")

            return res.status(200).json({ success: true, product });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ success: false, error: err.message });
        }
    }
}

module.exports = {
    input
}