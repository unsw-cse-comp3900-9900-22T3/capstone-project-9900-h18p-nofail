import { render } from "@testing-library/react";
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

class LikeBtn extends React.Component {

    constructor(){
        super()
        this.state={
            isLiked:false
        }
    }
    render() {
        return (
                <span onClick={this.handleLike.bind(this)}>
                    {
                    this.state.isLiked ? '❤️' :'🖤'
                    }
                </span>
        )
    }
 
    handleLike(){
        this.setState((prevState)=>{
            console.log(prevState)
            return{
                isLiked:!prevState.isLiked
            }
        },()=>{
            console.log(this.state.isLiked) //setState回调 获取最新的状态
        })
    }

}
export default LikeBtn