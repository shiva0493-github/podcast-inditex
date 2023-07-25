import styled from "styled-components";

// Text Styling

export const HeaderTitle = styled.span`
    font-size: 5vh;
    color: #70879e;

    :hover {
        cursor: pointer;
    }
`

export const ThumbnailText = styled.span`
    font-size: 2.5vh;
    position:absolute;
`

export const SearchInput = styled.input`
 padding:1vh;
 font-size: 3vh;
 border:2px solid #70879e;
 border-radius: 1vh;
`
export const Expander = styled.span`
    border:1px solid #70879e; 
    height:fit-content; 
    width: fit-content;
    padding:1vh; 
    border-radius:1vh;

   
`

// Image Styling

export const ThumbnailImg = styled.img`
    height:60%;
    width:60%; 
    border-radius:50%;
    box-shadow: 0px 2px 10px 1px grey;
`