// 'use strict';

// const f = React.createElement;

// class LikeButton extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { liked: false };
//   }

//   render() {
//     if (this.state.liked) {
//       return 'You Liked.';
//     }

//     return f(
//       'div',
//       { onClick: () => this.setState({ liked: true }) },
//       'Like'
//     );
//   }
// }

// const domContainer = document.querySelector('#like');
// const root = ReactDOM.createRoot(domContainer);
// root.render(f(LikeButton));