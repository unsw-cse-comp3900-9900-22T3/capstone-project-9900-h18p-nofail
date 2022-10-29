import { render } from "@testing-library/react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Button
  } from 'react-bootstrap';
import React from "react";

class FollowBtn extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            likes : false
        }
    }
    
    render() {
        if (this.state.liked) {
            return (
                <div className="likes-button-component">
                <Button type="button" 
                variant="outline-success" style={{ marginLeft: 50 }}
                onClick={ () => {this.setState({ liked: true }) }}
                >Followed
                </Button>
            </div>
            )
          }
          return(
            <div className="likes-button-component">
                <Button type="button" 
                variant="outline-success" style={{ marginLeft: 50 }}
                onClick={ () => {this.setState({ liked: true }) }}
                >Follow
                </Button>
            </div>
          )
          

        
    }
}
export default FollowBtn