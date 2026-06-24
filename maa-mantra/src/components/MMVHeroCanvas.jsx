import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import './MMVHeroCanvas.css';

export default function MMVHeroCanvas() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const W = mount.clientWidth;
    const H = mount.clientHeight;

    // ── Renderer ──
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // ── Scene + Camera ──
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 100);
    camera.position.set(0, 0, 5);

    // ── Gold palette ──
    const GOLD = new THREE.Color(0xd4a843);
    const GOLD_BRIGHT = new THREE.Color(0xf0c869);
    const GOLD_DIM = new THREE.Color(0xa07820);

    // ── 1. Flowing wave mesh ──
    const waveGeo = new THREE.PlaneGeometry(14, 8, 120, 60);
    const waveMat = new THREE.ShaderMaterial({
      transparent: true,
      side: THREE.DoubleSide,
      uniforms: {
        uTime: { value: 0 },
        uColor1: { value: GOLD_DIM },
        uColor2: { value: GOLD_BRIGHT },
      },
      vertexShader: `
        uniform float uTime;
        varying vec2 vUv;
        varying float vElevation;

        void main() {
          vUv = uv;
          vec3 pos = position;

          float wave1 = sin(pos.x * 0.8 + uTime * 0.6) * 0.35;
          float wave2 = sin(pos.x * 1.4 - uTime * 0.4 + pos.y * 0.5) * 0.22;
          float wave3 = cos(pos.y * 0.9 + uTime * 0.3) * 0.18;
          float wave4 = sin(pos.x * 2.2 + pos.y * 1.1 + uTime * 0.8) * 0.1;

          pos.z += wave1 + wave2 + wave3 + wave4;
          vElevation = pos.z;

          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        varying vec2 vUv;
        varying float vElevation;

        void main() {
          float t = clamp((vElevation + 0.6) / 1.2, 0.0, 1.0);
          vec3 color = mix(uColor1, uColor2, t);

          // Edge fade
          float edgeX = smoothstep(0.0, 0.15, vUv.x) * smoothstep(1.0, 0.85, vUv.x);
          float edgeY = smoothstep(0.0, 0.12, vUv.y) * smoothstep(1.0, 0.88, vUv.y);
          float alpha = edgeX * edgeY * 0.18 * (t * 0.7 + 0.3);

          gl_FragColor = vec4(color, alpha);
        }
      `,
    });
    const waveMesh = new THREE.Mesh(waveGeo, waveMat);
    waveMesh.position.z = -1;
    scene.add(waveMesh);

    // Second wave layer offset
    const wave2Geo = new THREE.PlaneGeometry(14, 8, 100, 50);
    const wave2Mat = waveMat.clone();
    wave2Mat.uniforms = {
      uTime: { value: 0 },
      uColor1: { value: GOLD },
      uColor2: { value: GOLD_BRIGHT },
    };
    wave2Mat.fragmentShader = `
      uniform vec3 uColor1;
      uniform vec3 uColor2;
      varying vec2 vUv;
      varying float vElevation;

      void main() {
        float t = clamp((vElevation + 0.5) / 1.0, 0.0, 1.0);
        vec3 color = mix(uColor1, uColor2, t);
        float edgeX = smoothstep(0.0, 0.2, vUv.x) * smoothstep(1.0, 0.8, vUv.x);
        float edgeY = smoothstep(0.0, 0.15, vUv.y) * smoothstep(1.0, 0.85, vUv.y);
        float alpha = edgeX * edgeY * 0.13 * (t * 0.6 + 0.2);
        gl_FragColor = vec4(color, alpha);
      }
    `;
    const wave2Mesh = new THREE.Mesh(wave2Geo, wave2Mat);
    wave2Mesh.position.z = -0.5;
    wave2Mesh.rotation.z = 0.15;
    scene.add(wave2Mesh);

    // ── 2. Gold particles ──
    const PARTICLE_COUNT = 280;
    const pPositions = new Float32Array(PARTICLE_COUNT * 3);
    const pSizes = new Float32Array(PARTICLE_COUNT);
    const pPhases = new Float32Array(PARTICLE_COUNT);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      pPositions[i * 3]     = (Math.random() - 0.5) * 12;
      pPositions[i * 3 + 1] = (Math.random() - 0.5) * 7;
      pPositions[i * 3 + 2] = (Math.random() - 0.5) * 3;
      pSizes[i] = Math.random() * 4 + 1.5;
      pPhases[i] = Math.random() * Math.PI * 2;
    }

    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPositions, 3));
    pGeo.setAttribute('aSize', new THREE.BufferAttribute(pSizes, 1));
    pGeo.setAttribute('aPhase', new THREE.BufferAttribute(pPhases, 1));

    const pMat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      uniforms: { uTime: { value: 0 }, uColor: { value: GOLD_BRIGHT } },
      vertexShader: `
        attribute float aSize;
        attribute float aPhase;
        uniform float uTime;
        varying float vAlpha;

        void main() {
          vec3 pos = position;
          pos.y += sin(uTime * 0.4 + aPhase) * 0.3;
          pos.x += cos(uTime * 0.3 + aPhase * 1.3) * 0.2;

          vAlpha = (sin(uTime * 0.8 + aPhase) * 0.5 + 0.5) * 0.85 + 0.15;

          vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = aSize * (300.0 / -mvPos.z);
          gl_Position = projectionMatrix * mvPos;
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        varying float vAlpha;

        void main() {
          float d = distance(gl_PointCoord, vec2(0.5));
          if (d > 0.5) discard;
          float strength = 1.0 - (d * 2.0);
          strength = pow(strength, 2.5);
          gl_FragColor = vec4(uColor, strength * vAlpha * 0.9);
        }
      `,
    });

    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    // ── 3. Spotlight sweep ──
    const spotGeo = new THREE.PlaneGeometry(6, 6);
    const spotMat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      uniforms: { uTime: { value: 0 }, uColor: { value: GOLD } },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform vec3 uColor;
        varying vec2 vUv;

        void main() {
          // Sweep angle
          float sweep = sin(uTime * 0.5) * 0.35 + 0.5;
          vec2 origin = vec2(sweep, 1.1);
          vec2 dir = vUv - origin;
          float angle = atan(dir.x, -dir.y);
          float beamWidth = 0.18;
          float beam = smoothstep(beamWidth, 0.0, abs(angle));
          float dist = length(dir);
          float fade = smoothstep(1.4, 0.0, dist);
          float alpha = beam * fade * 0.22;
          gl_FragColor = vec4(uColor, alpha);
        }
      `,
    });
    const spotlight = new THREE.Mesh(spotGeo, spotMat);
    spotlight.position.z = 0.5;
    scene.add(spotlight);

    // ── 4. Center glow ──
    const glowGeo = new THREE.PlaneGeometry(5, 3.5);
    const glowMat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      uniforms: { uTime: { value: 0 }, uColor: { value: GOLD } },
      vertexShader: `
        varying vec2 vUv;
        void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform vec3 uColor;
        varying vec2 vUv;
        void main() {
          vec2 center = vec2(0.5, 0.5);
          float d = distance(vUv, center);
          float pulse = sin(uTime * 1.2) * 0.08 + 0.92;
          float glow = smoothstep(0.5, 0.0, d) * pulse * 0.25;
          gl_FragColor = vec4(uColor, glow);
        }
      `,
    });
    const glowMesh = new THREE.Mesh(glowGeo, glowMat);
    glowMesh.position.z = 1;
    scene.add(glowMesh);

    // ── Mouse parallax ──
    const mouse = { x: 0, y: 0 };
    const onMouseMove = (e) => {
      const rect = mount.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouse.y = -((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    mount.addEventListener('mousemove', onMouseMove);

    // ── Animation loop ──
    let animId;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      waveMat.uniforms.uTime.value = t;
      wave2Mat.uniforms.uTime.value = t + 1.5;
      pMat.uniforms.uTime.value = t;
      spotMat.uniforms.uTime.value = t;
      glowMat.uniforms.uTime.value = t;

      // Subtle camera parallax
      camera.position.x += (mouse.x * 0.3 - camera.position.x) * 0.04;
      camera.position.y += (mouse.y * 0.2 - camera.position.y) * 0.04;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };
    animate();

    // ── Resize ──
    const onResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', onResize);

    // ── Cleanup ──
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
      mount.removeEventListener('mousemove', onMouseMove);
      mount.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return (
    <div className="mmv-canvas-wrap" ref={mountRef}>
      <div className="mmv-canvas-overlay">
        <div className="mmv-canvas-dots" />
        <div className="mmv-canvas-text">
          <span className="mmv-canvas-initials">MMV</span>
          <span className="mmv-canvas-name">MAA MANTRA VENTURES</span>
        </div>
        <div className="mmv-canvas-stage" />
      </div>
    </div>
  );
}
