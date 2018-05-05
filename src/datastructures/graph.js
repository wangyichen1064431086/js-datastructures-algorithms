import Dictionary from './dictionary.js';
import Queue from './queue.js';
import Stack from './stack.js';
/***********图的js实现*************/

function Graph() {
  const vertices = [];//存储所有顶点的名字
  const adjList = new Dictionary();//字典存储邻接表

  const initializeColor = function() {
    /**
     * 白色：表示该顶点还未被发现
     * 灰色：表示该顶点已被发现但还未被探索过
     * 黑色：表示该顶点已被发现且被完全探索过
     * 
     * 此方法是将所有顶点先初始化为白色。
     */
    const color = {};
    for (let vertice of vertices) {
      color[vertice] = 'white'; 
    }
    return color;
  }

  this.addVertex = function(v) {
    vertices.push(v);
    adjList.set(v, []);
  }

  this.addEdge = function(v, w) {
    adjList.get(v).push(w);
    adjList.get(w).push(v);//无向图的边（也可以理解为双向的)
  }
  this.addEdgeSingle = function(v, w) {
    adjList.get(v).push(w);
  }

  this.toString = function() {
    let s = '';
    for (let i=0, len = vertices.length;i<len;i++) {
      s += `${vertices[i]} -> `;//顶点的名字
      let neighbors = adjList.get(vertices[i]);//取该顶点的邻接表

      for (let neighbor of neighbors) {//迭代邻接表，将相邻节点加入s
        s += `${neighbor} `;
      }
      s += '\n';
    }

    return s;
  };

  this.bfs = function(v, callback) {
    const color = initializeColor();
    const queue = new Queue();
    color[v] = 'grey';
    queue.enqueue(v);

    while(!queue.isEmpty()) {
      const u = queue.dequeue();
      const neighbors = adjList.get(u);

      for(let w of neighbors) {
        if(color[w] === 'white') {
          color[w] = 'grey';
          queue.enqueue(w);
        }
      }

      color[u] = 'black';
      if(callback) {
        callback(u);
      }
    }
  };

  this.BFS = function(v) {
    const color = initializeColor();
    const queue = new Queue();

    const d = {};//存储各个顶点距离源顶点v的距离
    const pred = {};//存储各个顶点的前溯点

    color[v] = 'grey';
    queue.enqueue(v);

    for(let vertice of vertices) { //初始化d,pred
      d[vertice] = 0;
      pred[vertice] = null;
    }

    while(!queue.isEmpty()) {
      const u = queue.dequeue();
      const neighbors = adjList.get(u);

      for(let w of neighbors) {
        if (color[w] === 'white') {
          color[w] = 'grey';
          queue.enqueue(w);
          pred[w] = u;
          d[w] = d[u] + 1;
        }
      }

      color[u] = 'black';
    }

    return {
      d,
      pred
    }
  };

  this.dfs = function(callback) {
    const dfsVist = function(v, color, callback) { //NOTE:提升只是针对声明，不针对赋值，故这里的局部函数必须先定义再调用。
      color[v] = 'grey';
      callback(v);
      const neighbors = adjList.get(v);
      for(let neighbor of neighbors) {
        if(color[neighbor] === 'white') {
          dfsVist(neighbor, color, callback);//NOTE:此行只会被调用一次，因为其他所有顶点都有路径到第一个调用该dfsVist函数的顶点(A)。如果第一个调用的顶点不是A而是其他顶点，那么可能会执行不止一次。
        }
      }
      color[v] = 'black';
    }

    const color = initializeColor();

    for (let v of vertices) {
      if (color[v] === 'white') {
        dfsVist(v, color, callback);
      }
    }

    
  };

  this.DFS = function() {
    const color = initializeColor();
    const findT = {};//存储各顶点的发现时间
    const finishT = {};//存储各顶点的完成搜索时间
    const prevV = {};//存储各顶点的前溯顶点
    let time=0;

    for(let v of vertices) {
      findT[v] = 0;
      finishT[v] = 0;
      prevV[v] = null;
    }

    //time是一个全局变量，在执行递归调用时不断增加

    const DFSVist = function(v, color, findT, finishT, prevV) {
      console.log('Find:',v);
      color[v] = 'grey';
      findT[v] = ++time;//time在发现一个新顶点时+1
      //NOTE: ++t是先自增再参与运算赋值， t++是先参与运算赋值再自增
      const neighbors = adjList.get(v);

      for(let neighbor of neighbors) {
        if (color[neighbor] === 'white') {
          prevV[neighbor] = v;
          DFSVist(neighbor, color, findT, finishT, prevV);
        }
      }
      console.log('Finish:', v)
      finishT[v] = ++time;//time在完成对某顶点的探索退回该顶点时还要+1
      color[v] = 'black';

    }

    for (let v of vertices) {
      if (color[v] === 'white') {
        DFSVist(v, color, findT, finishT, prevV);
      }
    }

    return {
      findT,
      finishT,
      prevV
    }
  }

}

