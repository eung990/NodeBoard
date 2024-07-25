import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Col, Card, Row } from 'antd';
import { RocketOutlined } from '@ant-design/icons';
import ImageSlider from '../../../utils/ImageSlider';
import styled from 'styled-components';

const { Meta } = Card;

// const PageContainer = styled.div`F
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   height: 100vh;
//   background-color: #f0f2f5;
// `;

// const Title = styled.h1`
//   color: #1a73e8;
//   margin-bottom: 2rem;
//   font-size: 2.5rem;
// `;

// const ButtonContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 1rem;
// `;

// const StyledButton = styled.button`
//   padding: 10px 20px;
//   font-size: 1rem;
//   color: white;
//   background-color: #1a73e8;
//   border: none;
//   border-radius: 5px;
//   cursor: pointer;
//   transition: background-color 0.3s ease;

//   &:hover {
//     background-color: #1557b0;
//   }
// `;

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
                navigate("/LoginPage");
                console.log("로그아웃 완료");
            } else {
                console.log("로그아웃 실패");
            }
        } catch (error) {
            console.error("로그아웃 중 오류 발생", error);
        }
    }

    const onLoginHandler = () => navigate("/LoginPage");
    const onSignUpHandler = () => navigate("/SignUpPage");
    const onProductPageHandler = () => navigate("/ProductPage/upload");
    const renderCards =
        Products.map((product, index) => {
            return (
                <Col lg={6} md={8} xs={24}>
                    <Card
                        hoverable={true}

                        cover={<ImageSlider images={product.images} />}
                    >
                        <Meta title={product.title} description={product.description} />
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
                    <h2>없어용 암것두</h2>
                </div>
                :
                <div>
                    <Row gutter={[16, 16]}>
                        {renderCards}
                    </Row>
                </div>
            }

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button onClick={onProductPageHandler}>Load More</Button>
            </div>
            {/* <PageContainer>
                <Title>Welcome to Our App</Title>
                <ButtonContainer>
                    <StyledButton onClick={onLogoutHandler}>Logout</StyledButton>
                    <StyledButton onClick={onLoginHandler}>Login</StyledButton>
                    <StyledButton onClick={onSignUpHandler}>Sign Up</StyledButton>
                    <StyledButton onClick={onProductPageHandler}>Product Page</StyledButton>
                </ButtonContainer>
            </PageContainer> */}
        </div>

    )
}

export default StartPage;