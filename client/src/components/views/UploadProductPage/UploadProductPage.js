import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Continents from '../../../utils/Continents';
import { Typography, Button, Form, Input } from 'antd';
import FileUpload from "../../../utils/FileUpload";

import axios from "axios";

const { Title } = Typography;
const { TextArea } = Input;



function UploadProductPage(props) {

    const navigate = useNavigate();
    console.log('props:', props);
    const [TitleValue, setTitle] = useState("");
    const [DescriptionValue, setDescription] = useState("");
    const [ContinentValue, setInfo] = useState(1);
    const [Images, setImages] = useState([])


    const onTitleHandler = (event) => {

        setTitle(event.currentTarget.value)

    }

    const onDescriptionHandler = (event) => {
        setDescription(event.currentTarget.value)

    }

    const updateImages = (newImages) => {
        setImages(newImages)
    }

    const onInfoHandler = (event) => {
        setInfo(event.currentTarget.value)
    }

    const onBackHandler = (event) => {
        navigate('/')
    }

    const onSubmit = (event) => {
        event.preventDefault();
        console.log('ContinentValue:', ContinentValue);
        console.log('authSuccess:', props.authSuccess);

        if (!TitleValue || !DescriptionValue ||
            !ContinentValue || !Images) {
            return alert('fill all the fields first!')
        }
        const variables = {
            writer: props.user.authSuccess.data._id,
            title: TitleValue,
            description: DescriptionValue,
            images: Images,
            continents: ContinentValue,
        }


        axios.post('/api/product/uploadProduct', variables)
            .then(response => {
                if (response.data.success) {
                    alert('Product Successfully Uploaded')
                    navigate('/')
                } else {
                    alert('Failed to upload Product')
                }
            })

    }

    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Title level={2}> Upload Travel Product</Title>
            </div>

            <Form  >

                {/* DropZone */}
                <FileUpload refreshFunction={updateImages} />
                <br />
                <br />
                <label>Title</label>
                <Input
                    onChange={onTitleHandler}
                    value={TitleValue} />

                <br />
                <br />
                <label>Description</label>
                <TextArea
                    onChange={onDescriptionHandler}
                    value={DescriptionValue} />

                <br />
                <br />
                <label>Info</label>
                <select onChange={onInfoHandler}>
                    {Continents.map(item => (
                        <option key={item.key} value={item.value}>{item.value}</option>
                    ))}
                </select>



                <br />
                <br />
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                    <Button type="button" onClick={onBackHandler} style={{ backgroundColor: '#d6d6d6' }}>취소</Button>
                    <Button type="button" onClick={onSubmit} style={{ backgroundColor: '#8BC34A' }}>저장</Button>
                </div>


            </Form>

        </div>

    )
}

export default UploadProductPage