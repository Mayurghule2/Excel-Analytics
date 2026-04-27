import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const COLORS = ['#FF6384', '#36A2EB', '#FFCE56', '#8BC34A', '#FF9800', '#9C27B0'];

const ThreeDChartView = ({ type = 'bar', xData = [], yData = [] }) => {
  const mountRef = useRef(null);
  const rendererRef = useRef(null); 
  const [canvasReady, setCanvasReady] = useState(false);

  useEffect(() => {
    const mount = mountRef.current;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#ffffff');

    const camera = new THREE.PerspectiveCamera(75, mount.clientWidth / mount.clientHeight, 0.1, 1000);
    camera.position.set(0, 10, 20);

    const renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);
    rendererRef.current = renderer;
    setCanvasReady(true);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(10, 10, 10);
    scene.add(light);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    if (type === '3d-pie') {
      const total = yData.reduce((acc, val) => acc + val, 0);
      let startAngle = 0;

      for (let i = 0; i < yData.length; i++) {
        const angle = (yData[i] / total) * Math.PI * 2;
        const shape = new THREE.Shape();
        shape.moveTo(0, 0);
        shape.absarc(0, 0, 5, startAngle, startAngle + angle, false);
        shape.lineTo(0, 0);

        const geometry = new THREE.ExtrudeGeometry(shape, { depth: 1, bevelEnabled: false });
        const material = new THREE.MeshStandardMaterial({ color: COLORS[i % COLORS.length] });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.rotation.x = -Math.PI / 2;
        scene.add(mesh);

        const midAngle = startAngle + angle / 2;
        const labelX = 6 * Math.cos(midAngle);
        const labelZ = 6 * Math.sin(midAngle);

        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        context.font = '24px Arial';
        context.fillStyle = 'black';
        context.fillText(xData[i], 10, 30);
        const texture = new THREE.CanvasTexture(canvas);
        const spriteMaterial = new THREE.SpriteMaterial({ map: texture });
        const sprite = new THREE.Sprite(spriteMaterial);
        sprite.position.set(labelX, 1.5, labelZ);
        sprite.scale.set(2, 1, 1);
        scene.add(sprite);

        startAngle += angle;
      }
    }

    else if (type === '3d-bar') {
      const maxVal = Math.max(...yData);
      const barWidth = 1;
      const gap = 0.5;

      yData.forEach((value, index) => {
        const height = (value / maxVal) * 10;
        const geometry = new THREE.BoxGeometry(barWidth, height, barWidth);
        const material = new THREE.MeshStandardMaterial({ color: COLORS[index % COLORS.length] });
        const bar = new THREE.Mesh(geometry, material);
        bar.position.set(index * (barWidth + gap), height / 2, 0);
        scene.add(bar);

        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        context.font = '28px Arial';
        context.fillStyle = 'black';
        context.fillText(xData[index], 10, 30);
        const texture = new THREE.CanvasTexture(canvas);
        const spriteMaterial = new THREE.SpriteMaterial({ map: texture });
        const sprite = new THREE.Sprite(spriteMaterial);
        sprite.position.set(index * (barWidth + gap), height + 1, 0);
        sprite.scale.set(2, 1, 1);
        scene.add(sprite);
      });
    }

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      mount.removeChild(renderer.domElement);
    };
  }, [type, xData, yData]);

  const downloadImage = () => {
    const renderer = rendererRef.current;
    if (renderer) {
      const link = document.createElement('a');
      link.download = '3d-chart.png';
      link.href = renderer.domElement.toDataURL('image/png');
      link.click();
    }
  };

  const downloadPDF = async () => {
    if (!mountRef.current) return;
    const canvasEl = mountRef.current.querySelector('canvas');
    if (!canvasEl) return;

    const canvasImage = await html2canvas(mountRef.current, {
      useCORS: true,
      allowTaint: true,
      backgroundColor: null,
    });

    const imgData = canvasImage.toDataURL('image/png');
    const pdf = new jsPDF({ orientation: 'landscape' });
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvasImage.height * pdfWidth) / canvasImage.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('3d-chart.pdf');
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <div
        ref={mountRef}
        style={{
          width: '100%',
          height: '500px',
          borderRadius: '12px',
          overflow: 'hidden',
        }}
      />
      {canvasReady && (
        <div style={{ position: 'absolute', top: 10, right: 10, display: 'flex', gap: '10px' }}>
          <button onClick={downloadImage} className='px-3 py-2 bg-green-700 text-white rounded-md hover:opacity-80'>Download Image</button>
          <button onClick={downloadPDF} className='px-3 py-2 bg-pink-700 text-white rounded-md hover:opacity-85'>Download PDF</button>
        </div>
      )}
    </div>
  );
};

export default ThreeDChartView;
