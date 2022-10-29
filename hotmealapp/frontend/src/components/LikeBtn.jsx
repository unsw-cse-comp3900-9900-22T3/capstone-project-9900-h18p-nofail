import { render } from "@testing-library/react";
import React from "react";

class LikeBtn extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            likes : 0
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