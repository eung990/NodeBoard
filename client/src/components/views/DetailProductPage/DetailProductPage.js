import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Row, Col, Button, Typography, Space, Divider, } from 'antd'
import ProductImage from './Sections/ProductImage'
import ProductInfo from './Sections/ProductInfo'
import Comment from './Sections/Comment'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { LeftOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

function DetailProductPage(props) {
    const { productId } = useParams();
    const navigate = useNavigate();
    const user = useSelector(state => state.user);

    const [Product, setProduct] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get(`/api/product/products_by_id?id=${productId}&type=single`)
            .then(response => {
                setProduct(response.data.product);
                setIsLoading(false);
            })
            .catch(error => {
                console.log(error);
                setIsLoading(false);
            })
    }, [productId]);

    if (isLoading) {
        return <div>Loading...</div>;
    }


    const handleGoBack = () => {
        navigate(-1); // 이전 페이지로 이동
    }

    const handleUpdateProduct = () => {
        navigate(`/product/update/${productId}`)
    }


    const handleDeleteProduct = () => {
        console.log("===handleDeleteProduct==")
        axios.delete(`/api/product/delete_product?id=${productId}`)
            .then(response => {
                console.log("===제품 ID==", productId);
                navigate('/')
            })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <div className='product_detail_page' style={{
            width: '100%',
            padding: '1rem',
            backgroundColor: '#ffffff'
        }}>
            <Row gutter={[16, 16]}>
                <Col xs={24} sm={24} md={12}>
                    <div style={{
                        borderRadius: '8px',
                        overflow: 'hidden',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}>
                        <ProductImage detail={Product} />
                    </div>
                </Col>
                <Col xs={24} sm={24} md={12}>
                    <Space direction="vertical" size="large" style={{ display: 'flex', width: '100%' }}>
                        <div>
                            <Title level={3} style={{ marginBottom: '0.25rem' }}>
                                {Product[0]?.title}</Title>

                        </div>

                        <Divider style={{ margin: '12px 0' }} />

                        <div>
                            <Title level={4}>강사 이력</Title>
                            <Paragraph>
                                {Product[0]?.description}
                            </Paragraph>
                        </div>

                        <Divider style={{ margin: '12px 0' }} />

                        <div>
                            <Title level={5}>한 눈에 보기</Title>

                        </div>

                        <ProductInfo detail={Product} />

                        <Space style={{ width: '100%', justifyContent: 'space-between' }}>
                            <Button icon={<LeftOutlined />} onClick={handleGoBack}>뒤로가기</Button>
                            {Product[0].writer._id === user?.authSuccess?.data?._id && (
                                <Space>
                                    <Button onClick={handleUpdateProduct}>수정</Button>
                                    <Button danger onClick={handleDeleteProduct}>삭제</Button>
                                </Space>
                            )}
                        </Space>
                        <Divider style={{ margin: '12px 0' }} />
                        <br />
                        <div>
                            <Comment detail={Product} />
                        </div>
                    </Space>
                </Col>
            </Row>
        </div>
    )
}

export default DetailProductPage