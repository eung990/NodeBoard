import React, { useState, useEffect } from 'react'
import Dropzone from 'react-dropzone';
import { UploadOutlined } from '@ant-design/icons'
import axios from 'axios';
import imageCompression from 'browser-image-compression';

function FileUpload(props) {
    const [Images, setImages] = useState([])

    useEffect(() => {
        if (props.initialImages && props.initialImages.length > 0) {
            setImages(props.initialImages);
            console.log("====props.initialImages :", props.initialImages)
        }
    }, [props.initialImages]);

    const compressImage = async (file) => {
        const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 1280,
            useWebWorker: true
        }
        try {
            const compressedFile = await imageCompression(file, options);
            return compressedFile;
        } catch (error) {
            console.error("이미지 압축 실패:", error);
            return file;
        }
    }

    const onDrop = async (files) => {
        let formData = new FormData();
        const config = {
            header: { 'content-type': 'multipart/form-data' },
            timeout: 30000 
        }

        for (let file of files) {
            const compressedFile = await compressImage(file);
            formData.append("files", compressedFile);
        }

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
                maxSize={20 * 1024 * 1024}
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

                console.log('업로드시 image 파일명 확인', image),
                    <div onClick={() => onDelete(image)}>
                        <img style={{ minWidth: '300px', width: '300px', height: '240px' }} src={`/${image}`} alt={`productImg-${index}`} />
                    </div>

                ))}


            </div>

        </div>
    )
}

export default FileUpload
