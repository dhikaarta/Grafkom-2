function setVertices(gl, vertices) {
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array(vertices),
    gl.STATIC_DRAW
  )
}

function setNormals(gl, normals) {
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array(normals),
    gl.STATIC_DRAW
  )
}

function setColors(gl, colors) {
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Uint8Array(colors),
    gl.STATIC_DRAW
  )
}

function setColors2(gl, colors) {
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Uint8Array(colors),
    gl.STATIC_DRAW
  )
}

function setIndices(gl, indices) {
  gl.bufferData(
    gl.ELEMENT_ARRAY_BUFFER,
    new Uint16Array(indices),
    gl.STATIC_DRAW
  )
}