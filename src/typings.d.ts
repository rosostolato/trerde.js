declare module 'obj-file-parser' {
  export interface Model3D {
    models: Model[]
    materialLibraries: string[]
  }

  export interface Model {
    name: string
    vertices: Vertex[]
    textureCoords: TextureCoord[]
    vertexNormals: Vertex[]
    faces: Face[]
  }

  export interface Face {
    material: string
    group: string
    smoothingGroup: number
    vertices: FaceVertex[]
  }

  export interface FaceVertex {
    vertexIndex: number
    textureCoordsIndex: number
    vertexNormalIndex: number
  }

  export interface TextureCoord {
    u: number
    v: number
    w: number
  }

  export interface Vertex {
    x: number
    y: number
    z: number
  }

  export default class OBJFile {
    constructor(fileContents: string)
    parse(): Model3D
  }
}
