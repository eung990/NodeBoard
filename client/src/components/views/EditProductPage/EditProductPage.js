import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Typography, Button, Form, Input, Select, message, Card } from 'antd';
import { UploadOutlined, SaveOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import FileUpload from "../../../utils/FileUpload";
import axios from "axios";
import Continents from '../../../utils/Continents';
import '../../../css/UploadProductPage.css';

const { Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;

function EditProductPage() {
    const navigate = useNavigate();
    const { productId } = useParams();
    const user = useSelector(state => state.user);
    const [form] = Form.useForm();

    const [TitleValue, setTitle] = useState("");
    const [DescriptionValue, setDescription] = useState("");
    const [ContinentValue, setInfo] = useState(1);
    const [Images, setImages] = useState([]);

    useEffect(() => {
        axios.get(`/api/product/products_by_id?id=${productId}&type=single`)
            .then(response => {
                const res = response.data.product[0];
                setTitle(res.title);
                setDescription(res.description);
                setInfo(res.continents);
                setImages(res.images);
                form.setFieldsValue({
                    title: res.title,
                    description: res.description,
                    continent: res.continents
                });
            }).catch(err => {
                console.log("=====EditError", err);
            });
    }, [productId, form]);

    const updateImages = (newImages) => {
        setImages(newImages);
    };

    const onSubmit = (values) => {
        if (Images.length === 0) {
            return message.error('Please upload at least one image!');
        }

        const variables = {
            _id: productId,
            writer: user.authSuccess.data._id,
            title: values.title,
            description: values.description,
            images: Images,
            continents: values.continent,
        };

        axios.post('/api/product/updateProduct', variables)
            .then(response => {
                if (response.data.success) {
                    message.success('업데이트 완료');
                    navigate('/');
                } else {
                    message.error('업데이트 실패');
                }
            });
    };

    return (
        <div className="upload-product-container">
            <Card className="upload-product-card">
                <Title level={2} className="upload-product-title">
                    <UploadOutlined /> Edit Travel Product
                </Title>

                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onSubmit}
                    className="upload-product-form"
                >
                    <Form.Item
                        name="images"
                        label="사진"
                    >
                        <FileUpload refreshFunction={updateImages} initialImages={Images} />
                    </Form.Item>

                    <Form.Item
                        name="title"
                        label="제목"
                        rules={[{ required: true, message: '제목을 입력해주세요!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="description"
                        label="내용"
                        rules={[{ required: true, message: '내용을 입력해주세요!' }]}
                    >
                        <TextArea rows={4} />
                    </Form.Item>

                    <Form.Item
                        name="continent"
                        label="카테고리"
                        rules={[{ required: true, message: '카테고리를 선택해주세요!' }]}
                    >
                        <Select>
                            {Continents.map(item => (
                                <Option key={item.key} value={item.value}>{item.value}</Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item className="upload-product-buttons">
                        <Button type="default" onClick={() => navigate('/')} icon={<ArrowLeftOutlined />}>
                            취소
                        </Button>
                        <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
                            업데이트
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
}

export default EditProductPage;