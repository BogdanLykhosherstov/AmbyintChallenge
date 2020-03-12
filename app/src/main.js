import React, { Component } from 'react';



class StarWars extends Component {
  
  constructor(){
    super();
    this.state = {
      command:"",
      hidden:true,
      landed:false,
      r2d2:{
        position:[0,0],
        // direction = tuple where North [0,1], South [0,-1], West [-1,0], East[1,0]
        // -- This is done so that the product of movement and direction can be taken to output resulting droid location
        direction:[0,1]
      },
      obiwan:{
        position:[100,100],
      },
      
    }
  }
  changeCommand = (e) => {

    var upperCaseCommand = e.target.value.toUpperCase()
    this.setState({
      command:upperCaseCommand
    })

  }
  
  submitCommand = (e) => {
    //prevent page refresh
    e.preventDefault();
    // checking cases (no switch due to inability to check includes in cases)
    
    if(this.state.command === "LAND"){
      this.land()
    }
    else if(!this.state.landed){
      return 
    }
    else if(this.state.command.includes("MOVE")){
      // extracting movement units
      var commandArgs = this.state.command.split(/\s+/)
      // ensuring valid move command is passed
      commandArgs[0] == "MOVE" ? this.move(commandArgs[1]) : ''
    }
    else if(this.state.command=== "RIGHT"){
      this.rotate("Right")
    }
    else if(this.state.command==="LEFT"){
      this.rotate("Left")
    }
    else if(this.state.command==="REPORT"){
      this.setState({
        hidden:false
      })
    }
    else{
      console.log("Invalid Command. Please try again.")
    }
    console.log("SUBMITTED",this.state.command);
  }
  // Land droid and Obiwan. Only invoked if !landed already
  land = () => {
    if(!this.state.landed){
      do{
        this.setState({
          r2d2 : {
            ...this.state.r2d2,
            position:[this.getRandomInt(),this.getRandomInt()],
          },
          obiwan : {
            position:[this.getRandomInt(),this.getRandomInt()]
          },
        });
      }
      // regenerate positions if they spawn in the same place randomly
      while(this.arrayCompare(this.state.r2d2.position,this.state.obiwan.position))
      //after generating position
      this.setState({
        hidden:false,
        landed:true
      })
    }
  }

  gameover = () => {
    return (this.arrayCompare(this.state.r2d2.position,this.state.obiwan.position))
  }
  // Move R2D2 by taking the product of its location * movement units + old location
  // -- E.g When Move = 2, Dir = [0,1], then Result = Old Position + [0,1]* 2 = [0,3]
  move = (units) => {
    var resultingPosition = this.state.r2d2.position.map((axisPosition,index)=>{
      var modifiedDirection = this.state.r2d2.direction[index]*units
      return axisPosition + modifiedDirection
    })
    // making sure move is valid
    if(resultingPosition[0]<=100 && resultingPosition[1]<=100 && resultingPosition[0]>=0 && resultingPosition[1]>=0){
      this.setState({
        hidden:true,
        r2d2:{
          ...this.state.r2d2,
          position:resultingPosition,
        }
      })
    }
  }
  // rotate through the compass circular queue (W,N,E,S)
  rotate = (direction) =>{
    var que = [[-1,0],[0,1],[1,0],[0,-1]]
    // index of the direction we are currently facing in the queue
    var queIndex;
    // move to the right of the que if direction is right, if left, move to the left using mod and addition
    var directionModifier = direction == "Left" ? 3 : 1
    que.forEach((elem,index)=>{
      if(this.arrayCompare(elem,this.state.r2d2.direction)){
        queIndex = index
      }
    })
    //move through circular queue in either direction
    this.setState({
      r2d2:{
        ...this.state.r2d2,
        direction:que[(queIndex+directionModifier)%4]
      },
      hidden:true,
    })
  }
  //only for 2D arrays
  arrayCompare = (arr1,arr2) => {
    return (arr1[0] == arr2[0] && arr1[1] == arr2[1])
  }
  // decode coordinates into string direction (comparing string values of each since JS doesnt have a reliable way to compare arrays easily)
  decodeDirection = () => {
    var currentDirection =  this.state.r2d2.direction
    if(JSON.stringify(currentDirection)===JSON.stringify([0,1])){
      return "North"
    }
    else if(JSON.stringify(currentDirection)===JSON.stringify([0,-1])){
      return "South"
    }
    else if(JSON.stringify(currentDirection)===JSON.stringify([1,0])){
      return "East"
    }
    else{
      return "West"
    }  
  }
  // render position for either actor and facing direction for R2D2
  report = (actor) =>{
    if(actor === "r2d2"){
      return (
        <div>{'Position: '+this.state.r2d2.position}<br/>{' Facing: '+this.decodeDirection()}</div>
        )
    }
    else{
      return (
        <div>{'Position: '+this.state.obiwan.position}</div>
      )
    }
  }
  getRandomInt = () => {
    return Math.floor(Math.random() * Math.floor(100));
  }
  // return game screen while the actors havent met - winning screen once they have
  render() {
    const reportRendered = this.report
    return (
    <div>
      {this.gameover() == false ? 
      // game screen
      <div className="container">
        <h1>R2D2 - Exercise</h1>
        <div className="card_container">
          <div className="card">
            <img src="../resources/r2d2_icon-icons.com_76952.png" alt=""/>
            <h2>R2D2</h2>
          {this.state.hidden ? '???':this.report("r2d2")}
          </div>
          <div className="direction_arrow">
            - - - - 
          </div>
          <div className="card">
            <img src="../resources/obiwan-kenobi_icon-icons.com_76945.png" alt=""/>
            <h2>Obiwan</h2>
            {this.state.hidden ? '???':this.report("obiwan")}
          </div>
        </div>
        
        <p>Welcome to R2D2 console game. Enter your commands (case insensitive) in the field below and attempt to reunite R2D2 with Obiwan.</p>
        <form onSubmit={this.submitCommand}>
          <input placeholder="Enter Command..." type="text" name="console" onChange={this.changeCommand} autoFocus/>
        </form>
        </div>
        // gameover screen
        :
        <div className="container">
        <h1>R2D2 - Exercise</h1>
        <div className="card_container">
          <div className="card">
            <img src="../resources/r2d2_icon-icons.com_76952.png" alt=""/>
            <img src="../resources/obiwan-kenobi_icon-icons.com_76945.png" alt=""/>
            <h3>Reunited</h3>
          </div>
        </div>
        <h2>Congratulations, you've saved the Rebellion!</h2>
        <p>Thank you for playing. You may now exit the tab.</p>
        </div>
        }
    </div>
    
    ); 
  } 
} 

export default StarWars;
