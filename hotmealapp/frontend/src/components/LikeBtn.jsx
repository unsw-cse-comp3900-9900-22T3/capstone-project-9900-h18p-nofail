import { render } from "@testing-library/react";
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

class LikeBtn extends React.Component {

    recipes = JSON.parse(localStorage.getItem('recipes'));
    
    constructor(props){
        super(props)
        this.state = {
            likes : this.recipes.likes
        }
    }
    
    increaseLikes() {
        this.setState({
            likes : ++ this.state.likes
        })
    }
    render() {
        return(
            <div className="likes-button-component">
                <button type="button" 
                    onClick={() => { this.increaseLikes() }}
                    
                >
                    ❤️ {this.state.likes}
                </button>
            </div>
        )
    }
}
export default LikeBtn