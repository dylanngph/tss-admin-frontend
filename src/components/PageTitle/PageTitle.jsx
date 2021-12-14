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
    color: #11142D;
    font-weight: 700;
    padding: 24px;
    line-height: 22px;
    position: absolute;
    z-index: 10;
    top: 0;
`

export default PageTitle
