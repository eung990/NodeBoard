import React from 'react';
import { Descriptions, Card } from 'antd';
import '../../../../css/ProductInfo.css';

function ProductInfo({ detail }) {
    const productInfo = detail && detail.length > 0 ? detail[0] : {};

    return (
        <Card className="product-info-card">
            <Descriptions title="상품 정보" bordered>
                <Descriptions.Item label="제목">{productInfo.title || "N/A"}</Descriptions.Item>
                <Descriptions.Item label="설명">{productInfo.description || "N/A"}</Descriptions.Item>
                <Descriptions.Item label="대륙">{productInfo.continents || "N/A"}</Descriptions.Item>
            </Descriptions>
        </Card>
    );
}

export default ProductInfo;