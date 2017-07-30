import React, {Component} from 'react'
import ProductCard from './admin/ProductCard'
import { Link } from 'react-router-dom'

class Home extends Component{


  render(){
    return(
    <div>
      <div id="index-banner" className="parallax-container">
        <div className="section no-pad-bot">
          <div className="container">
            <br/><br/>
            <div className="row center">
              <Link id='shop-btn' to='/shop' className="btn-large waves-effect waves-light teal lighten-1">Shop <i className="fa fa-angle-right" aria-hidden="true"></i></Link>
            </div>
            <br/><br/>

          </div>
        </div>
        <div ref={(img)=>{$(img).parallax()}} className="parallax"><img src="IMG_1793.jpg" alt="Unsplashed background img 1"/></div>
      </div>

      <div className="container">
        <div className="section">
          <div className="row">
            <div className="col s12 m4">
              <ProductCard product={{id: 1, SKU: 'NB1', name: 'Blue Necklace', price:'$22.00', description: "Lorem ipsum dolor sit amet, ut atomorum disputationi eam. Nec nostro ornatus complectitur in, an iudico tollit pri. Fuisset complectitur vix ex, nonumes democritum at nam. Libris vivendum maiestatis nam id.", inventory: 10, categories: [{id: 1, name:'Necklaces'}, {id: 2, name:'Gold'}]}}/>
            </div>

            <div className="col s12 m4">
             <ProductCard product={{id: 2, SKU: 'NB1', name: 'Blue Necklace', price:'$22.00', description: "Lorem ipsum dolor sit amet, ut atomorum disputationi eam. Nec nostro ornatus complectitur in, an iudico tollit pri. Fuisset complectitur vix ex, nonumes democritum at nam. Libris vivendum maiestatis nam id.", inventory: 10, categories: [{id: 1, name:'Necklaces'}, {id: 2, name:'Gold'}]}} />
            </div>

            <div className="col s12 m4">
              <ProductCard product={{id: 3, SKU: 'NB1', name: 'Blue Necklace', price:'$22.00', description: "Lorem ipsum dolor sit amet, ut atomorum disputationi eam. Nec nostro ornatus complectitur in, an iudico tollit pri. Fuisset complectitur vix ex, nonumes democritum at nam. Libris vivendum maiestatis nam id.", inventory: 10, categories: [{id: 1, name:'Necklaces'}, {id: 2, name:'Gold'}]}} />
            </div>
          </div>

        </div>
      </div>


      <div className="parallax-container valign-wrapper">
        <div className="section no-pad-bot">
          <div className="container">
            <div className="row center">
            </div>
          </div>
        </div>
        <div ref={(img)=>{$(img).parallax()}} className="parallax"><img src="IMG_6236.jpg" alt="Unsplashed background img 2"/></div>
      </div>

      <div className="container">
        <div className="section">
          <div className="row">
            <div className="col s12 m4">
              <div className="icon-block">
                <h2 className="center brown-text"><i className="material-icons">flash_on</i></h2>
                <h5 className="center">Necklaces</h5>

                <p className="light">We did most of the heavy lifting for you to provide a default stylings that incorporate our custom components. Additionally, we refined animations and transitions to provide a smoother experience for developers.</p>
              </div>
            </div>

            <div className="col s12 m4">
              <div className="icon-block">
                <h2 className="center brown-text"><i className="material-icons">group</i></h2>
                <h5 className="center">Rings</h5>

                <p className="light">By utilizing elements and principles of Material Design, we were able to create a framework that incorporates components and animations that provide more feedback to users. Additionally, a single underlying responsive system across all platforms allow for a more unified user experience.</p>
              </div>
            </div>

            <div className="col s12 m4">
              <div className="icon-block">
                <h2 className="center brown-text"><i className="material-icons">settings</i></h2>
                <h5 className="center">Bracelets</h5>

                <p className="light">We have provided detailed documentation as well as specific code examples to help new users get started. We are also always open to feedback and can answer any questions a user may have about Materialize.</p>
              </div>
            </div>
          </div>

        </div>
      </div>


      <div className="parallax-container valign-wrapper">
        <div className="section no-pad-bot">
          <div className="container">
            <div className="row center">
            </div>
          </div>
        </div>
        <div ref={(img)=>{$(img).parallax()}} className="parallax"><img src="IMG_7286.jpg" alt="Unsplashed background img 3"/></div>
      </div>

    </div>
      )
    }
}

export default Home
