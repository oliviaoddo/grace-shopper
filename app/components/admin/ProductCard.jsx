import React from 'react';
import { Link } from 'react-router-dom'
import {Modal} from 'react-materialize'
import QuickLook from '../QuickLook'

export default props => {
  const product = props.product || {id: 1, SKU: 'NB1', name: 'Blue Necklace', price:'$22.00', description: 'Lorem ipsum dolor sit amet, ut atomorum disputationi eam. Nec nostro ornatus complectitur in, an iudico tollit pri. Fuisset complectitur vix ex, nonumes democritum at nam. Libris vivendum maiestatis nam id.', inventory: 10, categories: [{id: 1, name:'Necklaces'}, {id: 2, name:'Gold'}]};
        return (
            <div className="card">
              <div className="card-image">
                <img src="/necklaces_2.jpg"/>
                 <Modal
                  trigger={
                    <a className="btn-floating halfway-fab waves-effect waves-light red"><i className="fa fa-search" aria-hidden="true"></i></a>
                  }>
                 <QuickLook product={props.product}/>
                </Modal>
              </div>
              <div className="card-content">
                <Link to={`single-product/${product.id}`}><span className="card-title">{product.name}</span></Link>
                <p>{product.price}</p>
              </div>
        </div>

    )
}
