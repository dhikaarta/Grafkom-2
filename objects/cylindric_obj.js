var cylindric_obj = {
    vertices: [],
    colors: [],
};
  
  const numSlices = 16;
  const radius = 50.0;
  const height = 150.0;
  
  // Create top and bottom caps of the cylinder
  for (let i = 0; i < numSlices; i++) {
    const theta = i * (2 * Math.PI) / numSlices;
  
    // Top cap
    cylindric_obj.vertices.push(radius * Math.cos(theta), height / 2, radius * Math.sin(theta));
    cylindric_obj.vertices.push(radius * Math.cos(theta + (2 * Math.PI) / numSlices), height / 2, radius * Math.sin(theta + (2 * Math.PI) / numSlices));
    cylindric_obj.vertices.push(0, height / 2, 0);
  
    // Bottom cap
    cylindric_obj.vertices.push(radius * Math.cos(theta), -height / 2, radius * Math.sin(theta));
    cylindric_obj.vertices.push(radius * Math.cos(theta + (2 * Math.PI) / numSlices), -height / 2, radius * Math.sin(theta + (2 * Math.PI) / numSlices));
    cylindric_obj.vertices.push(0, -height / 2, 0);
  
    // Add color for top and bottom caps
    cylindric_obj.colors.push(100.0, 0.0, 0.0);
    cylindric_obj.colors.push(100.0, 0.0, 0.0);
    cylindric_obj.colors.push(100.0, 0.0, 0.0);
    cylindric_obj.colors.push(0.0, 100.0, 0.0);
    cylindric_obj.colors.push(0.0, 100.0, 0.0);
    cylindric_obj.colors.push(0.0, 100.0, 0.0);
  

    // create outer vertices
    const outerTop1 = [radius * Math.cos(theta), height / 2, radius * Math.sin(theta)];
    const outerTop2 = [radius * Math.cos(theta + (2 * Math.PI) / numSlices), height / 2, radius * Math.sin(theta + (2 * Math.PI) / numSlices)];
    const outerBottom1 = [radius * Math.cos(theta), -height / 2, radius * Math.sin(theta)];
    const outerBottom2 = [radius * Math.cos(theta + (2 * Math.PI) / numSlices), -height / 2, radius * Math.sin(theta + (2 * Math.PI) / numSlices)];
    
    // create inner vertices
    const innerTop1 = [0.8 * radius * Math.cos(theta), height / 2, 0.8 * radius * Math.sin(theta)];
    const innerTop2 = [0.8 * radius * Math.cos(theta + (2 * Math.PI) / numSlices), height / 2, 0.8 * radius * Math.sin(theta + (2 * Math.PI) / numSlices)];
    const innerBottom1 = [0.8 * radius * Math.cos(theta), -height / 2, 0.8 * radius * Math.sin(theta)];
    const innerBottom2 = [0.8 * radius * Math.cos(theta + (2 * Math.PI) / numSlices), -height / 2, 0.8 * radius * Math.sin(theta + (2 * Math.PI) / numSlices)];
    
    // add outer vertices
    cylindric_obj.vertices.push(...outerTop1);
    cylindric_obj.vertices.push(...outerTop2);
    cylindric_obj.vertices.push(...outerBottom1);
    
    cylindric_obj.vertices.push(...outerTop2);
    cylindric_obj.vertices.push(...outerBottom2);
    cylindric_obj.vertices.push(...outerBottom1);
    
    // add color for outer vertices
    cylindric_obj.colors.push(0.0, 0.0, 100.0);
    cylindric_obj.colors.push(0.0, 0.0, 100.0);
    cylindric_obj.colors.push(0.0, 0.0, 100.0);
    cylindric_obj.colors.push(0.0, 0.0, 100.0);
    cylindric_obj.colors.push(0.0, 0.0, 100.0);
    cylindric_obj.colors.push(0.0, 0.0, 100.0);
    
    // add inner vertices
    cylindric_obj.vertices.push(...innerTop1);
    cylindric_obj.vertices.push(...innerBottom1);
    cylindric_obj.vertices.push(...innerTop2);
    
    cylindric_obj.vertices.push(...innerTop2);
    cylindric_obj.vertices.push(...innerBottom1);
    cylindric_obj.vertices.push(...innerBottom2);
    
    // add color for inner vertices
    cylindric_obj.colors.push(100.0, 100.0, 0.0);
    cylindric_obj.colors.push(100.0, 100.0, 0.0);
    cylindric_obj.colors.push(100.0, 100.0, 0.0);
    cylindric_obj.colors.push(100.0, 100.0, 0.0);
    cylindric_obj.colors.push(100.0, 100.0, 0.0);
    cylindric_obj.colors.push(100.0, 100.0, 0.0);
  };
