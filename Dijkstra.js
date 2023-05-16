let doAnimation = (source) =>{
    let node = document.getElementById(`${source[0]}-${source[1]}`);
    node.classList.add('addAnimation');
}

let detectPath = (r,c)=>{
    // console.log(parent[r][c])
    let node = document.getElementById(`${r}-${c}`);
    node.classList.add('detectP');
}

let ptPoint = document.getElementById('ptPoint');

let findShotestPath = ()=>{
    let r = EndPoint[0];
    let c = EndPoint[1];
    while(true){
        let r1 = parent[r][c][0];
        let c1 = parent[r][c][1];
        if(r1 == StartPoint[0] && c1 == StartPoint[1]){
            break;
        }
        ptPoint.innerHTML += `row : ${r1+1} , col : ${c1+1} <br>`;
        detectPath(r1,c1)
        r = r1;
        c = c1;
    }
}

let Dijkstra = () =>{
    let traverse = [];
    
    let rows = matrix.length;
    let cols = matrix[0].length;

    // let rows = 9;
    // let cols = 5;

    // (weight to reach this index from source,index)
    traverse.push([matrix[StartPoint[0]][StartPoint[1]],StartPoint]);  

    while(traverse.length != 0){
        let front = traverse[0];

        let source = front[1];

        // console.log(traverse);

        traverse.shift();
        if(source[0] < 0 || source[0] >= rows || source[1] < 0 || source[1] >= cols || matrix[source[0]][source[1]] === Infinity){
            continue;
        }

        if(source[0] == EndPoint[0] && source[1] == EndPoint[1]){
            setTimeout(() => {
                ptPoint.innerHTML = `Shortest Path <br>`;
                findShotestPath();  
            },matrix[source[0]][source[1]]*1000);
            break;
        }

        setTimeout(() => {
            doAnimation(source)
        },matrix[source[0]][source[1]]*1000);


        // traverse the neighbour nodes
        
        // up
        if(source[0] - 1 >=0 && matrix[source[0] - 1][source[1]] != Infinity ){
            if(matrix[source[0] - 1][source[1]] > matrix[source[0]][source[1]] + 1){
                matrix[source[0] - 1][source[1]] = matrix[source[0]][source[1]] + 1;
                traverse.push([matrix[source[0] - 1][source[1]],[source[0] - 1,source[1]]]);
                parent[source[0] - 1][source[1]] = [source[0],source[1]];
            }
        }

        // down
        if(source[0] + 1 < rows && matrix[source[0] + 1][source[1]] !=  Infinity ){
            if(matrix[source[0] + 1][source[1]] > matrix[source[0]][source[1]] + 1){
                matrix[source[0] + 1][source[1]] = matrix[source[0]][source[1]] + 1;
                traverse.push([matrix[source[0] + 1][source[1]],[source[0] + 1,source[1]]]);
                parent[source[0] + 1][source[1]] = [source[0],source[1]];

            }
        }

        // right
        if(source[1] + 1 < cols && matrix[source[0]][source[1] + 1] != Infinity ){
            if(matrix[source[0]][source[1] + 1] > matrix[source[0]][source[1]] + 1){
                matrix[source[0]][source[1] + 1] = matrix[source[0]][source[1]] + 1;
                traverse.push([matrix[source[0]][source[1] + 1],[source[0],source[1] + 1]]);
                parent[source[0]][source[1] + 1] = [source[0],source[1]];

            }
        }

        // left
        if(source[1] - 1 >= 0 && matrix[source[0]][source[1] - 1] != Infinity ){
            if(matrix[source[0]][source[1] - 1] > matrix[source[0]][source[1]] + 1){
                matrix[source[0]][source[1] - 1] = matrix[source[0]][source[1]] + 1;
                traverse.push([matrix[source[0]][source[1] - 1],[source[0],source[1] - 1]]);
                parent[source[0]][source[1] - 1] = [source[0],source[1]];
            }
        }

        // sort so that the node with minimum wt will cover first
        traverse.sort(function(a, b){return a[0] - b[0]});

    }

    // console.log(matrix);
}