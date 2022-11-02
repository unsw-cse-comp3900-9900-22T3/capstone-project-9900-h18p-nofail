import { render } from "@testing-library/react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Button
  } from 'react-bootstrap';
import React from "react";

class FollowBtn extends React.Component {
    constructor(){
        super()
        this.state={
            isLiked:false
        }
    }

    handleFollow(){
        this.setState((prevState)=>{
            //console.log(prevState)
            return{
                isLiked:!prevState.isLiked
            }
        },()=>{
            console.log(this.state.isLiked) //setState回调 获取最新的状态
        })
    }
    

    render() {
        return (
                <Button variant="outline-success" style={{ marginLeft: 50 }} onClick={this.handleFollow.bind(this)}>
                    {
                    this.state.isLiked ? 'Followed' :'Follow'
                    }
                </Button>
        )
    }
}
 
    
//     render() {
//         if (this.state.liked) {
//             return (
//                 <div className="likes-button-component">
//                 <Button type="button" 
//                 variant="outline-success" style={{ marginLeft: 50 }}
//                 onClick={ () => {this.setState({ liked: true }) }}
//                 >Followed
//                 </Button>
//             </div>
//             )
//           }
//           return(
//             <div className="likes-button-component">
//                 <Button type="button" 
//                 variant="outline-success" style={{ marginLeft: 50 }}
//                 onClick={ () => {this.setState({ liked: true }) }}
//                 >Follow
//                 </Button>
//             </div>
//           )
          

        
//     }
// }
export default FollowBtn