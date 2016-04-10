var React = require('react');

module.exports = React.createClass({
   getInitialState: function(){
      return {
         text: ''
      }
   },
   render: function(){
      return <div className="input-group">
         <input
            value = {this.state.text}
            onChange={this.handleInputChange}
            type="text"
            className="form-control" />
         <span className="input-group-btn">
            <button
               onClick={this.handleClick}
               className="btn btn-default"
               type="button">
               Add
            </button>
         </span>

      </div>
   },
   handleClick: function(){
      // console.log(this.state.text);
      this.props.itemsStore.push({
         text: this.state.text, // text from the input
         done: false // if the todo has been done
      })

      this.setState({text:''}) // this will clear out input box after the add button is clicked
      // send value of text input to firebase
      // console.log('I was clicked');
   },
   handleInputChange: function(event){
      this.setState({text:event.target.value})
      // console.log(event.target.value);
   }
})
