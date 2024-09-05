import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Row, Col, Button, Typography, Space, Divider, Spin, Card, Tag } from 'antd'
import { LeftOutlined, EditOutlined, DeleteOutlined, TagOutlined, UserOutlined } from '@ant-design/icons'
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
            const confirmDelete = window.confirm("이 게시글을 삭제하면 모든 관련 항목이 함께 삭제됩니다. 계속하시겠습니까?");
            if (!confirmDelete) return;
            await axios.delete(`/api/product/delete_product?id=${productId}`)
            navigate('/')
        } catch (error) {
            console.error("Error deleting product:", error)
        }
    }

    const refreshComments = async () => {
        try {
            const response = await axios.get(`/api/comment/getComment?productId=${productId}`);
            console.log("response.data.comments===", response.data.comments)
            setComments(response.data.comments);
        } catch (error) {
            console.error("Error refreshing comments:", error);
        }
    };

    if (loading) return <Spin size="large" className="loading-spinner" />

    return (
        <div className='product-detail-page'>
            <Card className="product-card" bordered={false}>
                <Row gutter={[32, 32]}>
                    <Col xs={24} md={12}>
                        <ProductImage detail={[product]} />
                    </Col>
                    <Col xs={24} md={12}>
                        <Space direction="vertical" size="large" style={{ width: '100%' }}>
                            <Title level={2}>{product?.title}</Title>
                            <Space size={[0, 8]} wrap>
                                <Tag icon={<TagOutlined />} color="blue">{product?.continents}</Tag>
                                <Tag icon={<UserOutlined />} color="default">
                                    작성자: {product?.writer.userName}
                                </Tag>
                            </Space>
                            <Divider style={{ margin: '16px 0' }} />
                            <div style={{ minHeight: '200px' }}>
                                {/* <Title level={4}>내용</Title> */}
                                <Paragraph style={{ fontSize: '16px', lineHeight: '1.6' }}>
                                    {product?.description}
                                </Paragraph>
                            </div>
                            <Divider style={{ margin: '16px 0' }} />
                            <Space className="action-buttons" wrap>
                                <Button icon={<LeftOutlined />} onClick={handleGoBack}>
                                    뒤로가기
                                </Button>
                                {(product?.writer._id === user?.authSuccess?.data?._id || user?.authSuccess?.data?.role === "admin") && (
                                    <Space size={4}>  {/* 여기에 작은 Space 추가 */}
                                        <Button icon={<EditOutlined />} onClick={handleUpdateProduct} type="primary">
                                            수정
                                        </Button>
                                        <Button danger icon={<DeleteOutlined />} onClick={handleDeleteProduct}>
                                            삭제
                                        </Button>
                                    </Space>
                                )}
                            </Space>
                        </Space>
                    </Col>
                </Row>
            </Card>
            <Card className="comments-card" bordered={false} style={{ marginTop: '24px' }}>
                <Title level={4} style={{ marginBottom: '16px' }}>댓글</Title>
                {user?.authSuccess?.data?.isAuth ? (
                    <CommentPage
                        refreshComments={refreshComments}
                        commentList={comments}
                        productId={productId}
                    />
                ) : (
                    <div style={{ textAlign: 'center', padding: '24px', background: '#f0f2f5', borderRadius: '4px' }}>
                        로그인 후 이용할 수 있습니다.
                    </div>
                )}
            </Card>
        </div>
    )
}

export default DetailProductPage