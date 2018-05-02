import Dictionary from './dictionary.js';

/***********图的js实现*************/

function Graph() {
  const vertices = [];//存储所有顶点的名字
  const adjList = new Dictionary();//字典存储邻接表

  this.addVertex = function(v) {
    vertices.push(v);
    adjList.set(v, []);
  }

  this.addEdge = function(v, w) {
    adjList.get(v).push(w);
    adjList.get(w).push(v);//无向图的边（也可以理解为双向的)
  }
}

//Test
const graph = new Graph();
const myVertices = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
for(let i=0,len=myVertices.length; i<len; i++) {
  graph.addVertex(myVertices[i]);
}


