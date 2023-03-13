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

    // lookup uniforms
    var colorLocation = gl.getUniformLocation(program, "u_color");
    var matrixLocation = gl.getUniformLocation(program, "u_matrix");

    // Create a buffer to put positions in
    var positionBuffer = gl.createBuffer();
    // Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = positionBuffer)
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    // Put geometry data into buffer
    setGeometry(gl);

    var translation = [100, 150, 0];
    var rotation = [degToRad(40), degToRad(25), degToRad(325)];
    var scale = [1, 1, 1];
    var color = [Math.random(), Math.random(), Math.random(), 1];

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
    // Get all the slider input elements
    const sliders = document.querySelectorAll('.slider-controls');

    const sliderMap = {
        "x-translate": {
            updateFunction: updatePosition,
            parameter: 0,
            max: gl.canvas.width,
            value: translation[0],
        },
        "y-translate": {
            updateFunction: updatePosition,
            parameter: 1,
            max: gl.canvas.height,
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
            max: 2,
            value: scale[0],
        },
        "scale-y": {
            updateFunction: updateScale,
            parameter: 1,
            max: 2,
            value: scale[1],
        },
        "scale-z": {
            updateFunction: updateScale,
            parameter: 2,
            max: 2,
            value: scale[2],
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


    // Draw the scene.
    function drawScene() {
        resizeCanvasToDisplaySize(gl.canvas);

        // Tell WebGL how to convert from clip space to pixels
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

        // Clear the canvas.
        gl.clearColor(0.8, 0.8, 0.8, 1.0);

        gl.clear(gl.COLOR_BUFFER_BIT);

        // Tell it to use our program (pair of shaders)
        gl.useProgram(program);

        // Turn on the attribute
        gl.enableVertexAttribArray(positionLocation);

        // Bind the position buffer.
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

        // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
        var size = 3; // 3 components per iteration
        var type = gl.FLOAT; // the data is 32bit floats
        var normalize = false; // don't normalize the data
        var stride = 0; // 0 = move forward size * sizeof(type) each iteration to get the next position
        var offset = 0; // start at the beginning of the buffer
        gl.vertexAttribPointer(
        positionLocation,
        size,
        type,
        normalize,
        stride,
        offset
        );

        // set the color
        gl.uniform4fv(colorLocation, color);

        // Compute the matrices
        var matrix = m4.projection(
        gl.canvas.clientWidth,
        gl.canvas.clientHeight,
        400
        );
        matrix = m4.translate(
        matrix,
        translation[0],
        translation[1],
        translation[2]
        );
        matrix = m4.xRotate(matrix, rotation[0]);
        matrix = m4.yRotate(matrix, rotation[1]);
        matrix = m4.zRotate(matrix, rotation[2]);
        matrix = m4.scale(matrix, scale[0], scale[1], scale[2]);

        // Set the matrix.
        gl.uniformMatrix4fv(matrixLocation, false, matrix);

        // Draw the geometry.
        var primitiveType = gl.TRIANGLES;
        var offset = 0;
        var count = 16 * 6;
        gl.drawArrays(primitiveType, offset, count);
    }
    }



    // Fill the buffer with the values that define a letter 'F'.
    function setGeometry(gl) {
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([
        // left column front
        0, 0, 0, 30, 0, 0, 0, 150, 0, 0, 150, 0, 30, 0, 0, 30, 150, 0,

        // top rung front
        30, 0, 0, 100, 0, 0, 30, 30, 0, 30, 30, 0, 100, 0, 0, 100, 30, 0,

        // middle rung front
        30, 60, 0, 67, 60, 0, 30, 90, 0, 30, 90, 0, 67, 60, 0, 67, 90, 0,

        // left column back
        0, 0, 30, 30, 0, 30, 0, 150, 30, 0, 150, 30, 30, 0, 30, 30, 150, 30,

        // top rung back
        30, 0, 30, 100, 0, 30, 30, 30, 30, 30, 30, 30, 100, 0, 30, 100, 30, 30,

        // middle rung back
        30, 60, 30, 67, 60, 30, 30, 90, 30, 30, 90, 30, 67, 60, 30, 67, 90, 30,

        // top
        0, 0, 0, 100, 0, 0, 100, 0, 30, 0, 0, 0, 100, 0, 30, 0, 0, 30,

        // top rung right
        100, 0, 0, 100, 30, 0, 100, 30, 30, 100, 0, 0, 100, 30, 30, 100, 0, 30,

        // under top rung
        30, 30, 0, 30, 30, 30, 100, 30, 30, 30, 30, 0, 100, 30, 30, 100, 30, 0,

        // between top rung and middle
        30, 30, 0, 30, 30, 30, 30, 60, 30, 30, 30, 0, 30, 60, 30, 30, 60, 0,

        // top of middle rung
        30, 60, 0, 30, 60, 30, 67, 60, 30, 30, 60, 0, 67, 60, 30, 67, 60, 0,

        // right of middle rung
        67, 60, 0, 67, 60, 30, 67, 90, 30, 67, 60, 0, 67, 90, 30, 67, 90, 0,

        // bottom of middle rung.
        30, 90, 0, 30, 90, 30, 67, 90, 30, 30, 90, 0, 67, 90, 30, 67, 90, 0,

        // right of bottom
        30, 90, 0, 30, 90, 30, 30, 150, 30, 30, 90, 0, 30, 150, 30, 30, 150, 0,

        // bottom
        0, 150, 0, 0, 150, 30, 30, 150, 30, 0, 150, 0, 30, 150, 30, 30, 150, 0,

        // left side
        0, 0, 0, 0, 0, 30, 0, 150, 30, 0, 0, 0, 0, 150, 30, 0, 150, 0,
        ]),
        gl.STATIC_DRAW
    );
    }

    main();
