import Dictionary from './dictionary.js';
import Queue from './queue.js';
import Stack from './stack.js';
/***********图的js实现*************/

function Graph() { //MARK: 基于邻接表
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
  };


 
 
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
console.log('graph instance:')
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



//最短路径算法：
///1.Dijkstra算法:基于邻接矩阵
  ///寻找顶点A和其余顶点之间的最短路径：
const graphNew = [ //A, B, C, D, E, F顶点的邻接矩阵
      //A, B, C, D, E, F
  /*A*/[0, 2, 4, 0, 0, 0],//A->B距离为2， B->A距离为0
  /*B*/[0, 0, 1, 4, 2, 0],
  /*C*/[0, 0, 0, 0, 3, 0],
  /*D*/[0, 0, 0, 0, 0, 2],
  /*E*/[0, 0, 0, 3, 0, 2],
  /*F*/[0, 0, 0, 0, 0, 0]     
];
const INF = Number.MAX_SAFE_INTEGER;//JavaScript最大数，该数是一个十进制16位的数

const minDistance = function(dist, visited) {
  /**
   * @param dist  TYPE Array[Number],存放A分别到A、B、C、D、E、F的距离。在dijkstra中调用时的初始值为[0, INF, INF, INF, INF, INF]
   * @param visited TYPE Array[Bool],存放是否已经访问过A、B、C、D、E、F。在dijkstra中调用时的初始值为[false, false, false, false, false, false]
   * @description 搜索dist数组的最小值，并返回它在dist中的索引，即可以找到离A最近的那个点的索引
   */
  let min = INF;
  let minIndex = -1;

  for(let v = 0; v < dist.length; v++) {
    if (visited[v] === false && dist[v] <= min) {
      min = dist[v];
      minIndex = v;
    }
  }
  return minIndex; //第一次调用得到结果为0
};
  
const dijkstra = function(srcV) {
  /**
   * @param srcV: 源顶点的索引
   */
  const dist = [];//存放A分别到A、B、C、D、E、F的最短路径距离
  const visited = [];//存放是否已经访问过A、B、C、D、E、F
  const length = graphNew.length;

  for (let i = 0; i < length; i++) {
    dist[i] = INF;//先把最短路径距离都初始化为无限大
    visited[i] = false;
  }

  dist[srcV] = 0; //源顶点自己到自己的距离当然为0

  for (let i = 0; i < length-1; i++) {
    console.log(`dist:${dist.toString()}`);
    console.log(`visited: ${visited.toString()}`);
    const u = minDistance(dist, visited);//找出未访问顶点中距离源顶点最近的顶点的索引，第一次调用得到结果为0，即源顶点A自己
    console.log(`u: ${u}`);
    visited[u] = true;//下一轮循环再找下一个距离源顶点第二近的顶点时，就排除u了

    for (let v = 0; v < length; v++) {//该循环可以找出u的所有相邻点v的dist[v]
      if (!visited[v] && graphNew[u][v] != 0 && dist[u] != INF && dist[u] + graphNew[u][v] < dist[v]) {
        //graphNew[u][v]是顶点u到顶点v的直接路径距离
        //该条件可翻译为：如果顶点v没有被访问，且u到v的直接路径不为0， 且 源顶点到顶点u的最短路径不为INF, 且 (源顶点到顶点u的最短路径 与 顶点u到顶点v的直接路径) 距离之和 小于 源顶点到顶点v的最短路径距离
        dist[v] = dist[u] + graphNew[u][v]; //更新源顶点到顶点v的最短路径的值
        console.log(`v:${v}`);
        console.log(`dist[v]: ${dist[v]}`);
      }
    }
    
  }
  return dist;
}

console.log(dijkstra(0));

///2.Floyd-Warshall算法：基于邻接矩阵
const floydWarshall = function(graph) {
  const dist = [];
  const length = graph.length;
  let i, j, k;

  for (i = 0; i < length; i++) {
    dist[i] = [];
    for (j = 0; j < length; j++) {
      if(i!==j && graph[i][j] === 0) { //邻接矩阵中为0的点之间距离直接设为INF
        dist[i][j]=Infinity;
      } else {
        dist[i][j] = graph[i][j];
      }
    }
  }


  for (i = 0; i < length; i++) {
    for (k = 0; k < length; k++) {
      for (j = 0; j < length; j++) {
        if (dist[i][k] + dist[k][j] < dist[i][j]) {
          dist[i][j] = dist[i][k] + dist[k][j];
        }
      }
    }
  }
  return dist;
};
console.log(floydWarshall(graphNew));

