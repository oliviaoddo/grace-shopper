import React from 'react';
import { Link } from 'react-router-dom'
import {Modal} from 'react-materialize'
import QuickLook from '../QuickLook'

export default props => {
        console.log(props.product.images[1])
        return (
            <div className="card">
              <div className="card-image">
                <img src={props.product.images[1]}/>
                 <Modal
                  trigger={
                    <a className="btn-floating halfway-fab waves-effect waves-light red"><i className="fa fa-search" aria-hidden="true"></i></a>
                  }>
                 <QuickLook product={props.product}/>
                </Modal>
              </div>
              <div className="card-content">
                <Link to={`/shop/${props.product.id}`}><span className="card-title">{props.product.name}</span></Link>
                <p>${props.product.price}</p>
              </div>
        </div>

    )
}