//Test
const graph = new Graph();
const myVertices = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
for(let i=0,len=myVertices.length; i<len; i++) {
  graph.addVertex(myVertices[i]);
}

graph.addEdge('A', 'B');
graph.addEdge('A', 'C');
graph.addEdge('A', 'D');
graph.addEdge('C', 'D');
graph.addEdge('C', 'G');
graph.addEdge('D', 'G');
graph.addEdge('D', 'H');
graph.addEdge('B', 'E');
graph.addEdge('B', 'F');
graph.addEdge('E', 'I');

console.log(graph.toString());

function printNode(v) {
  console.log('Visited vertex:', v)
}
graph.bfs('A', printNode);

const shortestPathA = graph.BFS('A');
console.log(shortestPathA);


//构建顶点A到其他顶点的路径
const fromV = myVertices[0];
const otherVertices = myVertices.slice(1);

for (let toV of otherVertices) {
  const path = new Stack();
  let pathV = toV;
  while(pathV !== fromV) {
    path.push(pathV);
    pathV = shortestPathA.pred[pathV];
  }
  path.push(fromV);
  
  let oneS = `Goto ${toV}: ${path.pop()}`
  while(!path.isEmpty()) {
    oneS += `-${path.pop()}`;
  }

  console.log(oneS);
}
/**
 * Result:
 *  Goto B: A-B
    Goto C: A-C
    Goto D: A-D
    Goto E: A-B-E
    Goto F: A-B-F
    Goto G: A-C-G
    Goto H: A-D-H
    Goto I: A-B-E-I
 */

 // Test dfs
 graph.dfs(printNode);

 // Test DFS
 const DFSResult = graph.DFS();
 console.log(DFSResult);

 //使用DFS的结果对有向无环图（DAG）进行拓扑排序
 const dagGraph = new Graph();
 const dagVertices = ['A', 'B', 'C', 'D', 'E', 'F'];
 for (let v of dagVertices) {
   dagGraph.addVertex(v);
 }
 dagGraph.addEdgeSingle('A', 'C');
 dagGraph.addEdgeSingle('A', 'D');
 dagGraph.addEdgeSingle('B', 'D');
 dagGraph.addEdgeSingle('B', 'E');
 dagGraph.addEdgeSingle('C', 'F');
 dagGraph.addEdgeSingle('F', 'E');
 const dagGraphDFSResult = dagGraph.DFS();
 const finishTResult = dagGraphDFSResult.finishT;
 const finishTArr = [];
 for(let v in finishTResult) {
   finishTArr.push({[v]: finishTResult[v]});
 }
 console.log(finishTArr);
 finishTArr.sort((a,b) => {
   return b[Object.keys(b)[0]] - a[Object.keys(a)[0]];
 });
 console.log(finishTArr);
export default Graph;