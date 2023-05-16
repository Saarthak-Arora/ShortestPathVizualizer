let StartPoint = [] ;
let EndPoint = [];

let walls = [];

let parent = [];

// displaying matrix on page as well as creating matrix for algo

let matrix = [];

let Rows = 30;
let Cols = 50;
let board = document.getElementById('board');
for(let i =0 ;i < Rows;i++){
    matrix[i] = [];
    parent[i] = [];
    let tr = board.insertRow(i);
    tr.setAttribute('id',`${i}`)
    for(let j =0 ;j < Cols; j++){
        matrix[i][j] =9000;
        let td = document.createElement('td');
        td.setAttribute('id',`${i}-${j}`)
        td.setAttribute('class',`cell`)
        tr.appendChild(td);
    }

}

// working with cmd to choose the starting pt, end pt , wall and start 

let configst =  false;
let configet = false;
let configwall = false;

let addStartPoint = ()=>{
    configst = true;
}

let addEndPoint = ()=>{
    configet = true;
}

let addWall = ()=>{
    configwall = true;
    wtPoint.innerHTML += `Walls Point <br>`;
}

let dijkstra = ()=>{
    if(StartPoint.length == 0 || EndPoint.length ==0){
        alert('Please choose Starting and Ending Nodes');
        return;
    }
    cwl.onclick=null;
    parent[StartPoint[0]][StartPoint[1]] = [StartPoint[0],StartPoint[1]];
    configwall = false;
    Dijkstra();
    // console.log(parent);
}

let stPoint = document.getElementById('stPoint');
let etPoint = document.getElementById('etPoint');
let wtPoint = document.getElementById('wtPoint');

let cst = document.getElementById('cst');
let cet = document.getElementById('cet');
let cwl = document.getElementById('cwl');
board.addEventListener("click", function(e) {
    
    if(configst){
        document.getElementById(`${e.target.id}`).style.background = "green" ;
        StartPoint = `${e.target.id}`.split("-");
        StartPoint[0] = StartPoint[0]-'0';
        StartPoint[1] = StartPoint[1] - '0';
        matrix[StartPoint[0]][StartPoint[1]] = 0;
        configst= false;
        cst.onclick=null;
        stPoint.innerHTML = `Starting Point <br>`;
        stPoint.innerHTML += `row : ${StartPoint[0]+1} , col : ${StartPoint[1]+1}`;
    }
    else if(configet){
        document.getElementById(`${e.target.id}`).style.background = "red" ;
        EndPoint = `${e.target.id}`.split("-");
        EndPoint[0] = EndPoint[0]-'0';
        EndPoint[1] = EndPoint[1] - '0';
        configet= false;
        cet.onclick=null;
        etPoint.innerHTML = `Ending Point <br>`;
        etPoint.innerHTML += `row : ${EndPoint[0]+1} , col : ${EndPoint[1]+1}`;
    }
    else if(configwall){

        if(StartPoint.length == 0 || EndPoint.length ==0){
            document.getElementById(`${e.target.id}`).style.background = "black" ;
            let wallPos = `${e.target.id}`.split("-");
            wallPos[0] = wallPos[0]-'0';
            wallPos[1] = wallPos[1] - '0';
            matrix[wallPos[0]][wallPos[1]] = Infinity;
            walls.push(wallPos);
            wtPoint.innerHTML += `row : ${wallPos[0]+1} , col : ${wallPos[1]+1} <br>`;
            return;
        }

        let st = `${StartPoint[0]}-${StartPoint[1]}`;
        let et = `${EndPoint[0]}-${EndPoint[1]}`;

        if(`${e.target.id}` != st && `${e.target.id}` != et){
            document.getElementById(`${e.target.id}`).style.background = "black" ;
            let wallPos = `${e.target.id}`.split("-");
            wallPos[0] = wallPos[0]-'0';
            wallPos[1] = wallPos[1] - '0';
            matrix[wallPos[0]][wallPos[1]] = Infinity;
            walls.push(wallPos);
            wtPoint.innerHTML += `row : ${wallPos[0]+1} , col : ${wallPos[1]+1} <br>`;
        }


    }
    
});

let reset = ()=>{
    configst =  false;
    configet = false;
    configwall = false;

    stPoint.innerHTML = '';
    etPoint.innerHTML = '';
    wtPoint.innerHTML = '';
    ptPoint.innerHTML = '';

    document.getElementById(`${StartPoint[0]}-${StartPoint[1]}`).style.background = null ;
    document.getElementById(`${EndPoint[0]}-${EndPoint[1]}`).style.background = null ;

    for(let i =0 ;i < walls.length;i++){
        document.getElementById(`${walls[i][0]}-${walls[i][1]}`).style.background = null ;
    }

    StartPoint = [] ;
    EndPoint = [];
    walls = [];
    parent = [];
    matrix = [];

    for(let i =0 ;i < Rows;i++){
        matrix[i] = [];
        parent[i] = [];
        for(let j =0 ;j < Cols; j++){
            matrix[i][j] =9000;
            let node = document.getElementById(`${i}-${j}`);
            if(node.classList.contains('addAnimation')){
                node.classList.remove('addAnimation');
            }
            if(node.classList.contains('detectP')){
                node.classList.remove('detectP');
            }
        }
    
    }

    cst.onclick=addStartPoint();
    cet.onclick=addEndPoint();
    cwl.onclick=addWall();

    


}



