import OBJFile, { Model } from 'obj-file-parser'
import { Model3D } from './Model3D'

export class Prefab extends Model3D {
  materialLibraries: string[]
  models: Model[]

  constructor(objfile: string) {
    super('Prefab')
    const obj = new OBJFile(objfile).parse()
    this.materialLibraries = obj.materialLibraries
    this.models = obj.models

    let lastIndex = 0
    this.faces = this.models.flatMap(model => {
      const currIndex = lastIndex
      lastIndex += model.vertices.length
      return model.faces.map(face => ({
        color: '#aaa',
        vertices: face.vertices.map(
          vertex => model.vertices[vertex.vertexIndex - currIndex - 1]
        ),
      }))
    })
  }
}
