import React from 'react'
import styled from '@emotion/styled'

const PageTitle = ({text}) => {
    return (
        <StyledText>
            {text}
        </StyledText>
    )
}

const StyledText = styled.div`
    font-size: 18px;
    font-weight: 700
`

export default PageTitle
