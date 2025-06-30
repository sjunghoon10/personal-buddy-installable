import styled from 'styled-components';
import {
  fontSizeH4,
  fontSizeH8,
  fontWeightRegular,
  fontWeightLight,
} from "../../../../globals/common";
const S = {};

S.Container = styled.div`

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 8px;
    width: 560px;
    height: 780px;
    background-color: #EEFFF8;
    box-sizing: border-box;
    border-top: solid 1px #06c371;
    border-right: solid 1px #06c371;
    border-bottom: solid 1px #06c371;
`;


S.TodoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 518px;
  
  height: 50px;

`;

S.ScrollContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 518px;

  height: 600px;

  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #aaa;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
`

S.TodoInput = styled.input`
    outline: none;
    width: 440px;
    height: 30px;
    border: none;
    box-sizing: border-box;
`;

S.TodoWrapper = styled.div`
    display: flex;
    position: relative;
    justify-content: center;
    align-items: center;
    background-color: white;
    width: 518px;
    height: 50px;
    flex-shrink: 0;
`;

S.TodoTextWrapper = styled.span`
    margin-left: 40px;
    ${({ $done }) => $done && `text-decoration: line-through; color: #999;`}
    ${fontWeightRegular};
    ${fontSizeH8};
`;

S.DoneWrapper = styled.div`
    display: flex;
    position: relative;
    align-items: center;
    width: 518px;
    height: 50px;
    flex-shrink: 0;
`;

S.TodoWritten = styled.div`
    display: flex;
    position: relative;
    align-items: center;
    background-color: white;
    width: 518px;
    height: 50px;
    flex-shrink: 0;
`;

S.TodoDone = styled.div`
    display: flex;
    position:relative;
    align-items: center;
    width: 518px;
    height: 50px;
    flex-shrink: 0;
`
S.AddIcon = styled.img`
    position: absolute;
    cursor: pointer;
    right: 10px;
`;

S.CircleIcon = styled.img`
    position: absolute;
    left: 10px;
`;

S.ArrowIcon = styled.img`
  position: absolute;
  left: 10px;
  transition: transform 0.3s ease;
  transform: ${({ $rotated }) => ($rotated ? 'rotate(90deg)' : 'rotate(0deg)')};
`;

S.IconButton = styled.button`
  position: absolute;
  left: 5px;
  background: none;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
`;

S.DoneTodoWrapper = styled.div`
  width: 518px;
  height: 50px;
`;

S.DeleteIcon = styled.img`
  position: absolute;
  width: 16px;
  height: 16px;
  right: 13px;
`;
export default S;