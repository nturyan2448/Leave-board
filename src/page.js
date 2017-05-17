import React from 'react';
import LeaveContent from './content';

class Page extends React.Component{
    constructor(props){
        super(props)

        this.state = {group:"", inputName:"", inputID:"", name:"", ID: "", leaveBox: false, leaveMonth: 7,leaveDate: 1, leaveReason: "", leaveData: []}

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleIDChange = this.handleIDChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleRenderCategory = this.handleRenderCategory.bind(this);
        this.handleLeaveBox = this.handleLeaveBox.bind(this)
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleReasonChange = this.handleReasonChange.bind(this);
        this.handleLeaveSubmit = this.handleLeaveSubmit.bind(this);
    }

    handleNameChange(e){
        this.setState({inputName: e.target.value})
    }
    handleIDChange(e){
        this.setState({inputID: e.target.value})
    }

    handleLogin(e){
        e.preventDefault();
        if (this.state.inputName === "" || this.state.inputID === ""){
            alert("User name and ID should not be empty")
            return;
        }
        fetch('/login', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                stuName: this.state.inputName,
                stuID: this.state.inputID
            })
        })
        .catch(err=>console.log(err))
        // this.state.replies.push({name: this.state.inputName, reply: this.state.inputID, time: this.props.TP(new Date())})
        this.setState({name: this.state.inputName, ID: this.state.inputID})
        console.log(this.state)
    }

    handleRenderCategory(group){
        switch(group){

        }
    }

    handleLeaveBox(e){
        // e.preventDefault();
        this.setState({leaveBox: true})
    }
    handleMonthChange(e){
        this.setState({leaveMonth: e.target.value})
    }
    handleDateChange(e){
        this.setState({leaveDate: e.target.value})
    }
    handleReasonChange(e){
        this.setState({leaveReason: e.target.value})
    }
    handleLeaveSubmit(e){
        e.preventDefault();
        let temp = false;
        let tempdate = this.state.leaveMonth + "/" + this.state.leaveDate
        for (let i = 0; i < this.state.leaveData.length; i+=1){
            if (this.state.leaveData[i].date === tempdate){

                for (let j = 0; j < this.state.leaveData[i].content.length; j+=1){
                    if (this.state.leaveData[i].content[j].name === this.state.name){
                        alert("此日期已請假！")
                        return;
                    }
                }
                this.state.leaveData[i].content.push({
                    name: this.state.name,
                    ID: this.state.ID,
                    reason: this.state.leaveReason
                })
                temp = true;
                break;
            }
        }
        if (temp === false){
            this.state.leaveData.push({
                date: tempdate,
                content: [{
                    name: this.state.name,
                    ID: this.state.ID,
                    reason: this.state.leaveReason
                }]
            })
            console.log(this.state.leaveData[this.state.leaveData.length-1])
        }
        this.setState({leaveData: this.state.leaveData, leaveBox: false})
        alert("請假申請成功！")
    }

    render(){
        if (this.state.ID === "" || this.state.name === "")
            return (
                <div>
                    <div>Please login first:</div>
                    <form onSubmit={this.handleLogin}>
                        <input type="text" value={this.state.inputName} placeholder="Name ex: 王文謙" onChange={this.handleNameChange}/>
                        <input type="text" value={this.state.inputID} placeholder="StudentID ex: b03901041" onChange={this.handleIDChange}/>
                        <button onClick={this.handleLogin}>Submit</button>
                    </form>
                </div>
            )
        let showBox = null;
        if (this.state.leaveBox === true){
            showBox = <form onSubmit={this.handleLeaveSubmit}>
                時間：2017/<input type="number" value={this.state.leaveMonth} min="6" max="7" placeholder="month" onChange={this.handleMonthChange}/>
                <input type="number" value={this.state.leaveDate} min="1" max="31" placeholder="date" onChange={this.handleDateChange}/>
                原因：<input type="text" value={this.state.leaveReason} placeholder="Reason:" onChange={this.handleReasonChange}/>
                <button onClick={this.handleLeaveSubmit}>Submit</button>
            </form>
        }
        let content = this.state.leaveData.map((x,index) => <LeaveContent key={index} date={x.date} content={x.content}/>)
        return(
            <div>
                <div className="Login">
                    <p>Name: {this.state.name}</p>
                    <p>ID: {this.state.ID}</p>
                </div>
                <div className="Group">
                    <button onClick={()=>{this.handleRenderCategory(0)}}>所有工人</button>
                    <button onClick={()=>{this.handleRenderCategory(1)}}>大頭</button>
                    <button onClick={()=>{this.handleRenderCategory(2)}}>隊輔</button>
                    <button onClick={()=>{this.handleRenderCategory(3)}}>活動</button>
                    <button onClick={()=>{this.handleRenderCategory(4)}}>教學</button>
                    <button onClick={()=>{this.handleRenderCategory(5)}}>生輔</button>
                    <button onClick={()=>{this.handleRenderCategory(6)}}>器材</button>
                </div>
                <div>
                    <button className="Leave" onClick={this.handleLeaveBox}>我要請假</button>
                    {showBox}
                </div>
                {content}
            </div>
        )
    }
}

export default Page