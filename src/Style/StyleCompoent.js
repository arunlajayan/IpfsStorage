import styled from 'styled-components';

export const StyledCard = styled.div`
margin:120px 40px;
/* color: #FFFFF; */
padding: 2.6rem;
/* background-color:#F4D77B; */
 box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
width: 90%;
height: auto;

`
export const UploadBtn = styled.button`
margin-top: 40px;
              padding: 15px;
              borderRadius:15px;
           background-color:blue ;
              box-shadow: 0px 0px 15px lightgray;
              margin-bottom: 10px;
              color:white;
`
export const ModelCard = styled.div`
 position: fixed;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgba(0, 0, 0, 0.2);
        height: 100vh;
        width: 100vw;
        top: 0;
        left: 0;
        z-index: 10;
`
export const InsideCard = styled.div`
  padding: 20px;
          border-radius: 15px;
          background-color: rgb(235, 235, 235);
`
export const ProgressModel = styled.div`
 display: flex;
              flexDirection: column;
              justifyContent: center;
              alignItems: center;
              `