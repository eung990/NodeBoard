import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Continents from '../../../utils/Continents';
import { Typography, Button, Form, Input, Select, message, Card } from 'antd';
import { UploadOutlined, SaveOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import FileUpload from "../../../utils/FileUpload";
import axios from "axios";
import '../../../css/UploadProductPage.css';

const { Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;

function UploadProductPage(props) {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [images, setImages] = useState([]);

    const updateImages = (newImages) => {
        setImages(newImages);
    }

    const onFinish = (values) => {
        // if (images.length === 0) {
        //     return message.error('Please upload at least one image!');
        // }

        const variables = {
            writer: props.user.authSuccess.data._id,
            title: values.title,
            description: values.description,
            images: images,
            continents: values.continent,
        }

        axios.post('/api/product/uploadProduct', variables)
            .then(response => {
                if (response.data.success) {
                    message.success('업로드 성공');
                    navigate('/');
                } else {
                    message.error('업로드 실패');
                }
            })
    }

    return (
        <div className="upload-product-container">
            <Card className="upload-product-card">
                <Title level={2} className="upload-product-title">
                    <UploadOutlined /> Upload Travel Product
                </Title>

                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    className="upload-product-form"
                >
                    <Form.Item
                        name="images"
                        label="사진"
                       
                    >
                        <FileUpload refreshFunction={updateImages} />
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
                            저장
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default UploadProductPage;