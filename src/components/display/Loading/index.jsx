import React from 'react';
import {
    Box,
} from '@mui/material'
import { styled } from '@mui/material/styles';

function Loading(props) {
    return (
        <Wrap>
            <div className="lds-ripple"><div></div><div></div></div>
        </Wrap>
    );
}

const Wrap = styled(Box)`
position: fixed;
    background: #000000;
    z-index: 99999;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: .5;
    display: flex;
    align-items: center;
    justify-content: center;
    
.lds-ripple {
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
  }
  .lds-ripple div {
    position: absolute;
    border: 4px solid #fff;
    opacity: 1;
    border-radius: 50%;
    animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
  }
  .lds-ripple div:nth-of-type(2) {
    animation-delay: -0.5s;
  }
  @keyframes lds-ripple {
    0% {
      top: 36px;
      left: 36px;
      width: 0;
      height: 0;
      opacity: 1;
    }
    100% {
      top: 0px;
      left: 0px;
      width: 72px;
      height: 72px;
      opacity: 0;
    }
  }
`

export default Loading;