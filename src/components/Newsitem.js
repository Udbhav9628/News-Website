import React, { Component } from "react";

export default class Newsitem extends Component {
  
  render() {
    // let {title, discription} = this.props;  //DESTRUCTING PROPS OBJECT
    return (
      <div>
        <div className="card d-flex">
          <img src={this.props.img_url} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title"> {this.props.title} </h5>
            <p className="card-text">
            {this.props.discription}
            </p>
            <p className="card-text"><small className="text-muted">{this.props.date}</small></p>
            <a href= {this.props.url} className="btn btn-sm btn-primary">
              Details
            </a>
          </div>
        </div>
      </div>
    );
  }
}
