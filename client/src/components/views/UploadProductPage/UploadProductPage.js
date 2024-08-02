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
        if (images.length === 0) {
            return message.error('Please upload at least one image!');
        }

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
                    message.success('Product Successfully Uploaded');
                    navigate('/');
                } else {
                    message.error('Failed to upload Product');
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
                        label="Images"
                       
                    >
                        <FileUpload refreshFunction={updateImages} />
                    </Form.Item>

                    <Form.Item
                        name="title"
                        label="Title"
                        rules={[{ required: true, message: 'Please input the title!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="description"
                        label="Description"
                        rules={[{ required: true, message: 'Please input the description!' }]}
                    >
                        <TextArea rows={4} />
                    </Form.Item>

                    <Form.Item
                        name="continent"
                        label="Continent"
                        rules={[{ required: true, message: 'Please select a continent!' }]}
                    >
                        <Select>
                            {Continents.map(item => (
                                <Option key={item.key} value={item.value}>{item.value}</Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item className="upload-product-buttons">
                        <Button type="default" onClick={() => navigate('/')} icon={<ArrowLeftOutlined />}>
                            Cancel
                        </Button>
                        <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
                            Save
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default UploadProductPage;