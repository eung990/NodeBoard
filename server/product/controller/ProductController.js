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

var upload = multer({ storage: storage }).array("files", 5) // 최대 5개 파일 허용

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
            const uploadedFiles = req.files.map(file => ({
                path: file.path.replace(/\\/g, '/'),
                filename: file.filename
            }));
            return res.json({ success: true, images: uploadedFiles })
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

    updateProduct: async (req, res) => {
        try {
            console.log("======req.body======", req.body);
            await Product.updateOne({ _id: req.body._id }, { $set: { title: req.body.title, description: req.body.description, continents: req.body.continents, images: req.body.images } });

            return res.status(200).json({ success: true });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ success: false, error: err.message });
        }
    },


    getProduct: async (req, res) => {
        try {
            const { searchTerm, order = "desc", sortBy = "_id", limit = 100, skip = 0 } = req.body;
            
            let query = {};
            if (searchTerm) {
                //RegExp 객체 생성: JavaScript의 내장 클래스로, 정규 표현식 객체를 생성합니다.
                // 문자열 패턴을 검색하고 매칭하는 데 사용됩니다.
                const regex = new RegExp(searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
                query = {
                    $or: [
                        { title: regex },
                        { description: regex  }
                    ]
                };
            }
    
            const products = await Product.find(query)
                .populate("writer")
                .sort([[sortBy, order]])
                .skip(Number(skip))
                .limit(Number(limit));
    
            res.status(200).json({ 
                success: true, 
                products, 
                postSize: products.length 
            });
    
        } catch (err) {
            console.error(err);
            res.status(500).json({ success: false, error: err.message });
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
    },

    deleteProduct: async (req, res) => {
        try {
            await Product.findByIdAndDelete(req.query.id);
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