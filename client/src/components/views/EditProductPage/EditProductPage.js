import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from 'react-router-dom';
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
                const res = response.data.product[0]
                setTitle(res.title)
                setDescription(res.description)
                setInfo(res.continents)
                setImages(res.images)
                console.log('====수정페이지 -> 서버에 요청해서 받은 데이터 :', res);
                console.log('====setTitle :', res.title);
                console.log('====setDescription :', res.description);
                console.log('====setInfo :', res.continents);
                console.log('====res.images :', res.images);


            }).catch(err => {
                console.log("=====EditError", err)
            })
    }, [productId])
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
            _id: productId,
            writer: user.authSuccess.data._id,
            title: TitleValue,
            description: DescriptionValue,
            images: Images,
            continents: ContinentValue,
        }


        axios.post('/api/product/updateProduct', variables)
            .then(response => {
                if (response.data.success) {
                    alert('Product Successfully Updated')
                    navigate('/')
                } else {
                    alert('Failed to update Product')
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
                {/* 컴포넌트끼리 props로 데이터 전달할 때는 따로따로 선언 하고 .객체명을 통해 사용 */}
                <FileUpload refreshFunction={updateImages} initialImages={Images} />
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