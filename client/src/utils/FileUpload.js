import React, { useState, useEffect } from 'react'
import Dropzone from 'react-dropzone';
import { UploadOutlined } from '@ant-design/icons'
import axios from 'axios';
function FileUpload(props) {

    const [Images, setImages] = useState([])

    useEffect(() => {
        if (props.initialImages && props.initialImages.length > 0) {
            setImages(props.initialImages);
            console.log("====props.initialImages :", props.initialImages)
        }
    }, [props.initialImages]);

    const onDrop = (files) => {
        let formData = new FormData();
        const config = {
            header: { 'content-type': 'multipart/form-data' }
        }
        files.forEach(file => {
            formData.append("files", file)
        });
        axios.post('/api/product/uploadImage', formData, config)
            .then(response => {
                if (response.data.success) {
                    const newImages = response.data.images.map(img => img.path);
                    setImages(prevImages => [...prevImages, ...newImages]);
                    props.refreshFunction([...Images, ...newImages]);
                } else {
                    alert('Failed to save the Images in Server')
                }
            })
    }





    const onDelete = (image) => {
        const currentIndex = Images.indexOf(image);

        let newImages = [...Images]
        newImages.splice(currentIndex, 1)

        setImages(newImages)
        props.refreshFunction(newImages)
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Dropzone
                onDrop={onDrop}
                multiple={true}
                maxSize={800000000}
            >
                {({ getRootProps, getInputProps }) => (
                    <div style={{
                        width: '300px', height: '240px', border: '1px solid lightgray',
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}
                        {...getRootProps()}
                    >
                        {console.log('getRootProps', { ...getRootProps() })}
                        {console.log('getInputProps', { ...getInputProps() })}
                        <input {...getInputProps()} />
                        <UploadOutlined type="plus" style={{ fontSize: '8rem' }} />

                    </div>
                )}
            </Dropzone>

            <div style={{ display: 'flex', width: '350px', height: '240px', overflowX: 'scroll' }}>

                {Images.map((image, index) => (
                    <div onClick={() => onDelete(image)}>
                        <img style={{ minWidth: '300px', width: '300px', height: '240px' }} src={`/${image}`} alt={`productImg-${index}`} />
                    </div>
                ))}


            </div>

        </div>
    )
}

export default FileUpload
