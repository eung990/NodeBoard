import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Row, Col, Button, Typography, Space, Divider, Spin, Card, Tag } from 'antd'
import { LeftOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import ProductImage from './Sections/ProductImage'
import CommentPage from './Sections/CommentPage'
import { useSelector } from 'react-redux'
import axios from 'axios'
import '../../../css/Detail.css'

const { Title, Paragraph, Text } = Typography

function DetailProductPage() {
    const { productId } = useParams()
    const navigate = useNavigate()
    const user = useSelector(state => state.user)
    const [product, setProduct] = useState(null)
    const [comments, setComments] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [productRes, commentsRes] = await Promise.all([
                    axios.get(`/api/product/products_by_id?id=${productId}&type=single`),
                    axios.get(`/api/comment/getComment?productId=${productId}`)
                ])
                setProduct(productRes.data.product[0])
                setComments(commentsRes.data.comments)
            } catch (error) {
                console.error("Error fetching data:", error)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [productId])

    const handleGoBack = () => navigate(-1)
    const handleUpdateProduct = () => navigate(`/product/update/${productId}`)
    const handleDeleteProduct = async () => {
        try {
            await axios.delete(`/api/product/delete_product?id=${productId}`)
            navigate('/')
        } catch (error) {
            console.error("Error deleting product:", error)
        }
    }

    const refreshComments = (newComment) => setComments(comments.concat(newComment))

    if (loading) return <Spin size="large" className="loading-spinner" />

    return (
        <div className='product-detail-page'>
            <Card className="product-card">
                <Row gutter={[16, 16]}>
                    <Col xs={24} md={12}>
                        <ProductImage detail={[product]} />
                    </Col>
                    <Col xs={24} md={12}>
                        <Space direction="vertical" size="large" style={{ width: '100%' }}>
                            <Title level={3}>{product?.title}</Title>
                            <Space>
                                <Tag color="blue">{product?.category}</Tag>
                                <Text type="secondary">작성자: {product?.writer.userName}</Text>
                            </Space>
                            <Divider />
                            <div style={{ minHeight: '200px' }}>
                                <Title level={4}>내용</Title>
                                <Paragraph>{product?.description}</Paragraph>
                            </div>
                            <Divider />
                            <Space className="action-buttons">
                                <Button icon={<LeftOutlined />} onClick={handleGoBack}>뒤로가기</Button>
                                {(product?.writer._id === user?.authSuccess?.data?._id || user?.authSuccess?.data?.role === "admin") && (
                                    <>
                                        <Button icon={<EditOutlined />} onClick={handleUpdateProduct} style={{ marginRight: '8px' }}>수정</Button>
                                        <Button danger icon={<DeleteOutlined />} onClick={handleDeleteProduct}>삭제</Button>
                                    </>
                                )}
                            </Space>
                        </Space>
                    </Col>
                </Row>
            </Card>
            <Card className="comments-card">
                {user?.authSuccess?.data?.isAuth ? (
                    <CommentPage
                        refreshComments={refreshComments}
                        commentList={comments}
                        productId={productId}
                    />
                ) : (
                    <div>로그인 후 이용할 수 있어용..</div>
                )}
            </Card>
        </div>
    )
}

export default DetailProductPage