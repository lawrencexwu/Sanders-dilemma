import * as THREE from "three";

// A single, subtle node-network that smoothly reconfigures its layout for
// each slide. No external assets, no heavy models. Animation pauses when the
// tab is hidden and is largely disabled under prefers-reduced-motion.

const NODE_COUNT = 64;
const COLOR_BG = 0x070a0f;
const COLOR_NODE = 0x9bb4d4;
const COLOR_ACCENT = 0xd8b574;
const COLOR_LINE = 0x2a3850;

function reducedMotion() {
  return (
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

// Layout generators return NODE_COUNT target positions (Vector3-like arrays).
function layoutHero(i, n) {
  if (i === 0) return [0, 0, 0];
  const branch = i % 6;
  const depth = 1 + Math.floor(i / 6);
  const ang = (branch / 6) * Math.PI * 2 + depth * 0.18;
  const r = depth * 2.4;
  return [Math.cos(ang) * r, Math.sin(ang) * r * 0.62, -depth * 0.7];
}

function layoutSplit(i, n) {
  // Left: a narrow binary corridor. Right: an expanded fan.
  if (i % 2 === 0) {
    const t = i / n;
    return [-4.2, (t - 0.5) * 6, -1 + (i % 4) * 0.2];
  }
  const ang = (i / n) * Math.PI - Math.PI / 2;
  const r = 3.4 + (i % 5) * 0.35;
  return [3.4 + Math.cos(ang) * r * 0.5, Math.sin(ang) * r, -1.5];
}

function layoutPyramid(i, n) {
  const tiers = 6;
  const tier = Math.min(tiers - 1, Math.floor((i / n) * tiers));
  const perTier = Math.ceil(n / tiers);
  const idx = i % perTier;
  const width = (tiers - tier) * 0.95;
  return [
    (idx / perTier - 0.5) * width,
    (tier - tiers / 2) * 1.05 + 0.5,
    -1.2,
  ];
}

function layoutMap(i, n) {
  const cols = 7;
  const row = Math.floor(i / cols);
  const col = i % cols;
  return [
    (col - cols / 2) * 1.7 + (row % 2) * 0.6,
    (row - n / cols / 2) * 1.7,
    -1.4 - (i % 3) * 0.3,
  ];
}

function layoutGrid(i, n) {
  const cols = 8;
  return [
    ((i % cols) - cols / 2) * 1.5,
    (Math.floor(i / cols) - n / cols / 2) * 1.5,
    -1.6,
  ];
}

function layoutScales(i, n) {
  const pair = Math.floor(i / (n / 4)) % 4;
  const side = i % 2 === 0 ? -1 : 1;
  const local = (i % (n / 8)) / (n / 8);
  return [
    side * (2.6 + local * 1.4),
    (pair - 1.5) * 2.2 + Math.sin(local * 6.28) * 0.3,
    -1.4,
  ];
}

function layoutPath(i, n) {
  const t = i / (n - 1);
  return [
    (t - 0.5) * 11,
    Math.sin(t * Math.PI) * 1.6 - 0.4,
    -1.2 + Math.cos(t * Math.PI * 2) * 0.3,
  ];
}

function layoutDecisionTree(i, n) {
  if (i === 0) return [-4.6, 0, -1];
  const depth = 1 + Math.floor(Math.log2(i + 1));
  const span = i / n;
  return [-4.6 + depth * 1.7, (span - 0.5) * 8, -1 - depth * 0.2];
}

function layoutConverge(i, n) {
  const t = i / (n - 1);
  const spread = (1 - t) * 5;
  const lane = (i % 6) - 2.5;
  return [(t - 0.5) * 10, lane * spread * 0.4, -1.3];
}

const LAYOUTS = [
  layoutHero,
  layoutSplit,
  layoutPyramid,
  layoutMap,
  layoutGrid,
  layoutScales,
  layoutPath,
  layoutGrid,
  layoutDecisionTree,
  layoutConverge,
];

export function createScene(canvas) {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: false,
    powerPreference: "low-power",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(COLOR_BG);
  scene.fog = new THREE.FogExp2(COLOR_BG, 0.045);

  const camera = new THREE.PerspectiveCamera(58, 1, 0.1, 100);
  camera.position.set(0, 0, 13);

  const group = new THREE.Group();
  scene.add(group);

  // Nodes
  const nodeGeo = new THREE.SphereGeometry(0.07, 12, 12);
  const nodeMat = new THREE.MeshBasicMaterial({ color: COLOR_NODE });
  const accentMat = new THREE.MeshBasicMaterial({ color: COLOR_ACCENT });
  const mesh = new THREE.InstancedMesh(nodeGeo, nodeMat, NODE_COUNT);
  mesh.frustumCulled = false;
  group.add(mesh);

  const accentMesh = new THREE.InstancedMesh(nodeGeo, accentMat, NODE_COUNT);
  accentMesh.frustumCulled = false;
  accentMesh.count = 0;
  group.add(accentMesh);

  const current = [];
  const target = [];
  for (let i = 0; i < NODE_COUNT; i++) {
    const p = layoutHero(i, NODE_COUNT);
    current.push(new THREE.Vector3(p[0], p[1], p[2]));
    target.push(new THREE.Vector3(p[0], p[1], p[2]));
  }

  // Connecting lines (nearest-neighbour-ish, rebuilt each frame cheaply)
  const maxLines = NODE_COUNT * 3;
  const linePositions = new Float32Array(maxLines * 2 * 3);
  const lineGeo = new THREE.BufferGeometry();
  lineGeo.setAttribute(
    "position",
    new THREE.BufferAttribute(linePositions, 3)
  );
  const lineMat = new THREE.LineBasicMaterial({
    color: COLOR_LINE,
    transparent: true,
    opacity: 0.5,
  });
  const lines = new THREE.LineSegments(lineGeo, lineMat);
  lines.frustumCulled = false;
  group.add(lines);

  const dummy = new THREE.Object3D();
  let slideIndex = 0;
  let running = true;
  let raf = 0;
  const clock = new THREE.Clock();
  const rm = reducedMotion();

  function setLayout(idx) {
    slideIndex = idx;
    const fn = LAYOUTS[idx % LAYOUTS.length] || layoutGrid;
    for (let i = 0; i < NODE_COUNT; i++) {
      const p = fn(i, NODE_COUNT);
      target[i].set(p[0], p[1], p[2]);
    }
    // Accent the first ~6 nodes only on hero/path/tree slides.
    accentMesh.count = idx === 0 || idx === 6 || idx === 9 ? 6 : 0;
    if (rm) {
      for (let i = 0; i < NODE_COUNT; i++) current[i].copy(target[i]);
    }
  }
  setLayout(0);

  function resize() {
    const w = canvas.clientWidth || window.innerWidth;
    const h = canvas.clientHeight || window.innerHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  resize();
  window.addEventListener("resize", resize);

  function updateLines() {
    let ptr = 0;
    for (let i = 0; i < NODE_COUNT && ptr < maxLines; i++) {
      // connect to the next node and one a few steps ahead — cheap + organic
      const a = current[i];
      const b = current[(i + 1) % NODE_COUNT];
      if (a.distanceToSquared(b) < 9) {
        linePositions[ptr * 6 + 0] = a.x;
        linePositions[ptr * 6 + 1] = a.y;
        linePositions[ptr * 6 + 2] = a.z;
        linePositions[ptr * 6 + 3] = b.x;
        linePositions[ptr * 6 + 4] = b.y;
        linePositions[ptr * 6 + 5] = b.z;
        ptr++;
      }
    }
    lineGeo.setDrawRange(0, ptr * 2);
    lineGeo.attributes.position.needsUpdate = true;
  }

  function frame() {
    raf = requestAnimationFrame(frame);
    if (!running) return;
    const dt = Math.min(clock.getDelta(), 0.05);
    const ease = rm ? 1 : 1 - Math.pow(0.0025, dt);

    for (let i = 0; i < NODE_COUNT; i++) {
      current[i].lerp(target[i], ease);
      dummy.position.copy(current[i]);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
      if (i < accentMesh.count) accentMesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
    if (accentMesh.count) accentMesh.instanceMatrix.needsUpdate = true;

    updateLines();

    if (!rm) {
      const t = clock.elapsedTime;
      group.rotation.y = Math.sin(t * 0.06) * 0.12;
      group.rotation.x = Math.cos(t * 0.05) * 0.05;
      group.position.y = Math.sin(t * 0.12) * 0.18;
    }
    renderer.render(scene, camera);
  }
  frame();

  function onVisibility() {
    running = !document.hidden;
    if (running) clock.getDelta();
  }
  document.addEventListener("visibilitychange", onVisibility);

  return {
    goTo(idx) {
      setLayout(idx);
    },
    setPaused(p) {
      running = !p;
      if (running) clock.getDelta();
    },
    dispose() {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
      nodeGeo.dispose();
      nodeMat.dispose();
      accentMat.dispose();
      lineGeo.dispose();
      lineMat.dispose();
      renderer.dispose();
    },
  };
}
