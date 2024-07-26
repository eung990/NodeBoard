import React, { useEffect, useState } from "react";
import { useNavigate,useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Typography, Button, Form, Input } from 'antd';
import FileUpload from "../../../utils/FileUpload";

import axios from "axios";

const { Title } = Typography;
const { TextArea } = Input;


const Continents = [
    { key: 1, value: "A" },
    { key: 2, value: "B" },
    { key: 3, value: "C" },
    { key: 4, value: "D" },
    { key: 5, value: "E" },
    { key: 6, value: "F" },
    { key: 7, value: "G" },
    { key: 8, value: "H" },
    { key: 9, value: "I" },
]

function EditProductPage() {

    const navigate = useNavigate();

    const { productId } = useParams();
    const user = useSelector(state => state.user);

    const [TitleValue, setTitle] = useState("");
    const [DescriptionValue, setDescription] = useState("");
    const [ContinentValue, setInfo] = useState(1);
    const [Images, setImages] = useState([])


    useEffect(() => {
        axios.get(`/api/product/products_by_id?id=${productId}&type=single`)
            .then(response => {
                setTitle(response.data.title)
                setDescription(response.data.description)
                setInfo(response.data.continents)
                //setImages(response.data.images)
                console.log('==response.data:',response.data);
            }).catch(err => {
                console.log("=====EditError",err)
            })
    })
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
  

        if (!TitleValue || !DescriptionValue ||
            !ContinentValue || !Images) {
            return alert('fill all the fields first!')
        }
        const variables = {
            writer: user.authSuccess.data._id,
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

export default EditProductPage