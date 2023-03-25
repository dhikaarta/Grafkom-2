"use strict";

function main() {
    // Get A WebGL context
    /** @type {HTMLCanvasElement} */
    var canvas = document.querySelector("#myCanvas");
    var gl = canvas.getContext("webgl");
    if (!gl) {
        return;
    }

    // setup GLSL program
    var program = createProgramFromScripts(gl, [
        "vertex-shader-3d",
        "fragment-shader-3d",
    ]);

    // animation
    var cubeRotation = 0.0;
    var deltaTime = 0

    // look up where the vertex data needs to go.
    var positionLocation = gl.getAttribLocation(program, "a_position");
    var colorLocation = gl.getAttribLocation(program, "a_color");
    var normalLocation = gl.getAttribLocation(program, "a_normal")

    // lookup uniforms
    var matrixLocation = gl.getUniformLocation(program, "u_matrix");
    var modelViewMatrixLocation = gl.getUniformLocation(program, "u_modelViewMatrix");
    var uniformNormalMatrix = gl.getUniformLocation(program, "u_normal_matrix");
    var shadingConditionLocation = gl.getUniformLocation(program, "u_shading_condition");

    // init canvas state
    var loadedState;
    var canvasState;
    reset_canvas();
    
    // Create a buffer to put positions in
    var positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    // setGeometry(gl);
    if(canvasState) {
        setVertices(gl, canvasState.model.vertices);
    }

    // Create a buffer to put colors in
    var colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    // setColor(gl);
    if(canvasState) {
        setColors(gl, canvasState.model.colors);
    }

    // Create a buffer for normalization
    var normalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
    if(canvasState) {
        setNormals(gl, canvasState.model.normals);
    }

    var indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    if(canvasState) {
        setIndices(gl, canvasState.model.indices);
    }

    // function to update canvas object (rewrite buffer data)
    function updateCanvasObject() {
        // update the vertices data
        positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        setVertices(gl, canvasState.model.vertices);
        // update the colors data
        colorBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
        setColors(gl, canvasState.model.colors);
        // update the normals data
        normalBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
        setNormals(gl, canvasState.model.normals);
        
        indexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
        setIndices(gl, canvasState.model.indices);


        drawScene();
    };

    // var translation = [-200, -200, 0];
    // var rotation = [0, 0, 0];
    // var scale = [1, 1, 1];
    // var radius = 200;
    // var fieldOfViewRadians = degToRad(80);
    // var cameraAngleRadians = degToRad(0);
    // var projectionStyle = 1;
    // var shading = false;

    // Get the center point of the cube

    drawScene();

    function updatePosition(index, value) {
        canvasState.translation[index] = parseFloat(value);
    }

    function updateRotation(index, value) {
      const angleInRadians = (value * Math.PI) / 180;
        canvasState.rotation[index] = parseFloat(angleInRadians);
    }

    function updateScale(index, value) {
        canvasState.scale[index] = parseFloat(value);
    }

    function updateRadius(index, value) {
        canvasState.radius = parseFloat(value);
    }

    function updateCameraAngle(index, value) {
        canvasState.cameraAngleRadians = parseFloat(degToRad(value));
    }
    // Get all the slider input elements
    const sliders = document.querySelectorAll('.slider-controls');
    
    // Get the select element
    const projectionSelect = document.querySelector('#projection-select');

    // Get shading button
    const toggleShading = document.getElementById('shading')

    toggleShading.addEventListener('click', () => {
        if (canvasState.shading === false) {
            canvasState.shading = true
            toggleShading.innerText = 'Shading On'
            gl.uniform1f(shadingConditionLocation, 1.0);
        } else {
            canvasState.shading = false
            toggleShading.innerText = 'Shading Off'
            gl.uniform1f(shadingConditionLocation, 0.0);
        }
        drawScene()
    })

    const sliderMap = {
        "x-translate": {
            updateFunction: updatePosition,
            parameter: 0,
            min: -200,
            max: 200,
            value: canvasState.translation[0],
        },
        "y-translate": {
            updateFunction: updatePosition,
            parameter: 1,
            max: 200,
            value: canvasState.translation[1],
        },
        "z-translate": {
            updateFunction: updatePosition,
            parameter: 2,
            max: 360,
            value: canvasState.translation[2],
        },
        "angle-x": {
            updateFunction: updateRotation,
            parameter: 0,
            max: 360,
            value: (canvasState.rotation[0] * 180) / Math.PI,
        },
        "angle-y": {
            updateFunction: updateRotation,
            parameter: 1,
            max: 360,
            value: (canvasState.rotation[1] * 180) / Math.PI,
        },
        "angle-z": {
            updateFunction: updateRotation,
            parameter: 2,
            max: 360,
            value: (canvasState.rotation[2] * 180) / Math.PI,
        },
        "scale-x": {
            updateFunction: updateScale,
            parameter: 0,
            max: 5,
            value: canvasState.scale[0],
        },
        "scale-y": {
            updateFunction: updateScale,
            parameter: 1,
            max: 5,
            value: canvasState.scale[1],
        },
        "scale-z": {
            updateFunction: updateScale,
            parameter: 2,
            max: 5,
            value: canvasState.scale[2],
        },
        "camera-near": {
            updateFunction: updateRadius,
            parameter: 0,
            max: 500,
            value: canvasState.radius,
        },
        "camera-fov": {
            updateFunction: updateCameraAngle,
            parameter: 0,
            max: 360,
            value: (canvasState.cameraAngleRadians * 180) / Math.PI,
        },
    };
    
    function reset_sliders() {
        sliders.forEach((slider) => {
            const { updateFunction, parameter, max, value } = sliderMap[slider.id];
            const span = document.querySelector(`#${slider.id}-span-value`);
            slider.max = max;
            slider.value = value;
            span.textContent = value;
            slider.addEventListener("input", () => {
                span.textContent = slider.value;
                sliderMap[slider.id].updateFunction(parameter, slider.value);
                drawScene();
            });
        });
    }
    reset_sliders();

    projectionSelect.addEventListener('change', () => {
        if (projectionSelect.value === 'orthographic') {
            canvasState.projectionStyle = 1;
        } else if (projectionSelect.value === 'perspective') {
            canvasState.projectionStyle = 2;
        } else {
            canvasState.projectionStyle = 3;
        }
        drawScene();
    });

    if (canvasState.projectionStyle === 1) {
        projectionSelect.value = 'orthographic'
    } else if (canvasState.projectionStyle === 2) {
        projectionSelect.value = 'perspective'
    } else {
        projectionSelect.value = 'oblique'
    }



    // Draw the scene.
    function drawScene() {
        resizeCanvasToDisplaySize(gl.canvas);

        // Tell WebGL how to convert from clip space to pixels
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

        // Clear the canvas.
        gl.clearColor(0.8, 0.8, 0.8, 1.0);

        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        // Cull the backface
        //gl.enable(gl.CULL_FACE);

        // Enable the depth buffer
        gl.enable(gl.DEPTH_TEST);

        // Tell it to use our program (pair of shaders)
        gl.useProgram(program);

        // POSITION
        // Turn on the attribute
        gl.enableVertexAttribArray(positionLocation);

        // Bind the position buffer.
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

        // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
        var size = 3;
        var type = gl.FLOAT; 
        var normalize = false; 
        var stride = 0; 
        var offset = 0; 
        gl.vertexAttribPointer(
            positionLocation,
            size,
            type,
            normalize,
            stride,
            offset
        );
        
        // COLORS
        gl.enableVertexAttribArray(colorLocation);

        // Bind the color buffer.
        gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);

        // Tell the attribute how to get data out of colorBuffer (ARRAY_BUFFER)
        var size = 3;
        var type = gl.UNSIGNED_BYTE;
        var normalize = true;
        var stride = 0;
        var offset = 0;
        gl.vertexAttribPointer(
            colorLocation,
            size,
            type,
            normalize,
            stride,
            offset
        );
        
        var centerPoint = getBoundingBoxCenter(canvasState.model.vertices);
        
        var projectionMatrix = m4.identity();

        if (canvasState.projectionStyle === 1) {
            //ortographic
            var left = -200;
            var right = 200;
            var bottom = 200;
            var top = -200;
            var near = 1;
            var far = 2000.0;
            projectionMatrix = m4.orthographic(left, right, bottom, top, near, far);
        } else if (canvasState.projectionStyle === 2) {
            //
            var aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
            var zNear = 1;
            var zFar = 2000.0;
            
            projectionMatrix = m4.perspective(canvasState.fieldOfViewRadians, aspect, zNear, zFar);
        } else {
            //oblique
            //oblique pada intinya melakukan shear pada matrix ortho
            
            var n = m4.shear(64 ,64)
            var m = m4.orthographic(-200, 200, -200, 200, -400, 400)
            projectionMatrix = m4.multiply(m,n)
            projectionMatrix = m4.translate(projectionMatrix, -200, 0, 0.5)
            projectionMatrix = m4.xRotate(projectionMatrix, degToRad(180))
        }
        // console.log(projectionMatrix)
        
        var cameraMatrix = m4.yRotation(canvasState.cameraAngleRadians);
        cameraMatrix = m4.translate(cameraMatrix, 0, 0, canvasState.radius * 1.5);

        var cameraPosition = [
            cameraMatrix[12],
            cameraMatrix[13],
            cameraMatrix[14],
        ];

        var up = [0, 1, 0];
        var target = [0, 0, 0];

        cameraMatrix = m4.lookAt(cameraPosition, target, up);
        
        var viewMatrix = m4.inverse(cameraMatrix);
        // Compute the matrices
        viewMatrix = m4.translate(viewMatrix, centerPoint[0], centerPoint[1], centerPoint[2])
        viewMatrix = m4.xRotate(viewMatrix, canvasState.rotation[0]);
        viewMatrix = m4.yRotate(viewMatrix, canvasState.rotation[1]);
        viewMatrix = m4.zRotate(viewMatrix, canvasState.rotation[2]);
        viewMatrix = m4.translate(viewMatrix, -centerPoint[0], -centerPoint[1], -centerPoint[2]);

        var modelMatrix = m4.identity();
        modelMatrix = m4.translate(
            modelMatrix,
            canvasState.translation[0],
            canvasState.translation[1],
            canvasState.translation[2]
        );
        
        modelMatrix = m4.scale(modelMatrix, canvasState.scale[0], canvasState.scale[1], canvasState.scale[2]);
        var modelViewMatrix = m4.multiply(modelMatrix, viewMatrix);
        modelViewMatrix = m4.translate(modelViewMatrix, centerPoint[0], centerPoint[1], centerPoint[2])
        modelViewMatrix = m4.xRotate(modelViewMatrix, cubeRotation * 0.3)
        modelViewMatrix = m4.yRotate(modelViewMatrix, cubeRotation * 0.7)
        modelViewMatrix = m4.zRotate(modelViewMatrix, cubeRotation)
        modelViewMatrix = m4.translate(modelViewMatrix, -centerPoint[0], -centerPoint[1], -centerPoint[2])

        if (canvasState.shading) {
            // NORMALS
            gl.enableVertexAttribArray(normalLocation);

            // Bind the position buffer.
            gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);

            // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
            var size = 3;
            var type = gl.FLOAT; 
            var normalize = false; 
            var stride = 0; 
            var offset = 0; 
            gl.vertexAttribPointer(
                normalLocation,
                size,
                type,
                normalize,
                stride,
                offset
            );
            
            var normalMatrix = m4.inverse(modelViewMatrix)
            normalMatrix = m4.transpose(normalMatrix)

            gl.uniformMatrix4fv(uniformNormalMatrix, false, normalMatrix);
        } else {
            gl.disableVertexAttribArray(normalLocation)
        }

        gl.uniformMatrix4fv(matrixLocation, false, projectionMatrix);
        gl.uniformMatrix4fv(modelViewMatrixLocation, false, modelViewMatrix);

        // Draw the geometry.
        var primitiveType = gl.TRIANGLES;
        var offset = 0;
        var count = canvasState.model.vertices.length/2;
        var realCount = canvasState.model.vertices.length/3;
        
        if (canvasState.model.indices.length > 0) {
            gl.drawElements(gl.TRIANGLES, count, gl.UNSIGNED_SHORT, offset);
        } else {
            gl.drawArrays(primitiveType, offset, realCount);
        }
    }

    // OBJECT CHOICES
    var obj_1 = document.querySelector('#obj_1');
    obj_1.addEventListener('click', () => {
        console.log("SWITCHED TO OBJ_1");
        canvasState.model.vertices = jasonObj.vertices;
        canvasState.model.colors = jasonObj.colors;
        canvasState.model.normals = jasonObj.normals;
        canvasState.model.indices = jasonObj.indices;
        // reset_canvas(F_obj, canvasState.projectionStyle);
        updateCanvasObject();
    });
    var obj_2 = document.querySelector('#obj_2');
    obj_2.addEventListener('click', () => {
        console.log("SWITCHED TO OBJ_2");
        canvasState.model.vertices = F_obj.vertices;
        canvasState.model.colors = F_obj.colors;
        canvasState.model.normals = F_obj.normals;
        canvasState.model.indices = F_obj.indices;
        
        // reset_canvas(hollowObject, canvasState.projectionStyle);
        updateCanvasObject();
    });
    var obj_3 = document.querySelector('#obj_3');
    obj_3.addEventListener('click', () => {
        console.log("SWITCHED TO OBJ_3");
        canvasState.model.vertices = simpleObject.vertices;
        var colors = [];
        for (var i = 0; i < simpleObject.colors.length; i++) {
            const color = simpleObject.colors[i];

            colors = colors.concat(color,color,color,color);
        }
        canvasState.model.colors = colors;
        console.log(colors);
        canvasState.model.indices = simpleObject.indices;
        // reset_canvas(hollowObject, canvasState.projectionStyle);
        updateCanvasObject();
    });

    // reset view model button operation
    function reset_canvas(object = simpleObject, projectionStyle = 1) {
        console.log(object)
        canvasState = {
            model: {
                vertices: object.vertices,
                colors: object.colors,
                normals: object.normals,
                indices : object.indices,
            },
            translation         : loadedState ? [...loadedState.translation]   : [0, 0, 0],
            rotation            : loadedState ? [...loadedState.rotation]      : [0, 0, 0],
            scale               : loadedState ? [...loadedState.scale]         : [1, 1, 1],
            radius              : loadedState ? loadedState.radius             : 200,
            fieldOfViewRadians  : loadedState ? loadedState.fieldOfViewRadians : degToRad(80),
            cameraAngleRadians  : loadedState ? loadedState.cameraAngleRadians : degToRad(0),
            projectionStyle     : loadedState ? loadedState.projectionStyle    : projectionStyle,
            shading             : loadedState ? loadedState.shading            : false,
        };
    };
    var reset_view_btn = document.querySelector('#reset_view_btn');
    reset_view_btn.addEventListener('click', () => {
        console.log("RESET VIEW MODEL");
        console.log(loadedState);
        console.log("--before");
        console.log(canvasState);

        reset_canvas(canvasState.model, canvasState.projectionStyle);
        reset_sliders();
        toggleShading.innerText = 'Shading Off'
        gl.uniform1f(shadingConditionLocation, 0.0);
        drawScene();
        
        console.log("--after");
        console.log(canvasState);
    });
    // save file model operation
    var save_btn = document.querySelector('#save_btn');
    save_btn.addEventListener('click', () => {
        console.log("SAVE FILE MODEL");
        save_state(canvasState);
    });
    // load file model operation
    var load_btn = document.querySelector('#load_btn');
    load_btn.onchange = () => {
        console.log("LOAD FILE MODEL");
        const file_input = load_btn.files[0];
        load_state(file_input)
            .then(result => {
                loadedState = JSON.parse(result);
                canvasState = {...JSON.parse(result)};
                console.log(loadedState);
                updateCanvasObject();
            })
            .catch(error => {
                console.log(error);
            });
    };

    var then = 0

    function render(now) {
        now *= 0.001; // convert to seconds
        deltaTime = now - then;
        then = now;

        drawScene();
        cubeRotation += deltaTime;

        requestAnimationFrame(render);
    }
    requestAnimationFrame(render)
}

main();
