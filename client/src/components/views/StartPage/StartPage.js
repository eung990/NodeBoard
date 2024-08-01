import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Col, Card, Row } from 'antd';
import { BulbOutlined } from '@ant-design/icons';
import ImageSlider from '../../../utils/ImageSlider';
import SearchFeature from './Sections/SearchFeature';


const { Meta } = Card;

function StartPage() {
    const [Products, setProducts] = useState([]);
    const [Skip, setSkip] = useState(0)
    const [Limit, setLimit] = useState(8)
    const [PostSize, setPostSize] = useState()
    const [SearchTerms, setSearchTerms] = useState("")

    const [Filters, setFilters] = useState({
        continents: [],
        price: []
    })


    const navigate = useNavigate();

    useEffect(() => {
        const variables = {
            skip: Skip,
            limit: Limit,
        }


        getProduct(variables)
    }, []);

    const getProduct = (variables) => {
        axios.post("/api/product/getProduct", variables)
            .then(res => {
                if (res.data.success) {
                    if (variables.loadMore) {
                        setProducts(prevProducts => [...prevProducts, ...res.data.products]);
                    } else {
                        setProducts(res.data.products);
                    }
                    setPostSize(res.data.postSize)
                } else {
                    alert('Failed to get products');
                }
            })
            .catch(err => {
                console.error("Error fetching products:", err);
                alert('Failed to get products');
            });
    }

    const onLoadMore = () => {
        let skip = Skip + Limit;
        const variables = {
            skip: skip,
            limit: Limit,
            loadMore: true,
            // fileter: ,
            searchTerm: SearchTerms
        }
        getProduct(variables);
        setSkip(skip);
    }

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

    const updateSearchTerms = (newSearchTerm) => {

        const variables = {
            skip: 0,
            limit: Limit,
            filters: Filters,
            searchTerm: newSearchTerm
        }

        setSkip(0)
        setSearchTerms(newSearchTerm)

        getProduct(variables)
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
                <h2>심리상담사 <BulbOutlined  /></h2>
            </div>

            {/* Search  */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '1rem auto' }}>

                <SearchFeature
                    refreshFunction={updateSearchTerms}
                />

            </div>


            {Products.length === 0 ?
                <div style={{ display: 'flex', height: '300px', justifyContent: 'center', alignItems: 'center' }}>
                    <h2>글이 없어요..</h2>
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

            {PostSize >= Limit && <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button onClick={onLoadMore}>Load More</Button>
            </div>}


        </div>

    )
}

export default StartPage;