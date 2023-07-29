/**
 * @class Buffer
 * A utility class for creating and managing WebGL buffers.
 */
export default class Buffer {
    /**
     * @constructs Buffer
     * @param {WebGLRenderingContext} gl - The WebGL rendering context.
     * @param {GLenum} type - The type of buffer (ARRAY_BUFFER, ELEMENT_ARRAY_BUFFER, etc.).
     * @param {Float32Array|Uint16Array|Uint32Array} data - The data to be stored in the buffer.
     * @param {GLenum} usage - The usage pattern of the buffer (STATIC_DRAW, DYNAMIC_DRAW, etc.).
     */
    constructor(gl, type, data, usage) {
      this.gl = gl;
  
      this._type = type || this.gl.ARRAY_BUFFER;
  
      this.length = data.length;
  
      this.buffer = this.gl.createBuffer();
  
      this.gl.bindBuffer(this._type, this.buffer);
      this.gl.bufferData(this._type, data, usage || this.gl.STATIC_DRAW);
    }
  
    /**
     * @method bind
     * @public
     * Binds the buffer to the WebGL context.
     */
    bind() {
      this.gl.bindBuffer(this._type, this.buffer);
    }
  
    /**
     * @method updateData
     * @public
     * Updates the data stored in the buffer.
     * @param {Float32Array|Uint16Array|Uint32Array} newData - The new data to be stored in the buffer.
     * @param {GLenum} usage - The usage pattern of the buffer (STATIC_DRAW, DYNAMIC_DRAW, etc.).
     */
    updateData(newData, usage) {
      this.gl.bindBuffer(this._type, this.buffer);
      this.gl.bufferData(this._type, newData, usage || this.gl.STATIC_DRAW);
      this.length = newData.length;
    }
  
    /**
     * @method dispose
     * @public
     * Disposes of the buffer and releases resources.
     */
    dispose() {
      this.gl.deleteBuffer(this.buffer);
      this.buffer = null;
  
      this.length = null;
      this._type = null;
  
      this.gl = null;
    }
  }
  