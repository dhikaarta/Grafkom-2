var cylindric_obj = {
    vertices: [],
    colors: [],
    indices: [
      0,
    1,
    2,
    0,
    2,
    3, // front
    4,
    5,
    6,
    4,
    6,
    7, // back
    8,
    9,
    10,
    8,
    10,
    11, // top
    12,
    13,
    14,
    12,
    14,
    15, // bottom
    16,
    17,
    18,
    16,
    18,
    19, // right
    20,
    21,
    22,
    20,
    22,
    23, // left
    24,
    25,
    26,
    24,
    26,
    27, // front
    28,
    29,
    30,
    28,
    30,
    31, // back
    32,
    33,
    34,
    32,
    34,
    35, // top
    36,
    37,
    38,
    36,
    38,
    39, // bottom
    40,
    41,
    42,
    40,
    42,
    43, // right
    44,
    45,
    46,
    44,
    46,
    47, // left
    48,
    49,
    50,
    48,
    50,
    51, // front
    52,
    53,
    54,
    52,
    54,
    55, // back
    56,
    57,
    58,
    56,
    58,
    59, // top
    60,
    61,
    62,
    60,
    62,
    63, // bottom
    64,
    65,
    66,
    64,
    66,
    67, // right
    68,
    69,
    70,
    68,
    70,
    71, // left
    72,
    73,
    74,
    72,
    74,
    75, //1
    76,
    77,
    78,
    76,
    78,
    79, //2
    80,
    81,
    82,
    80,
    82,
    83, //3
    84,
    85,
    86,
    84,
    86,
    87, //4
    88,
    89,
    90,
    88,
    90,
    91, //5
    92,
    93,
    94,
    92,
    94,
    95, //6
    96, 97, 98, 
    96, 98, 99, 
    100, 101, 102, 
    100, 102, 103, 
    104, 105, 106,
    104, 106, 107, 
    108, 109, 110, 
    108, 110, 111, 
    112, 113, 114, 
    112, 114, 115, 
    116, 117, 118, 
    116, 118, 119, 
    120, 121, 122, 
    120, 122, 123, 
    124, 125, 126, 
    124, 126, 127, 
    128, 129, 130, 
    128, 130, 131, 
    132, 133, 134, 
    132, 134, 135, 
    136, 137, 138, 
    136, 138, 139, 
    140, 141, 142, 
    140, 142, 143, 
    144, 145, 146, 
    144, 146, 147, 
    148, 149, 150, 
    148, 150, 151, 
    152, 153, 154, 
    152, 154, 155, 
    156, 157, 158, 
    156, 158, 159, 
    160, 161, 162, 
    160, 162, 163, 
    164, 165, 166, 
    164, 166, 167, 
    168, 169, 170, 
    168, 170, 171, 
    172, 173, 174, 
    172, 174, 175, 
    176, 177, 178, 
    176, 178, 179, 
    180, 181, 182, 
    180, 182, 183, 
    184, 185, 186, 
    184, 186, 187, 
    188, 189, 190, 
    188, 190, 191,
    192,
    193,
    194,
    192,
    194,
    195, //1
    196,
    197,
    198,
    196,
    198,
    199, //2
    200,
    201,
    202,
    200,
    202,
    203, //3
    204,
    205,
    206,
    204,
    206,
    207, //4
    208,
    209,
    210,
    208,
    210,
    211, //5
    212,
    213,
    214,
    212,
    214,
    215, //6
    216,
    217,
    218,
    216,
    218,
    219, //1
    220,
    221,
    222,
    220,
    222,
    223, //2
    224,
    225,
    226,
    224,
    226,
    227, //3
    228,
    229,
    230,
    228,
    230,
    231, //4
    232,
    233,
    234,
    232,
    234,
    235, //5
    236,
    237,
    238,
    236,
    238,
    239, //6
    240,
    241,
    242,
    240,
    242,
    243, //1
    244,
    245,
    246,
    244,
    246,
    247, //2
    248,
    249,
    250,
    248,
    250,
    251, //3
    252,
    253,
    254,
    252,
    254,
    255, //4
    256,
    257,
    258,
    256,
    258,
    259, //5
    260,
    261,
    262,
    260,
    262,
    263, //6
    264,
    265,
    266,
    264,
    266,
    267, //1
    268,
    269,
    270,
    268,
    270,
    271, //2
    272,
    273,
    274,
    272,
    274,
    275, //3
    276,
    277,
    278,
    276,
    278,
    279, //4
    280,
    281,
    282,
    280, 
    282,
    283, //5
    284,
    285,
    286,
    284,
    286,
    287, //6
    ],
    normals: [
       //front
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    //back
    0, 0, -1,
    0, 0, -1,
    0, 0, -1,
    0, 0, -1,
    0, 0, -1,
    0, 0, -1,
    //top
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,
    //bottom
    0, -1, 0,
    0, -1, 0,
    0, -1, 0,
    0, -1, 0,
    0, -1, 0,
    0, -1, 0,
    //right
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    //left
    -1, 0, 0,
    -1, 0, 0,
    -1, 0, 0,
    -1, 0, 0,
    -1, 0, 0,
    -1, 0, 0,

    //front
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    //back
    0, 0, -1,
    0, 0, -1,
    0, 0, -1,
    0, 0, -1,
    0, 0, -1,
    0, 0, -1,
    //top
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,
    //bottom
    0, -1, 0,
    0, -1, 0,
    0, -1, 0,
    0, -1, 0,
    0, -1, 0,
    0, -1, 0,
    //right
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    //left
    -1, 0, 0,
    -1, 0, 0,
    -1, 0, 0,
    -1, 0, 0,
    -1, 0, 0,
    -1, 0, 0,

    //bottom
    0, -1, 0,
    0, -1, 0,
    0, -1, 0,
    0, -1, 0,
    0, -1, 0,
    0, -1, 0,
    //top
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,
    //front
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    //back
    0, 0, -1,
    0, 0, -1,
    0, 0, -1,
    0, 0, -1,
    0, 0, -1,
    0, 0, -1,
    //left
    -1, 0, 0,
    -1, 0, 0,
    -1, 0, 0,
    -1, 0, 0,
    -1, 0, 0,
    -1, 0, 0,
    //right
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,

    //bottom
    0, -1, 0,
    0, -1, 0,
    0, -1, 0,
    0, -1, 0,
    0, -1, 0,
    0, -1, 0,
    //top
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,
    //front
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    //back
    0, 0, -1,
    0, 0, -1,
    0, 0, -1,
    0, 0, -1,
    0, 0, -1,
    0, 0, -1,
    //left
    -1, 0, 0,
    -1, 0, 0,
    -1, 0, 0,
    -1, 0, 0,
    -1, 0, 0,
    -1, 0, 0,
    //right
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,

    //front
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    //back
    0, 0, -1,
    0, 0, -1,
    0, 0, -1,
    0, 0, -1,
    0, 0, -1,
    0, 0, -1,
    //top
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,
    //bottom
    0, -1, 0,
    0, -1, 0,
    0, -1, 0,
    0, -1, 0,
    0, -1, 0,
    0, -1, 0,
    //right
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    //left
    -1, 0, 0,
    -1, 0, 0,
    -1, 0, 0,
    -1, 0, 0,
    -1, 0, 0,
    -1, 0, 0,

    //front
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    //back
    0, 0, -1,
    0, 0, -1,
    0, 0, -1,
    0, 0, -1,
    0, 0, -1,
    0, 0, -1,
    //top
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,
    //bottom
    0, -1, 0,
    0, -1, 0,
    0, -1, 0,
    0, -1, 0,
    0, -1, 0,
    0, -1, 0,
    //right
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    //left
    -1, 0, 0,
    -1, 0, 0,
    -1, 0, 0,
    -1, 0, 0,
    -1, 0, 0,
    -1, 0, 0,

    //bottom
    0, -1, 0,
    0, -1, 0,
    0, -1, 0,
    0, -1, 0,
    0, -1, 0,
    0, -1, 0,
    //top
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,
    //front
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    //back
    0, 0, -1,
    0, 0, -1,
    0, 0, -1,
    0, 0, -1,
    0, 0, -1,
    0, 0, -1,
    //left
    -1, 0, 0,
    -1, 0, 0,
    -1, 0, 0,
    -1, 0, 0,
    -1, 0, 0,
    -1, 0, 0,
    //right
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,

    //bottom
    0, -1, 0,
    0, -1, 0,
    0, -1, 0,
    0, -1, 0,
    0, -1, 0,
    0, -1, 0,
    //top
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,
    //front
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    //back
    0, 0, -1,
    0, 0, -1,
    0, 0, -1,
    0, 0, -1,
    0, 0, -1,
    0, 0, -1,
    //left
    -1, 0, 0,
    -1, 0, 0,
    -1, 0, 0,
    -1, 0, 0,
    -1, 0, 0,
    -1, 0, 0,
    //right
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,

    //front
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    //back
    0, 0, -1,
    0, 0, -1,
    0, 0, -1,
    0, 0, -1,
    0, 0, -1,
    0, 0, -1,
    //top
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,
    //bottom
    0, -1, 0,
    0, -1, 0,
    0, -1, 0,
    0, -1, 0,
    0, -1, 0,
    0, -1, 0,
    //right
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    //left
    -1, 0, 0,
    -1, 0, 0,
    -1, 0, 0,
    -1, 0, 0,
    -1, 0, 0,
    -1, 0, 0,

    //front
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    //back
    0, 0, -1,
    0, 0, -1,
    0, 0, -1,
    0, 0, -1,
    0, 0, -1,
    0, 0, -1,
    //top
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,
    //bottom
    0, -1, 0,
    0, -1, 0,
    0, -1, 0,
    0, -1, 0,
    0, -1, 0,
    0, -1, 0,
    //right
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    //left
    -1, 0, 0,
    -1, 0, 0,
    -1, 0, 0,
    -1, 0, 0,
    -1, 0, 0,
    -1, 0, 0,

    //bottom
    0, -1, 0,
    0, -1, 0,
    0, -1, 0,
    0, -1, 0,
    0, -1, 0,
    0, -1, 0,
    //top
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,
    //front
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    //back
    0, 0, -1,
    0, 0, -1,
    0, 0, -1,
    0, 0, -1,
    0, 0, -1,
    0, 0, -1,
    //left
    -1, 0, 0,
    -1, 0, 0,
    -1, 0, 0,
    -1, 0, 0,
    -1, 0, 0,
    -1, 0, 0,
    //right
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,

    //bottom
    0, -1, 0,
    0, -1, 0,
    0, -1, 0,
    0, -1, 0,
    0, -1, 0,
    0, -1, 0,
    //top
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,
    //front
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    //back
    0, 0, -1,
    0, 0, -1,
    0, 0, -1,
    0, 0, -1,
    0, 0, -1,
    0, 0, -1,
    //left
    -1, 0, 0,
    -1, 0, 0,
    -1, 0, 0,
    -1, 0, 0,
    -1, 0, 0,
    -1, 0, 0,
    //right
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    ],
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