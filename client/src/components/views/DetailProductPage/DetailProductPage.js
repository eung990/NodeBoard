import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Row, Col } from 'antd'
import ProductImage from './Sections/ProductImage'
import ProductInfo from './Sections/ProductInfo'

function DetailProductPage(props) {

    // console.log("===props===",props);
    // const  productId  = props.match.params.productId;
    const { productId } = useParams();
  
    const [Product, setProduct] = useState([]);
    console.log("=====productId==",productId)
    useEffect(() => {
        axios.get(`/api/product/products_by_id?id=${productId}&type=single`)
            .then(response => {
                setProduct(response.data.product);
                console.log("===response.data.product==",response.data.product);
            })
            .catch(error => {
                console.log(error);
            })
    }, [])
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

        </div>
    )
}

export default DetailProductPage
