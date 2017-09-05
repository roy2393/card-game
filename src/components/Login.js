import React from 'react';

class Login extends React.Component{


	goToBoard(event){
		event.preventDefault();
		console.log('You changed the URL', this);
		const storeName = this.userName.value;
		this.context.router.transitionTo(`/gameboard/${storeName}`);
	}
	render(){
		return (
				<form className="login" onSubmit={(e) => this.goToBoard(e)}>
					<h2> Please enter your user name</h2>
					<input type="text" required placeholder="User Name" ref={(input)=>{this.userName = input}}/>

					<button type="submit">Go to table</button>
				</form>
			)
	}
}

Login.contextTypes = {
	router: React.PropTypes.object
}

export default Login;