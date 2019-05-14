function createTable(gridSize){
    var total = 50 * gridSize;
    grid = gridSize - 1;
    $("#box").css({'width':total,'height':total});
    for(x = 0; x < gridSize; x++){
        cellList.push([]);
        for(y = 0; y < gridSize; y++){
            var type;

            var p = document.createElement("p");
            $(p).addClass("counter");
            $(p).text("0");
            var div = document.createElement("div");
            $(div).addClass("tile");
            $(div).attr('id',"c" + x + y);
            $(div).append(p);

            if(start[0] === x && start[1] === y){
                type = "start";
                $(div).addClass("start");
            }
            else if(end[0] === x && end[1] === y){
                type = "end";
                $(div).addClass("end");
            }
            else{
                if(Math.random() < 0.3){
                    type = "wall";
                    $(div).addClass("wall");
                }
                else{
                    type = "normal"
                }
            }

            $("#box").append(div);
            
            cellList[x].push([x, y, 0, type])
        }
    }
}

function pathFind(x,y,counter = 0, callback = function(){}, path = []){
    totalIterations++;
    try{
        if(cellList[x][y][2] === 0 || cellList[x][y][2] > counter){
            if(cellList[x][y][3] === "start"){
                counter = 0;
            }
            cellList[x][y][2] = counter;
            $("#c" + x + y).children().text(counter);
            // if(path[counter] == null){
            //     if(path[counter][3] !== "finish"){
            //         path[counter] = cellList[x][y];
            //     }
            // }
            path.push(cellList[x][y]);
            if(cellList[x][y][3] === "end"){
                console.log(path);
                reachedFinish = true;
                return;
            }
            // $("#c" + x + y).css({'background-color':"red"});
            // alert("Continue")
        } else {
            return;
        }
        counter++;
        var checkList = [];
        if(x !== 0){
            var cell = cellList[x - 1][y];
            if(cell[3] !== "wall"  && (cell[2] > counter || cell[2] == 0)){
                checkList.push([x - 1, y]);
            }
            else{
            }
        }
        if(y !== 0){
            var cell = cellList[x][y - 1]
            if(cell[3] !== "wall"  && (cell[2] > counter || cell[2] == 0)){
                checkList.push([x, y - 1]);
            }
        }
        if(x !== grid){
            var cell = cellList[x + 1][y]
            if(cell[3] !== "wall"  && (cell[2] > counter || cell[2] == 0)){
                checkList.push([x + 1, y]);
            }
        }
        if(y !== grid){
            var cell = cellList[x][y + 1];
            if(cell[3] !== "wall" && (cell[2] > counter || cell[2] == 0)){
                checkList.push([x, y + 1]);
            }
        }
        // $("#c" + x + y).css({'background-color':"white"});
        for(i of checkList){
            pathFind(i[0],i[1], counter,function(){},path);
        }
        callback();
    } catch(err){
        console.log(err);
        return;
    }
}

function check(x,y){
    var exists = false;
    for(i in debugList){
        if(i[0] == x && i[1] == y){
            exists = true;
        }
    }
    console.log(exists);
}

var pathList = [];
var totalIterations = 0;
var bestIterations = 4697;
var grid;
var reachedFinish = false;
var pathfinder = [1, 1];
var start = [3,3];
var end = [8,8];

var cellList =
[

]

var path = [];

$(document).ready(function(){
    console.log(`Iterations to beat: ${bestIterations}`)
    createTable(9);
    console.log("Hi!");
    pathFind(start[0], start[1], 0, function(){
        if(reachedFinish){
            console.log("Finished");
        }
        else{
            console.log("Not Finished");
        }
        console.log(`Total Iterations: ${totalIterations}`);
        if(totalIterations < bestIterations){
            console.log(`Total Iterations is better than Best Iterations by ${bestIterations - totalIterations}`);
        }
        else{
            console.log(`Unimproved or worse`);
        }
    });
});

function regenerate(){
    totalIterations = 0;
    bestIterations = 4697;
    grid;
    reachedFinish = false;
    pathfinder = [1, 1];
    start = [3,3];
    end = [8,8];

    cellList =
    [

    ]
    console.log("iteration");
    var size = $("#size").val();
    $("#box").html("");
    createTable(size);
    pathFind(start[0], start[1], 0, function(){
        if(reachedFinish){
            console.log("Finished");
        }
        else{
            console.log("Not Finished");
        }
        console.log(`Total Iterations: ${totalIterations}`);
        if(totalIterations < bestIterations){
            console.log(`Total Iterations is better than Best Iterations by ${bestIterations - totalIterations}`);
        }
        else{
            console.log(`Unimproved or worse`);
        }
    });
}