//最小生成树
///1.Prim算法
const prim = function(graph) {
  const parent = [];//存放每个顶点的parent顶点的index
  const key = [];//存放每个顶点到parent顶点的距离
  const visited = [];
  const length = graph.length;//顶点个数
  
  for (let i = 0; i < length; i++) {
    key[i] = INF;
    visited[i] = false;
  }//把所有顶点在最小生成树中到根顶点的距离初始化为INF,visited都初始化为false

  key[0] = 0;//第一个顶点A作为最小生成树的根节点，那么它的key值就为0，parent顶点的序号为-1
  parent[0] = -1;

  for (let i = 0; i < length-1; i++) {//对每个顶点求最小生成树
    let u = minDistance(key, visited);//先假设所有剩余顶点都是顶点u的子节点,key中存放着到顶点u的所有距离。当i=0时，即假设所有B,C,D,E,F都是A的子节点。搜索key数组的最小值，并返回它在key中的索引，即可以找到离A最近的那个点的索引。
    visited[u] = true;//顶点u记为已被访问过
    for (let v = 0; v < length; v++) {
      if (graph[u][v] && visited[v] == false && graph[u][v] < key[v]) {//在未访问过的剩余顶点v中，找到u-v距离小于key[v]的那个顶点v，那么v的parent顶点就是u, key[v]就为u到v的距离
        parent[v] = u;
        key[v] = graph[u][v];
      }
    }

  }
  return parent;
}
console.log('Prim:');
const graphMST = [ //A, B, C, D, E, F顶点的邻接矩阵
  //A, B, C, D, E, F
/*A*/[0, 2, 4, 0, 0, 0],//A->B距离为2， B->A距离为0
/*B*/[2, 0, 2, 4, 2, 0],
/*C*/[4, 2, 0, 0, 3, 0],
/*D*/[0, 4, 0, 0, 3, 2],
/*E*/[0, 2, 3, 3, 0, 2],
/*F*/[0, 0, 0, 2, 2, 0]     
];
const parent = prim(graphMST);

console.log(parent);//[-1, 0, 1, 5, 1, 4]

///2. Kruskal算法:计算结果不正确
function kruskal(graph) {
  const length = graph.length;//图中的顶点数
  const parent = [];//存储每个顶点的在最小生成树中的父节点的index
  const cost = deepCopy(graph);//存储graph的副本
  console.log('cost:');
  console.log(cost);
  let ne = 0;//存储最小生成树的边数
  let u;
  let v;
  while(ne < length-1) {
    for (let i = 0, min = INF; i < length; i++) { //找出所有边中权值最小的边，将该最小权值存储于min
      for (let j = 0; j < length; j++) {
        if (cost[i][j] < min) {
          min = cost[i][j];
          u = i;
          v = j;
        }
      }
    }//得到权值最小的边的两个顶点的序号为u,v
    console.log('u:',u);
    console.log('v', v);
    //找出u,v在parent数组中是否已经有了父节点，并返回最顶父节点
    u = find(u, parent);//找出当前parent数组(MST)中u的根节点的index，将u-v的路径转化为u的根节点到v的根节点的路径
    v = find(v, parent);

    console.log('u:',u);
    console.log('v', v);

    if (union(u, v, parent)) {//如果u,v不同那么就将此边保存：通过将parent[v]赋值成u来保存。 同时为MST的边数计数器ne加1.
      console.log('parent:');
      console.log(parent);
      ne++;
    }
    cost[u][v] = cost[v][u] = INF;//从cost中移除这一次循环找到的边u->v和v->u
  }
  return parent;
}

function deepCopy(graph) {
  const copy = [];
  const len = graph.length;
  for (let i = 0; i < len; i++) {
      copy[i] = [];//MARK:一定要这样初始化一维数组，否则二维数组会报错
    for (let j = 0; j < len; j++) {
      if(graph[i][j] === 0) {
        copy[i][j] = INF;
      } else {
        copy[i][j] = graph[i][j];
      }
     
    }
  }
  return copy;
}
function find(i, parent) {
  while (parent[i]) {
    i = parent[i];
  }
  return i;
}
function union(i, j, parent) {
  if (i != j) {
    parent[j] = i; //在parent数组中存入 序号为j的顶点 在MST中的父节点的序号i
    return true;
  }
  return false;
}



console.log(kruskal(graphMST));
// Kruskal的运行变量变化

/*
u | v|find后的u|find后的v | union(u,v,parent) | parent 
--|--|--------|----------|-------------------|-------
0 | 1|       0|          1| parent[1] = 0;true|[NULL, 0]            1 | 2|       0|     1 | 2| parent[2]

*/
export default Graph;