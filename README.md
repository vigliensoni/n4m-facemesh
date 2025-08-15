# n4m-facemesh
Wraps [MediaPipe Facemesh](https://github.com/tensorflow/tfjs-models/tree/master/facemesh) inside electron and serves the detected parts via MaxAPI.

Based around [Yuichi Yogo](https://github.com/yuichkun)'s great work porting Electron + Tensorflow models into [Node For Max](https://github.com/Cycling74/n4m-examples)

<img width="1800" height="1169" alt="unicorn-facemesh" src="https://github.com/user-attachments/assets/b02155f3-672c-4ad9-88c4-877ebb145b95" />

# Steps
1. Install npm dependencies by clicking the indicated button. Since Electron's kind of big in size, this make take a while depending on your network environment. When the message object says it's 'completed' you'll never have to do this step again.
2. Click on the toggle button to launch MediaPipe FaceMesh. 
3. The node.script emits the detected results as a dict - retrieve values using the dictionary keys (objects on the right) 

# Controls
- `w` and `s` increase and decrease the thickness of the expanded facemesh.
-  `q` and `a` control the zooming of the facemesh.
