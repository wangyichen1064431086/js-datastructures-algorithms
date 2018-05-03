import Dictionary from './dictionary.js';
import Queue from './queue.js';
import watch from 'rollup';
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
console.log(graph.BFS('A'));
export default Graph;