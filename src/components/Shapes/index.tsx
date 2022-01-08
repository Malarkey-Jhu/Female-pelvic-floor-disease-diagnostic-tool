import { css } from "@emotion/react"
import styled from "@emotion/styled"
import Diamond from "@/images/Diamond.svg"

type DiamondProps = {
  width? :number
  height?: number
}

// const Diamond = styled.div<DiamondProps>`
//   white-space: pre-line;
//   background: #F9F7ED;
//   position: absolute;
//   border: solid 1px #36393D;
//   transform: rotate(45deg); 
//   width: ${props =>
//     props.width || "132px"};
//   height: ${props =>
//     props.height || "100px"};
//   z-index: -1;
// `

const DimondWrapper = styled.div<DiamondProps>`
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 10px;

  svg {
    position: absolute;
    transform: rotate(90deg);
    z-index: 0;
    width: 150px;
    filter: drop-shadow(6px -2px 10px rgba(0, 0, 0, 0.1));
  }

  .txt {
    width: 100px;
    height: 66px;
    display: flex;
    align-items: center;
  }

  .redBold {
    color: #CC0000;
    font-weight: 500;
  }
`

const DiamondBox = ({children}) => {
  return (
    <DimondWrapper>
      <Diamond />
      <div style={{zIndex: 1, position: 'relative'}}>
        {children}
      </div>
    </DimondWrapper>
  )
}

export { DiamondBox }