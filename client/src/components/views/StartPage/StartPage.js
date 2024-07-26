import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Col, Card, Row } from 'antd';
import { RocketOutlined } from '@ant-design/icons';
import ImageSlider from '../../../utils/ImageSlider';


const { Meta } = Card;

function StartPage(props) {
    const [Products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("/api/product/getProduct")
            .then(res => {
                if (res.data.success) {
                    setProducts(res.data.products);
                } else {
                    alert('Failed to get products');
                }
            })
    }, []);

    const onLogoutHandler = async () => {
        try {
            const res = await axios.get("/api/users/logout");
            if (res.data.success) {
                navigate("/login");
                console.log("로그아웃 완료");
            } else {
                console.log("로그아웃 실패");
            }
        } catch (error) {
            console.error("로그아웃 중 오류 발생", error);
        }
    }

    const onLoginHandler = () => navigate("/login");
    const onSignUpHandler = () => navigate("/signUp");
    const onProductPageHandler = () => navigate("/product/upload");
    const renderCards =
        Products.map((product, index) => {
            return (
                <Col lg={6} md={8} xs={24}>
                    <Card
                        hoverable={true}

                        cover={<a href={`/product/${product._id}`}><ImageSlider images={product.images} /></a>}
                    >
                        <a href={`/product/${product._id}`}><Meta title={product.title} description={product.description} /></a>
                    </Card>
                </Col>
            )
        })


    return (

        <div style={{ width: '75%', margin: '3rem auto' }}>
            <div style={{ textAlign: 'center' }}>
                <h2>Welcome to Our App<RocketOutlined /></h2>
            </div>

            {Products.length === 0 ?
                <div style={{ display: 'flex', height: '300px', justifyContent: 'center', alignItems: 'center' }}>
                    <h2>로그인 후 이용해주세요</h2>
                    <br />


                </div>
                :
                <div>
                    <Row gutter={[16, 16]}>
                        {renderCards}
                    </Row>
                </div>
            }
            <div>
                <Button onClick={onLoginHandler}>Login</Button>
                <Button onClick={onSignUpHandler}>Sign Up</Button>
                <Button onClick={onLogoutHandler}>Logout</Button>
                <Button onClick={onProductPageHandler}>Upload Product</Button>

            </div>
            <br />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button onClick={""}>Load More</Button>
            </div>

        </div>

    )
}

export default StartPage;