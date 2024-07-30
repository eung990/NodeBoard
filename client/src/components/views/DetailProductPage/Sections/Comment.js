import axios from 'axios';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import SingleComment from './SingleComment'

function Comment(props) {
  const [Text, setText] = useState("")
  const { productId } = useParams()
  const user = useSelector(state => state.user)

  const InputText = (event) => {
    setText(event.target.value);

  }

  const onCommentsSave = async (event) => {
    event.preventDefault();
    try {
      const variables = {
        content: Text,
        productId: productId,
        writer: user.authSuccess.data._id
      }

      const response = await axios.post("/api/Comment/uploadComment", variables)
      if (!response.data.success) {
        alert("Comment 컨트롤러에서 받아온 값이 없습니다.")
      } else {
        console.log("Comment 컨트롤러에서 받아온 값: ", response.data)
      }

    } catch (err) {
      console.log("Comments 페이지 저장버튼 에러", err);
    }
  }
  return (
    <div>
      <br />
      <p> reply </p>
      <hr />
      {/* Comments Lists */}
      <SingleComment />

      {/* Root Comments Form */}

      <form style={{ display: 'flex' }}>
        <textarea
          style={{ width: '100%', borderRadius: '5px' }}
          onChange={InputText}
          value={Text}
          placeholder='댓글을 작성해주세요'
        />
        <br />
        <button style={{ width: '20%', height: '52px' }} onClick={onCommentsSave}>
          작성
        </button>
      </form>
    </div>
  )
}

export default Comment
