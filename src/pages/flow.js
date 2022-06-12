import { useState, useEffect } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  ConnectionLineType,
  addEdge,
  useNodesState,
  useEdgesState,
  Background,
  MiniMap,
  Controls,
} from 'react-flow-renderer';
import {getCuad, getCuadsID} from  "../RutasFunciones"
import dagre from 'dagre';
import Swal from 'sweetalert2'
import {Link, useNavigate} from 'react-router-dom'
import React, { useCallback } from "react";
function Flow() {
var noditos = [];
var arquitos = [];
const initialNodes = [];
const initialEdges = [];
const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));
  const nodeWidth = 172;
  const nodeHeight = 36;
  const navigate = useNavigate();
  function edit(){

  }

  const getLayoutedElements = (nodes, edges, direction = 'TB') => {
    const isHorizontal = direction === 'LR';
    dagreGraph.setGraph({ rankdir: direction });

    nodes.forEach((node) => {
      dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
    });

    edges.forEach((edge) => {
      dagreGraph.setEdge(edge.source, edge.target);
    });

    dagre.layout(dagreGraph);

    nodes.forEach((node) => {
      const nodeWithPosition = dagreGraph.node(node.id);
      node.targetPosition = isHorizontal ? 'left' : 'top';
      node.sourcePosition = isHorizontal ? 'right' : 'bottom';
      node.position = {
        x: nodeWithPosition.x - nodeWidth / 2,
        y: nodeWithPosition.y - nodeHeight / 2,
      };

      return node;
    });

    return { nodes, edges };
  };
  const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
  initialNodes,
  initialEdges
);
function getcuadritos(){
  var nodo =     {
        id: '4',
        // you can also pass a React component as a label
        data: { label: <div>Default Node</div> },
        position: { x: 150, y: 125 },
      }
initialNodes.push(nodo)
console.log(initialNodes)
}

useEffect(() => {
  var lst=[]
  getCuadsID(localStorage.getItem("histid")).then(data =>{
    console.log(localStorage.getItem("histid"))
    console.log("sss")
    data.shift()
    var nodos = [];
    var arcos = [];
    for (var i = 0; i < data.length; i++) {
      if (i == 0) {
        var nodo = {
          id: data[i].id,
          type: 'input',
          data: { label: data[i].titulo },
          position: { x: 250, y: 25 },
        }
      } else {
        var nodo = {
        id: data[i].id,
        data: { label: data[i].titulo },
        position: { x: 250, y: 25 },
      }}
      console.log(data[i])
      noditos.push(nodo)
    }
    var dataa = data.reverse()
    for (var i = 0; i < dataa.length; i++) {
      var arc = ""
      var arr =  Object.keys(dataa[i]["KeyVals"])
        for (var j = 0; j < arr.length; j++) {
          console.log(j)
          if(dataa[i].KeyVals[arr[j]] > 1){
            arc = arc + ","+ arr[j]
          }
        }
      var arco = { id: String(i)+"-"+String(i+1), source: dataa[i].fathernode, target:dataa[i].id, label:arc.slice(1) }
      arquitos.push(arco)
    }
   console.log(noditos)
   setNodes(noditos.reverse())
   setEdges(arquitos.reverse())
   getLayoutedElements(noditos,arquitos)
   console.log(arquitos)
  })

}, []);


  const onDragOver = (event => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
}, []);
const [nodes, setNodes, onNodesChange] = useNodesState(layoutedNodes);
const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges);

const onConnect = (
  (params) => setEdges((eds) => addEdge({ ...params, type: ConnectionLineType.SmoothStep, animated: true }, eds)),
  []
);
const onLayout = (
  (direction) => {
    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
      nodes,
      edges,
      direction
    );

    setNodes([...layoutedNodes]);
    setEdges([...layoutedEdges]);
  },
  [nodes, edges]
);
const handleClick = (evt, nodeData) => {
       console.log(nodeData);
      localStorage.setItem("capId",nodeData.id)
       Swal.fire({
         title: '¿Quieres editar este capítulo?',
         showCancelButton: true,
         confirmButtonText: 'Editar'
       }).then((result) => {
         /* Read more about isConfirmed, isDenied below */
         if (result.isConfirmed) {
           //localStorage.setItem("firstnode",data.result)
           //localStorage.setItem("fathernode","-")
           navigate('/new');

         }
   })

     }
const [node, setNode] = useNodesState("");
const onClickElement = useCallback((event: ReactMouseEvent, element: Node | Edge) => {
// Set the clicked element in local state
setNode(element)
console.log(element)
}, [])
  //const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [datos] = useState();
  function xx(){
    console.log("si funciona así")
  }
  function xxx(){
    console.log("si fasdfasdfasdfunciona así")
  }
  //const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    return (
        <>

          <ReactFlow connectionLineType={ConnectionLineType.SmoothStep}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          style={{ height: 875  }}
          nodes={nodes}
          onConnect={onConnect}
          edges={edges}
          onNodeClick = {handleClick}
          attributionPosition="top-center"
          fitView>
          <Background color="#0e2944" size={.2}  variant = {"lines"}/>
          <MiniMap
      nodeStrokeColor={(n) => {
        if (n.style?.background) return n.style.background;
        if (n.type === 'input') return '#0041d0';
        if (n.type === 'output') {return '#ff0072'} else return "#0e2944"

        return '#eee';
      }}
      nodeColor={(n) => {
        if (n.style?.background) return n.style.background;

        return '#fff';
      }}
      nodeBorderRadius={2}
    />
          </ReactFlow>
          <div className="controls">
          <button type="button" class="btn btn-info">Info</button>
</div>
        </>
    )
}

export default Flow
