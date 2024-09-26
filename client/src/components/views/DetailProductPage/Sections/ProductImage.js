import React, { useEffect, useState } from 'react';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import '../../../../css/ProductImage.css';

function ProductImage({ detail }) {
    const [images, setImages] = useState([]);

    useEffect(() => {
        if (detail && detail.length > 0 && detail[0].images && detail[0].images.length > 0) {
            const imageItems = detail[0].images.map(item => ({
                original: `/${item}`,
                thumbnail: `/${item}`
            }));
            setImages(imageItems);
        }
    }, [detail]);

    return (
        <div className="product-image-container">
            <ImageGallery items={images} />
        </div>
    );
}

export default ProductImage;