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

    // lookup uniforms
    var matrixLocation = gl.getUniformLocation(program, "u_matrix");
    var modelViewMatrixLocation = gl.getUniformLocation(program, "u_modelViewMatrix");


    // Create a buffer to put positions in
    var positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    setGeometry(gl);

    // Create a buffer to put colors in
    var colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    setColors(gl);

    var translation = [-200, -200, 0];
    var rotation = [0, 0, 0];
    var scale = [1, 1, 1];
    var radius = 200;
    var fieldOfViewRadians = degToRad(80);
    var cameraAngleRadians = degToRad(0);
    var projectionStyle = 1;

    drawScene();

    function updatePosition(index, value) {
        translation[index] = value;
    }

    function updateRotation(index, value) {
      const angleInRadians = (value * Math.PI) / 180;
        rotation[index] = angleInRadians;
    }

    function updateScale(index, value) {
        scale[index] = value;
    }

    function updateRadius(index, value) {
        radius = value;
    }

    function updateCameraAngle(index, value) {
        cameraAngleRadians = degToRad(value);
    }
    // Get all the slider input elements
    const sliders = document.querySelectorAll('.slider-controls');
    
    // Get the select element
    const projectionSelect = document.querySelector('#projection-select');

    const sliderMap = {
        "x-translate": {
            updateFunction: updatePosition,
            parameter: 0,
            min: -200,
            max: 200,
            value: translation[0],
        },
        "y-translate": {
            updateFunction: updatePosition,
            parameter: 1,
            max: 200,
            value: translation[1],
        },
        "z-translate": {
            updateFunction: updatePosition,
            parameter: 2,
            max: 360,
            value: translation[2],
        },
        "angle-x": {
            updateFunction: updateRotation,
            parameter: 0,
            max: 360,
            value: (rotation[0] * 180) / Math.PI,
        },
        "angle-y": {
            updateFunction: updateRotation,
            parameter: 1,
            max: 360,
            value: (rotation[1] * 180) / Math.PI,
        },
        "angle-z": {
            updateFunction: updateRotation,
            parameter: 2,
            max: 360,
            value: (rotation[2] * 180) / Math.PI,
        },
        "scale-x": {
            updateFunction: updateScale,
            parameter: 0,
            max: 5,
            value: scale[0],
        },
        "scale-y": {
            updateFunction: updateScale,
            parameter: 1,
            max: 5,
            value: scale[1],
        },
        "scale-z": {
            updateFunction: updateScale,
            parameter: 2,
            max: 5,
            value: scale[2],
        },
        "camera-near": {
            updateFunction: updateRadius,
            parameter: 0,
            max: 500,
            value: radius,
        },
        "camera-fov": {
            updateFunction: updateCameraAngle,
            parameter: 0,
            max: 360,
            value: (cameraAngleRadians * 180) / Math.PI,
        },
    };
    
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

    projectionSelect.addEventListener('change', () => {
        if (projectionSelect.value === 'orthographic') {
            projectionStyle = 1;
        } else if (projectionSelect.value === 'perspective') {
            projectionStyle = 2;
        } else {
            projectionStyle = 3;
        }
        drawScene();
    });



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
        
        
        var projectionMatrix = m4.identity();

        if (projectionStyle === 1) {
            //ortographic
            var left = -200;
            var right = 200;
            var bottom = 200;
            var top = -200;
            var near = 1;
            var far = 2000.0;
            projectionMatrix = m4.orthographic(left, right, bottom, top, near, far);
        } else if (projectionStyle === 2) {
            //
            var aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
            var zNear = 1;
            var zFar = 2000.0;
            
            projectionMatrix = m4.perspective(fieldOfViewRadians, aspect, zNear, zFar);
        }
        
        var cameraMatrix = m4.yRotation(cameraAngleRadians);
        cameraMatrix = m4.translate(cameraMatrix, 0, 0, radius * 1.5);

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
        
        viewMatrix = m4.xRotate(viewMatrix, rotation[0]);
        viewMatrix = m4.yRotate(viewMatrix, rotation[1]);
        viewMatrix = m4.zRotate(viewMatrix, rotation[2]);

        var modelMatrix = m4.identity();
        modelMatrix = m4.translate(
            modelMatrix,
            translation[0],
            translation[1],
            translation[2]
        );
        
        modelMatrix = m4.scale(modelMatrix, scale[0], scale[1], scale[2]);
        var modelViewMatrix = m4.multiply(viewMatrix, modelMatrix);

        gl.uniformMatrix4fv(matrixLocation, false, projectionMatrix);
        gl.uniformMatrix4fv(modelViewMatrixLocation, false, modelViewMatrix);

        // Draw the geometry.
        var primitiveType = gl.TRIANGLES;
        var offset = 0;
        var count = 16 * 6;
        gl.drawArrays(primitiveType, offset, count);
    }
}


main();
