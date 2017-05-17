import React from 'react';

class LeaveContent extends React.Component{
    // constructor(props){
    //     super(props)
    // }
    render(){
        let people = this.props.content.map((x,index) => <p key={index}>{x.name}</p>)
        return(
        <div>
            <h2>{this.props.date}</h2>
            {people}
        </div>
        )
    }
}

export default LeaveContent