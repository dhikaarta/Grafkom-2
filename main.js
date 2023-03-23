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

    // look up where the vertex data needs to go.
    var positionLocation = gl.getAttribLocation(program, "a_position");
    var colorLocation = gl.getAttribLocation(program, "a_color");
    var normalLocation = gl.getAttribLocation(program, "a_normal")

    // lookup uniforms
    var matrixLocation = gl.getUniformLocation(program, "u_matrix");
    var modelViewMatrixLocation = gl.getUniformLocation(program, "u_modelViewMatrix");
    var uniformNormalMatrix = gl.getUniformLocation(program, "u_normal_matrix");
    var shadingConditionLocation = gl.getUniformLocation(program, "u_shading_condition");

    // Create a buffer to put positions in
    var positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    setGeometry(gl);

    // Create a buffer to put colors in
    var colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    setColor(gl);

    // Create a buffer for normalization
    var normalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
    setNormal(gl)

    // var translation = [-200, -200, 0];
    // var rotation = [0, 0, 0];
    // var scale = [1, 1, 1];
    // var radius = 200;
    // var fieldOfViewRadians = degToRad(80);
    // var cameraAngleRadians = degToRad(0);
    // var projectionStyle = 1;
    // var shading = false;
    // init setup canvasState
    var canvasState;
    reset_canvas();

    drawScene();

    function updatePosition(index, value) {
        canvasState.translation[index] = value;
    }

    function updateRotation(index, value) {
      const angleInRadians = (value * Math.PI) / 180;
        canvasState.rotation[index] = angleInRadians;
    }

    function updateScale(index, value) {
        canvasState.scale[index] = value;
    }

    function updateRadius(index, value) {
        canvasState.radius = value;
    }

    function updateCameraAngle(index, value) {
        canvasState.cameraAngleRadians = degToRad(value);
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
        gl.enable(gl.CULL_FACE);

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
            
            var normalMatrix = m4.identity()
            normalMatrix = m4.xRotate(normalMatrix, canvasState.rotation[0]);
            normalMatrix = m4.yRotate(normalMatrix, canvasState.rotation[1]);
            normalMatrix = m4.zRotate(normalMatrix, canvasState.rotation[2]);

            gl.uniformMatrix4fv(uniformNormalMatrix, false, normalMatrix);
        } else {
            gl.disableVertexAttribArray(normalLocation)
        }
        
        
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
            projectionMatrix = m4.translate(projectionMatrix, 50, -155, 0.5)
            projectionMatrix = m4.xRotate(projectionMatrix, degToRad(180))
        }
        console.log(projectionMatrix)
        
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
        
        viewMatrix = m4.xRotate(viewMatrix, canvasState.rotation[0]);
        viewMatrix = m4.yRotate(viewMatrix, canvasState.rotation[1]);
        viewMatrix = m4.zRotate(viewMatrix, canvasState.rotation[2]);

        var modelMatrix = m4.identity();
        modelMatrix = m4.translate(
            modelMatrix,
            canvasState.translation[0],
            canvasState.translation[1],
            canvasState.translation[2]
        );
        
        modelMatrix = m4.scale(modelMatrix, canvasState.scale[0], canvasState.scale[1], canvasState.scale[2]);
        var modelViewMatrix = m4.multiply(viewMatrix, modelMatrix);

        gl.uniformMatrix4fv(matrixLocation, false, projectionMatrix);
        gl.uniformMatrix4fv(modelViewMatrixLocation, false, modelViewMatrix);

        // Draw the geometry.
        var primitiveType = gl.TRIANGLES;
        var offset = 0;
        var count = 16 * 6;
        gl.drawArrays(primitiveType, offset, count);
    }

    // reset view model button operation
    function reset_canvas(projectionStyle = 1) {
        canvasState = {
            model: {
                geometry: [],
                colors: [],
            },
            translation         : [-200, -200, 0],
            rotation            : [0, 0, 0],
            scale               : [1, 1, 1],
            radius              : 200,
            fieldOfViewRadians  : degToRad(80),
            cameraAngleRadians  : degToRad(0),
            projectionStyle     : projectionStyle,
            shading             : false,
        };
    }
    var reset_view_btn = document.querySelector('#reset_view_btn');
    reset_view_btn.addEventListener('click', () => {
        console.log("RESET VIEW MODEL");
        console.log("--before");

        console.log(canvasState);
        reset_canvas(canvasState.projectionStyle);
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

    });
    // load file model operation
    var load_btn = document.querySelector('#load_btn');
    load_btn.addEventListener('click', () => {
        console.log("LOAD FILE MODEL");

    });
}

main();
