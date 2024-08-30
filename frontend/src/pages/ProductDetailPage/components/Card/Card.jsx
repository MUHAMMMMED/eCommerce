import React from 'react';
import './Card.css';

export default function Card() {
  return (


    <section >
      <div className="card-container ">

        <div className="card-div">
          <div className="card">
            <div className="containerImg">

              <div className="Out_stock"  > <span style={{ textAlign: 'center' }} >Out stock </span> </div>
              <img src="https://cdn.salla.sa/KjRqOb/MHxEfwjYY2MgbjU5M1iMFSpE4irTNZZXl3ovuhXX.jpg" alt="Avatar" class="image" />
              <div className="overlay">

                <div className="Out_stock"  > <span style={{ textAlign: 'center' }}  > Out stock </span> </div>
                <img src="https://media.zid.store/150962ef-2fdd-4ab8-a60a-86b740cf7698/bd574a34-fa96-46ae-b917-cd17afc12c75.png" alt=" " class="image" />
              </div></div>



            <div className="Container">
              <div className="single_product_text" >
                <h4 style={{ textAlign: 'right' }}  >جوجل مراجعة بطاقة NFC</h4>
                <div className='single_product-content' >
                  <div className="content-price"> $49.00   </div>
                  <div className='content-button' >  <button class="but_bay">استعرض المنتج </button>    </div>
                </div>

              </div>


            </div></div></div>



      </div>
    </section>




  )
}
