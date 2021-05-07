class Field {
    constructor() {
        this.textureA = new THREE.WebGLRenderTarget( res.x, res.y, { minFilter: THREE.LinearFilter, magFilter: THREE.NearestFilter, format: THREE.RGBAFormat, type: THREE.FloatType });
        this.textureB = new THREE.WebGLRenderTarget( res.x, res.y, { minFilter: THREE.LinearFilter, magFilter: THREE.NearestFilter, format: THREE.RGBAFormat, type: THREE.FloatType });
    }

    // swaps because the mainTex is for read access and helper is for write access. after helper is written to, we call swap so that the updated field is the one being read from
    swap() {
        var temp = this.textureA;
        this.textureA = this.textureB;
        this.textureB = temp;
    }
}