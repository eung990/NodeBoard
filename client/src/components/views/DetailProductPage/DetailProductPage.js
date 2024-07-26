import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Row, Col, Button } from 'antd'
import ProductImage from './Sections/ProductImage'
import ProductInfo from './Sections/ProductInfo'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function DetailProductPage(props) {

    // console.log("===props===",props);
    // const  productId  = props.match.params.productId;
    const { productId } = useParams();
    const navigate = useNavigate();
    const user = useSelector(state => state.user);


    const [Product, setProduct] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
 
    console.log("=====Product==", Product)
    console.log("=====user?.authSuccess?.data?._id==", user?.authSuccess?.data?._id)
    useEffect(() => {
        axios.get(`/api/product/products_by_id?id=${productId}&type=single`)
            .then(response => {
                setProduct(response.data.product);
                setIsLoading(false);
                console.log("===response.data.product==", response.data.product);
            })
            .catch(error => {
                console.log(error);
                setIsLoading(false);
            })
    }, [productId]);

    // 로딩 중일 때 로딩 화면 보여주기, 비동기작업이 완료 되기 전까지 undefined 상태 받아오는 걸 예방
    if (isLoading) {
        return <div>Loading...</div>;
        
    }const handleUpdateProduct = () => {
        console.log("===handleUpdateProduct==")
        navigate(`/product/update/${Product._id}`)
    }

    const handleDeleteProduct = () => {
        console.log("===handleDeleteProduct==")
        axios.delete(`/api/product/delete_product?id=${productId}`)
            .then(response => {
                console.log("===response.data.product==", response.data.product);
                navigate('/')
            })
            .catch(error => {
                console.log(error);
            })
    }
    return (
        <div className='product_detail_page' style={{ width: '100%', padding: '3rem 4rem' }}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <h2>{Product.title}</h2>
            </div>
            <Row gutter={[16, 16]}>
                <Col lg={12} xs={24}>
                    <ProductImage detail={Product} />
                </Col>
                <Col lg={12} xs={24}>
                    <ProductInfo detail={Product} />
                </Col>

            </Row>

            <div>{Product[0].writer._id === user.authSuccess.data._id ? (
                <>
                    <Button onClick={handleUpdateProduct}>수정</Button>
                    <Button onClick={handleDeleteProduct}>삭제</Button>
                    
                </>
            )
                :
                <div> 수정/삭제 권한이 없습니다. 작성자만 수정/삭제 할 수 있어용 </div>
            }
            </div>
        </div >
    )
}

export default DetailProductPage
