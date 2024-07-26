import React, { useEffect, useState } from 'react';
import ImageGallery from 'react-image-gallery';

function ProductImage(props) {
    const [Images, setImages] = useState([]);

    useEffect(() => {
        console.log("===!props!===", props);
        // props.detail이 존재하고, 배열이며, 첫 번째 요소가 존재하는지 확인
        if (props.detail && props.detail.length > 0 && props.detail[0].images && props.detail[0].images.length > 0) {
            let images = [];
            console.log("===조건문 들어옴1===");
            props.detail[0].images.map(item => {
                console.log("===조건문 들어옴2===");
                images.push({
                    original: `/${item}`, // 경로 수정
                    thumbnail: `/${item}` // 경로 수정
                });
            });
            setImages(images);
        }
    }, [props.detail]);

    return (
        <div>
            <ImageGallery items={Images} />
        </div>
    );
}

export default ProductImage;