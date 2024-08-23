
import styled from "@emotion/styled";
                                                                                                    
export const Feedbackcontainer = styled ("div")`
   label:Feedbackcontainer;
   width: 100%;
   margin: 0 auto;
   padding:0px;
   margin-top:50px;
   margin-bottom: 50px;
   @media (min-width: 768px) {
      width: 80%;
      margin-left:10%;
     }
`;

 

export const SectionTitle = styled ("div")`
   label:SectionTitle;
   width: 100%;
   margin: 0 auto;
   padding:0px;
   text-align:center;
   padding-bottom: 20px;

   `;


export const SubTitle = styled ("h5")`
   label:SubTitle;
    float:right;
    width: 100%;
    margin-top: 50px;
    font-size: 20px;
    color: #000;
    font-weight: 500;
    text-align:right; 
    padding-right:  50px;
    letter-spacing: .3rem;
    margin-bottom: 20px;

    @media screen and (max-width: 1200px) {
      padding-right:  0px;
      font-size: 20px;
      text-align:center; 

    }
    
    @media screen and (max-width: 785px) {
      padding-right:  0px;
      font-size: 23px;
      text-align:center; 
      font-weight: 500;


    }
 
 

`;


export const MainTitle  = styled ("h2")`
   label:MainTitle;
   font-size: 35px;
   font-weight: 500;
   margin-bottom: 0;
   line-height: 1.4;
   color:#000; 
   @media (max-width: 768px) { font-size:30px; }

`;

 

export const TestimonialWrapper  = styled ("div")`
label:TestimonialWrapper;
display: -webkit-box;
display: -webkit-flex;
display: -ms-flexbox;
display: flex;
-webkit-box-pack: justify;
-webkit-justify-content: space-between;
-ms-flex-pack: justify;
justify-content: space-between;
-webkit-box-align: center;
-webkit-align-items: center;
-ms-flex-align: center;
align-items: center;
padding-top: 10px;

`;
 

 


export const Singletestimonial  = styled ("div")`
label:Singletestimonial;
    float: right;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 10px;
    padding: 25px 15px  ;
    position: relative;
    width:90%;
    margin-left:5%;
    margin-right:3%;
    @media (max-width: 768px) {
 
    }
`;
 

export const AuthorThumb  = styled ("div")`
label:AuthorThumb;
position: relative;
width:100%;

`;

 
export const AuthorThumbImg  = styled ("spen")`
label:AuthorThumbImg;
display: block;
width: 60px;
height: 60px;
border: 1px solid  #000000;
border-radius: 50%;
padding: 8px;
margin: 0 auto;
font-size: 30px;
color:#9081f6;


`;

export const AuthorThumbSpen   = styled ("spen")`
label:AuthorThumbSpen;
width: 30px;
height: 30px;
line-height: 30px;
text-align: center;
background-color:#9081f6;
color: #fff;
font-size: 13px;
border-radius: 50%;
display: inline-block;
position: absolute;
bottom: -13px;
left: 0;
right: 0;
margin: 0 auto;

`;

 
 

export const RatingStar  = styled ("span")`
label:RatingStar-star;
position: relative;
display: inline-block;
margin-top: 35px;
`;



export const RatingBar  = styled ("span")`
label:RatingBar-star;
    color: #ffba00;
    font-size: 14px;
    letter-spacing: 2px;
    width: 100%;
`;

 
 export const TestimonialContentP   = styled ("p")`
label:TestimonialContentP;
font-size: 15px;
   color: #52565b;
   font-weight: 400;
   margin-bottom: 0;
`;

 
 
export const TestimonialContentName = styled ("h4")`
label:TestimonialContentName;
font-size: 15px;
font-weight: 500;
margin-bottom: 0;
margin-top: 16px;
color: #9081f6;
`;
 
export const TestimonialContentDesignation = styled ("P")`
label:TestimonialContentDesignation;
font-size: 14px;
font-weight: 400;
color: #ccc;
margin-top: 5px;
display: block;
`;

 