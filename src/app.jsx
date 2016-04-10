var React = require('react');
var ReactDOM = require('react-dom');
var ReactFire = require('reactfire'); // supplies bindAsObject to bridge Firebase and React
var Firebase = require('firebase'); // Dashboard: https://shining-inferno-1505.firebaseio.com/
var Header = require('./header');
var List = require('./list');
var rootUrl = 'https://shining-inferno-1505.firebaseio.com/';


var Hello = React.createClass({
  mixins: [ ReactFire ], // mixin: methods on 1 object copied to another  (ie. copy ReactFire objects to React component)
  getInitialState: function(){
    return {
      items:{},
      loaded: false
    }
  },
  componentWillMount: function(){ // react native method to run one time only when app instantiated
    fb = new Firebase(rootUrl + 'items/')
    this.bindAsObject(fb, 'items'); // create new firebase object at our URL, any data from that is bound to our component; after line is run we'd expect: this.state.items => {}
    fb.on('value', this.handleDataLoaded);
  },
  render: function() {
    // console.log(this.state); // test connection to firebase
      /* below: <Header itemsStore={this.firebaseRefs.items} /> from the new Firebase object line above*/
    return <div className="row panel panel-default">
      <div className="col-md-8 col-md-offset-2">
        <h2 className="text-center">
          To-Do List
        </h2>
        <Header itemsStore={this.firebaseRefs.items} />
        <hr />
          <div className={"content " + (this.state.loaded ? 'loaded': '')}>
            <List items={this.state.items} />
          </div>
      </div>
    </div>
  },
  handleDataLoaded: function(){
    this.setState({loaded:true})
  }
});

var element = React.createElement(Hello, {});
ReactDOM.render(element, document.querySelector('.container'));
