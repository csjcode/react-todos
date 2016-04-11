var React = require('react');
var Firebase = require('firebase'); // Dashboard: https://shining-inferno-1505.firebaseio.com/
var rootUrl = 'https://shining-inferno-1505.firebaseio.com/';

module.exports = React.createClass({
   getInitialState: function(){
     return {
       text: this.props.item.text,
       done: this.props.item.done,
       textChanged: false
     }
   },
   componentWillMount: function(){
      this.fb = new Firebase(rootUrl + 'items/'+ this.props.item.key);
   },
   render: function(){
      return <div className="input-group">
         <span className="input-group-addon">
               <input
                  type="checkbox"
                  checked={this.state.done}
                  onChange={this.handleDoneChange}
                     />
         </span>
         <input type="text"
            disabled={this.state.done}
            className="form-control"
            value={this.state.text}
            onChange={this.handleTextChanged}
            />
         <span className="input-group-btn">
            {this .changesButtons()};
            <button
               className="btn btn-default"
               onClick={this.handleDeleteClick}
               >
               Delete
            </button>
         </span>
      </div>
   },
   changesButtons: function(){
      if(!this.state.textChanged){
         return null
      } else {
         return [
            <button
               onClick={this.handleSaveClick}
               className="btn btn-default"
               >Save</button>,
            <button
               onClick={this.handleUndoClick}
               className="btn btn-default"
               >Undo</button>
         ]
      }
   },
   handleSaveClick: function(event){
      this.fb.update({text:this.state.text});
      this.setState({textChanged: false});
   },
   handleUndoClick: function(event){
      this.setState({
         text: this.props.item.text,
         textChanged: false
      })
   },
   handleTextChanged: function(event){
      this.setState({
         text:event.target.value,
         textChanged:true
      })
   },
   handleDoneChange: function(event){
      var update = {done: event.target.checked}
      this.setState(update);
      this.fb.update(update);
   },
   handleDeleteClick: function(){
      this.fb.remove();
   }
});

//          {this.props.item.text} - {this.props.item.key} - {this.props.item.done}
