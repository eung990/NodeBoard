import React, { useState } from 'react'
import { Input } from 'antd';

const { Search } = Input;

function SearchFeature(props) {

    const [SearchTerms, setSearchTerms] = useState("")

    const onChangeSearch = (event) => {
        setSearchTerms(event.currentTarget.value)

        props.refreshFunction(event.currentTarget.value)

    }

    return (
        <div>
            <Search
                value={SearchTerms}
                onChange={onChangeSearch}
                placeholder="검색할 내용을 입력하세요"
            />
        </div>
    )
}

export default SearchFeature
