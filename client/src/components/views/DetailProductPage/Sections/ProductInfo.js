
import React, { useEffect, useState } from 'react';
import { Button, Descriptions } from 'antd';

function ProductInfo(props) {
    const [ProductInfo, setProductInfo] = useState({});

    useEffect(() => {
        if (props.detail && props.detail.length > 0) { // props.detail이 존재하고 배열인지 확인
            setProductInfo(props.detail[0]);
        }
    }, [props.detail]);

    return (
        <div>
            <Descriptions title={ProductInfo.title || "No Title"}> {/* 기본값 설정 */}
                <Descriptions.Item label="Title">{ProductInfo.title || "N/A"}</Descriptions.Item>
                <Descriptions.Item label="Description">{ProductInfo.description || "N/A"}</Descriptions.Item>
                <Descriptions.Item label="Continents">{ProductInfo.continents || "N/A"}</Descriptions.Item>
            </Descriptions>
        </div>
    );
}

export default ProductInfo;