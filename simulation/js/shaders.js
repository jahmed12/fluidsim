class Shader {
    constructor(res, name, uniforms) {
        var geometry = new THREE.PlaneBufferGeometry( 2 * (512 - 2) / 512, 2 * (256 - 2) / 256 );
        this.res = res;
        this.uniforms = uniforms;
        var material = new THREE.ShaderMaterial({
            uniforms: this.uniforms,
            fragmentShader: document.getElementById(name).innerHTML,
            depthWrite: false,
            depthTest: false,
            blending: THREE.NoBlending
        });
        this.quad = new THREE.Mesh(geometry, material);
        this.camera = new THREE.OrthographicCamera( -1, 1, 1, -1, 0, 1 );

        this.scene = new THREE.Scene();
        this.scene.add(this.quad);
    }
}

class Diffuse extends Shader {
    constructor(res) {
        var uniforms =  {
			bufferTexture: { type: "t"},
			res : {type: 'v2'},//Keeps the resolution
			smokeSource: {type:"v3"},
			time: {type:"f"},
			red:{type:"f"},
			blue:{type:"f"},
			green:{type:"f"},
			north:{type:"f"},
			south:{type:"f"},
			east: {type:"f"},
			west: {type:"f"},
			thicc: {type:"f"}

		}
        super(res, "diffuse", uniforms);
    }

}

class Advect extends Shader {
    constructor(res) {
        var uniforms = {
            res : {type: 'v2' },
            dissipation: {type:"f" },
            velocityField: { type: "t" },
            advectionField: { type: "t" }
        };
        super(res, "advect", uniforms);
    }

    // target is the target texture that will be displayed to
    apply(dissipation, velocityField, advectionField, target) {
        this.uniforms.res = this.res;
        this.uniforms.dissipation = dissipation;
        this.uniforms.velocityField = velocityField;
        this.uniforms.advectionField = advectionField;
        renderer.render(this.scene, this.camera, target, false);
    }
}