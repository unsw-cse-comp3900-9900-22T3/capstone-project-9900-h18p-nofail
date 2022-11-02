

// const e = React.createElement;

// class FavoriteButton extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { liked: false };
//   }

//   render() {
//     if (this.state.liked) {
//       return 'You favorited.';
//     }

//     return e(
//       'div',
//       { onClick: () => this.setState({ liked: true }) },
//       'Favorite'
//     );
//   }
// }

// const Container = document.querySelector('#like_button_container');
// const favroot = ReactDOM.createRoot(Container);
// favroot.render(e(FavoriteButton));