import { useEffect, useRef } from 'react';

const drawMobileFlow = (ctx, width, height, { title, steps, accent = '#38bdf8' }) => {
  const inset = 16;
  const cardWidth = width - inset * 2;
  const top = 30;
  const gap = 12;
  const cardHeight = Math.min(42, Math.max(34, (height - top - 24 - gap * (steps.length - 1)) / steps.length));

  ctx.clearRect(0, 0, width, height);
  ctx.font = '700 9px "Space Mono", monospace';
  ctx.fillStyle = accent;
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillText(title, inset, 14);

  steps.forEach(([label, detail], index) => {
    const y = top + index * (cardHeight + gap);
    ctx.fillStyle = 'rgba(12, 15, 22, 0.96)';
    ctx.strokeStyle = index === steps.length - 1 ? `${accent}99` : 'rgba(255,255,255,0.18)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(inset, y, cardWidth, cardHeight, 7);
    ctx.fill();
    ctx.stroke();

    ctx.textAlign = 'left';
    ctx.font = '700 10px "Space Mono", monospace';
    ctx.fillStyle = '#f4f7fb';
    ctx.fillText(label, inset + 10, y + cardHeight * 0.38, cardWidth - 20);
    ctx.font = '8px "Space Mono", monospace';
    ctx.fillStyle = '#aab5c3';
    ctx.fillText(detail, inset + 10, y + cardHeight * 0.72, cardWidth - 20);

    if (index < steps.length - 1) {
      const x = width / 2;
      const startY = y + cardHeight;
      const endY = startY + gap - 2;
      ctx.strokeStyle = `${accent}bb`;
      ctx.fillStyle = `${accent}bb`;
      ctx.beginPath();
      ctx.moveTo(x, startY + 1);
      ctx.lineTo(x, endY - 3);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(x - 3, endY - 5);
      ctx.lineTo(x, endY - 1);
      ctx.lineTo(x + 3, endY - 5);
      ctx.stroke();
    }
  });
};

// ============================================================================
// STAGE 01: 2026 Coding Foundations & Web Basics
// Clean DOM Tree Hierarchy, CSS Cascade Rule Inspector & Event Dispatcher
// ============================================================================
export function WebArchitectureCanvas({ isActive = true }) {
  const canvasRef = useRef(null);
  const isActiveRef = useRef(isActive);

  useEffect(() => {
    isActiveRef.current = isActive;
  }, [isActive]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    const parent = canvas.parentElement;
    let width = parent?.clientWidth || 380;
    let height = parent?.clientHeight || 280;

    const resize = () => {
      if (!canvas || !parent) return;
      width = parent.clientWidth || 380;
      height = parent.clientHeight || 280;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(parent);

    // DOM Tree Nodes
    const domNodes = [
      { id: 'html', label: '<HTML>', x: 0.5, y: 0.20, children: ['body'] },
      { id: 'body', label: '<BODY>', x: 0.5, y: 0.44, children: ['nav', 'main', 'btn'] },
      { id: 'nav', label: '<NAV>', x: 0.22, y: 0.70, children: [] },
      { id: 'main', label: '<MAIN.APP>', x: 0.5, y: 0.70, children: [] },
      { id: 'btn', label: '<BUTTON#action>', x: 0.78, y: 0.70, children: [] }
    ];

    const cssRules = [
      'display: flex; gap: 1.5rem;',
      'border-radius: 999px; backdrop-filter: blur(16px);',
      'color: #ffffff; letter-spacing: 0.04em;',
      'transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);',
      'grid-template-columns: repeat(3, 1fr);'
    ];

    let frame = 0;

    const render = () => {
      animId = requestAnimationFrame(render);

      frame++;
      ctx.clearRect(0, 0, width, height);

      if (width <= 480) {
        drawMobileFlow(ctx, width, height, {
          title: '01 / WEB FOUNDATIONS',
          steps: [
            ['Browser', 'renders the page'],
            ['HTML', 'defines the structure'],
            ['CSS', 'styles the layout'],
            ['JavaScript', 'adds interaction']
          ]
        });
        return;
      }

      // 1. Draw Clean Static DOM Tree Connectors
      ctx.lineWidth = 1;
      domNodes.forEach((node) => {
        const nx = node.x * width;
        const ny = node.y * height;

        node.children.forEach((cid) => {
          const child = domNodes.find((n) => n.id === cid);
          if (child) {
            const cx = child.x * width;
            const cy = child.y * height;

            ctx.beginPath();
            ctx.moveTo(nx, ny + 13);
            ctx.lineTo(cx, cy - 13);
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.18)';
            ctx.stroke();
          }
        });
      });

      // 2. Draw Clean DOM Nodes (No moving particles, no flashing)
      domNodes.forEach((node, idx) => {
        const nx = node.x * width;
        const ny = node.y * height;
        const isRoot = idx === 0;

        const boxW = Math.min(96, width * 0.24);
        const boxH = 26;

        ctx.fillStyle = isRoot ? 'rgba(28, 30, 42, 0.95)' : 'rgba(14, 14, 20, 0.9)';
        ctx.strokeStyle = isRoot ? 'rgba(56, 189, 248, 0.5)' : 'rgba(255, 255, 255, 0.18)';
        ctx.lineWidth = 1;

        ctx.beginPath();
        ctx.roundRect(nx - boxW / 2, ny - boxH / 2, boxW, boxH, 6);
        ctx.fill();
        ctx.stroke();

        ctx.font = '9px "Space Mono", monospace';
        ctx.fillStyle = isRoot ? '#38bdf8' : '#e2e8f0';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(node.label, nx, ny);
      });

      // 3. Clean Status Telemetry Footer
      const footerY = height - 18;
      ctx.font = '8.5px "Space Mono", monospace';
      ctx.textAlign = 'left';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
      const activeRule = cssRules[Math.floor(frame / 120) % cssRules.length];
      ctx.fillText(`CSS CASCADE: ${activeRule}`, 16, footerY);

      ctx.textAlign = 'right';
      ctx.fillStyle = '#38bdf8';
      ctx.fillText('DOM_READY • FULL_HIERARCHY', width - 16, footerY);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className="quantum-visualizer-canvas" />;
}

// ============================================================================
// STAGE 02: Code Quiz learning flow
// Multiple-choice practice flow through the Code Quiz demo
// ============================================================================
export function CodeQuizFlowCanvas({ isActive = true }) {
  const canvasRef = useRef(null);
  const isActiveRef = useRef(isActive);

  useEffect(() => {
    isActiveRef.current = isActive;
  }, [isActive]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    const parent = canvas.parentElement;
    let width = parent?.clientWidth || 380;
    let height = parent?.clientHeight || 280;

    const resize = () => {
      if (!canvas || !parent) return;
      width = parent.clientWidth || 380;
      height = parent.clientHeight || 280;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(parent);

    const chatLogs = [
      { user: 'STUDENT', text: 'opens a programming question', ping: '01', type: 'in' },
      { user: 'QUIZ UI', text: 'shows multiple-choice answers', ping: '02', type: 'system' },
      { user: 'ANSWER', text: 'student selects an option', ping: '03', type: 'out' },
      { user: 'APP DATA', text: 'records quiz-related data', ping: '04', type: 'db' }
    ];

    const render = () => {
      animId = requestAnimationFrame(render);

      ctx.clearRect(0, 0, width, height);

      if (width <= 480) {
        drawMobileFlow(ctx, width, height, {
          title: '02 / CODE QUIZ FLOW',
          accent: '#10b981',
          steps: [
            ['Student', 'opens a question'],
            ['Quiz UI', 'shows answer choices'],
            ['Selection', 'student picks an option'],
            ['App data', 'handles quiz records']
          ]
        });
        return;
      }

      // 1. Clean Channel Header Bar
      const headerY = 16;
      ctx.fillStyle = 'rgba(16, 16, 22, 0.85)';
      ctx.fillRect(16, headerY, width - 32, 28);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
      ctx.strokeRect(16, headerY, width - 32, 28);

      ctx.font = '9px "Space Mono", monospace';
      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'left';
      ctx.fillText('MODULE: PROGRAMMING QUIZ', 28, headerY + 18);

      ctx.fillStyle = '#10b981';
      ctx.textAlign = 'right';
      ctx.fillText('FORMAT: MULTIPLE CHOICE', width - 28, headerY + 18);

      // 2. Clean Message Cards (No loading or jumpy highlights)
      const baseY = 56;
      const lineHeight = Math.min(38, (height - 95) / 4);

      chatLogs.forEach((item, idx) => {
        const y = baseY + idx * lineHeight;

        ctx.fillStyle = idx === 1 ? 'rgba(24, 26, 36, 0.85)' : 'rgba(12, 12, 16, 0.7)';
        ctx.strokeStyle = idx === 1 ? 'rgba(56, 189, 248, 0.35)' : 'rgba(255, 255, 255, 0.08)';
        ctx.lineWidth = 1;

        ctx.beginPath();
        ctx.roundRect(16, y, width - 32, lineHeight - 6, 6);
        ctx.fill();
        ctx.stroke();

        // User / System tag
        ctx.font = '8.5px "Space Mono", monospace';
        ctx.fillStyle = item.type === 'db' ? '#f59e0b' : item.type === 'system' ? '#38bdf8' : '#ffffff';
        ctx.textAlign = 'left';
        ctx.fillText(`[${item.user}]`, 26, y + (lineHeight - 6) / 2 + 3);

        // Text Payload
        ctx.fillStyle = '#cccccc';
        const tagWidth = 85;
        ctx.fillText(item.text, 26 + tagWidth, y + (lineHeight - 6) / 2 + 3);

        // Ping badge
        ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
        ctx.textAlign = 'right';
        ctx.fillText(item.ping, width - 26, y + (lineHeight - 6) / 2 + 3);
      });

      // 3. Clean Event Bus Static Rule Line (No moving dot)
      const pipeY = height - 20;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
      ctx.beginPath();
      ctx.moveTo(16, pipeY);
      ctx.lineTo(width - 16, pipeY);
      ctx.stroke();

      ctx.font = '8px "Space Mono", monospace';
      ctx.fillStyle = '#888888';
      ctx.textAlign = 'left';
      ctx.fillText('QUESTION → ANSWER → FEEDBACK', 16, pipeY + 14);

      ctx.textAlign = 'right';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.fillText('CODE QUIZ • DEMO FLOW', width - 16, pipeY + 14);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className="quantum-visualizer-canvas" />;
}

// ============================================================================
// STAGE 03: Car Price Prediction notebook workflow
// Notebook-based used-car price prediction study
// ============================================================================
export function CarPricePredictionCanvas({ isActive = true }) {
  const canvasRef = useRef(null);
  const isActiveRef = useRef(isActive);

  useEffect(() => {
    isActiveRef.current = isActive;
  }, [isActive]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    const parent = canvas.parentElement;
    let width = parent?.clientWidth || 380;
    let height = parent?.clientHeight || 280;

    const resize = () => {
      if (!canvas || !parent) return;
      width = parent.clientWidth || 380;
      height = parent.clientHeight || 280;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(parent);

    const notebookNotes = [
      'Notebook task: explore the dataset used for car-price prediction.',
      'Python cells provide a space to inspect data and practise analysis.',
      'The repository shares the notebook through Google Colab.',
      'The learning goal is to study the used-car price prediction problem.'
    ];

    let frame = 0;

    const render = () => {
      animId = requestAnimationFrame(render);

      frame++;
      ctx.clearRect(0, 0, width, height);

      if (width <= 480) {
        drawMobileFlow(ctx, width, height, {
          title: '03 / CAR PRICE PREDICTION',
          accent: '#818cf8',
          steps: [
            ['Notebook', 'opens the project'],
            ['Dataset', 'provides car-price data'],
            ['Python', 'explores the task'],
            ['Study', 'reviews the notebook output']
          ]
        });
        return;
      }

      // 1. Model Header Bar
      const headerY = 16;
      ctx.fillStyle = 'rgba(16, 16, 24, 0.85)';
      ctx.fillRect(16, headerY, width - 32, 28);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
      ctx.strokeRect(16, headerY, width - 32, 28);

      ctx.font = '9px "Space Mono", monospace';
      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'left';
      ctx.fillText('NOTEBOOK: CAR PRICE PREDICTION', 28, headerY + 18);

      ctx.fillStyle = '#818cf8';
      ctx.fillText('[GOOGLE COLAB]', Math.min(260, width * 0.60), headerY + 18);

      ctx.fillStyle = '#10b981';
      ctx.textAlign = 'right';
      ctx.fillText('PYTHON NOTEBOOK', width - 28, headerY + 18);

      // 2. Streaming Output Window
      const streamWindowY = 54;
      const streamWindowH = height - 98;
      ctx.fillStyle = 'rgba(10, 10, 14, 0.9)';
      ctx.fillRect(16, streamWindowY, width - 32, streamWindowH);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.14)';
      ctx.strokeRect(16, streamWindowY, width - 32, streamWindowH);

      // Stream Buffer Sub-Header
      ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.fillRect(16, streamWindowY, width - 32, 22);
      ctx.font = '8px "Space Mono", monospace';
      ctx.fillStyle = '#777777';
      ctx.textAlign = 'left';
      ctx.fillText('NOTEBOOK CELL • PROJECT EXPLORATION', 26, streamWindowY + 15);

      const activeNoteIdx = Math.floor(frame / 240) % notebookNotes.length;
      const fullText = notebookNotes[activeNoteIdx];
      const charProgress = Math.min(fullText.length, Math.floor((frame % 240) / 2));
      const visibleText = fullText.slice(0, charProgress);

      // Render Streaming Text with subtle terminal cursor
      ctx.font = '11px "Space Mono", monospace';
      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'left';

      const words = visibleText.split(' ');
      let line = '';
      let lineY = streamWindowY + 44;
      for (let i = 0; i < words.length; i++) {
        const testLine = line + words[i] + ' ';
        const metrics = ctx.measureText(testLine);
        if (metrics.width > width - 70 && i > 0) {
          ctx.fillText(line, 28, lineY);
          line = words[i] + ' ';
          lineY += 20;
        } else {
          line = testLine;
        }
      }
      ctx.fillText(line, 28, lineY);

      if (Math.floor(frame / 18) % 2 === 0 && charProgress < fullText.length) {
        const lastLineWidth = ctx.measureText(line).width;
        ctx.fillStyle = '#38bdf8';
        ctx.fillRect(28 + lastLineWidth + 2, lineY - 9, 6, 12);
      }

      // 3. Clean Stream Telemetry Footer (No looping loading bar)
      const footerY = height - 18;
      ctx.font = '8.5px "Space Mono", monospace';
      ctx.fillStyle = '#888888';
      ctx.textAlign = 'left';
      ctx.fillText('FORMAT: JUPYTER NOTEBOOK', 16, footerY);

      // Clean static indicator instead of looping loading bar
      const barW = Math.max(60, width - 320);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.fillRect(170, footerY - 8, barW, 4);
      ctx.fillStyle = '#38bdf8';
      ctx.fillRect(170, footerY - 8, barW, 4);

      ctx.fillStyle = '#10b981';
      ctx.textAlign = 'right';
      ctx.fillText('STATUS: LEARNING PROJECT', width - 16, footerY);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className="quantum-visualizer-canvas" />;
}

// ============================================================================
// STAGE 04: Smart Expense Tracker project workflow
// Local expense, group, and settlement records
// ============================================================================
export function SmartExpenseTrackerCanvas({ isActive = true }) {
  const canvasRef = useRef(null);
  const isActiveRef = useRef(isActive);

  useEffect(() => {
    isActiveRef.current = isActive;
  }, [isActive]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    const parent = canvas.parentElement;
    let width = parent?.clientWidth || 380;
    let height = parent?.clientHeight || 280;

    const resize = () => {
      if (!canvas || !parent) return;
      width = parent.clientWidth || 380;
      height = parent.clientHeight || 280;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(parent);

    const scanCategories = [
      { name: 'EXPENSE RECORDS (expenses.json)', fill: 78 },
      { name: 'GROUP RECORDS (groups.json)', fill: 66 },
      { name: 'SETTLEMENT DATA (settlements.json)', fill: 84 },
      { name: 'TERMINAL WORKFLOW (Python)', fill: 92 }
    ];

    const render = () => {
      animId = requestAnimationFrame(render);

      ctx.clearRect(0, 0, width, height);

      if (width <= 480) {
        drawMobileFlow(ctx, width, height, {
          title: '04 / SMART EXPENSE TRACKER',
          accent: '#10b981',
          steps: [
            ['Expense input', 'starts a local record'],
            ['Expense file', 'stores expense data'],
            ['Group file', 'keeps shared records'],
            ['Settlement file', 'stores split summaries']
          ]
        });
        return;
      }

      // 1. Top Architecture Gateway Bar
      const headerY = 16;
      ctx.fillStyle = 'rgba(16, 16, 24, 0.85)';
      ctx.fillRect(16, headerY, width - 32, 28);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
      ctx.strokeRect(16, headerY, width - 32, 28);

      ctx.font = '9px "Space Mono", monospace';
      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'left';
      ctx.fillText('MODE: PYTHON TERMINAL', 28, headerY + 18);

      ctx.fillStyle = '#10b981';
      ctx.fillText('STORAGE: LOCAL JSON', Math.min(190, width * 0.45), headerY + 18);

      ctx.textAlign = 'right';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.fillText('STUDENT EXPENSES', width - 28, headerY + 18);

      // 2. Clean Project Data Pane (No moving laser scanner line)
      const scanCardY = 54;
      const scanCardH = height - 90;
      ctx.fillStyle = 'rgba(10, 10, 14, 0.9)';
      ctx.fillRect(16, scanCardY, width - 32, scanCardH);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.14)';
      ctx.strokeRect(16, scanCardY, width - 32, scanCardH);

      // Left Column: Illustrative local project data areas
      const barBaseY = scanCardY + 22;
      const barSpacing = Math.min(28, (scanCardH - 30) / 4);

      scanCategories.forEach((cat, idx) => {
        const y = barBaseY + idx * barSpacing;

        ctx.font = '8px "Space Mono", monospace';
        ctx.fillStyle = '#aaaaaa';
        ctx.textAlign = 'left';
        ctx.fillText(cat.name, 28, y);

        ctx.textAlign = 'right';
        const rightLimit = width > 340 ? width - 105 : width - 75;

        // Decorative bar lengths only; these are not measured scores or percentages.
        const barW = Math.max(60, rightLimit - 30);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.fillRect(28, y + 4, barW, 4);

        const fillW = (cat.fill / 100) * barW;
        ctx.fillStyle = '#38bdf8';
        ctx.fillRect(28, y + 4, fillW, 4);
      });

      // Right Column: Current project format indicator
      if (width > 320) {
        const gaugeX = width - 58;
        const gaugeY = scanCardY + scanCardH / 2;
        const gaugeRadius = Math.min(30, scanCardH * 0.28);

        ctx.beginPath();
        ctx.arc(gaugeX, gaugeY, gaugeRadius, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
        ctx.lineWidth = 3;
        ctx.stroke();

        const startAngle = -Math.PI / 2;
        const scoreProgress = 0.72; // decorative workflow indicator, not a measured project metric
        ctx.beginPath();
        ctx.arc(gaugeX, gaugeY, gaugeRadius, startAngle, startAngle + Math.PI * 2 * scoreProgress);
        ctx.strokeStyle = '#10b981';
        ctx.lineWidth = 3.5;
        ctx.stroke();

        ctx.font = '10.5px "Space Mono", monospace';
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('CLI', gaugeX, gaugeY - 3);

        ctx.font = '6.5px "Space Mono", monospace';
        ctx.fillStyle = '#888888';
        ctx.fillText('LOCAL DATA', gaugeX, gaugeY + 9);
      }

      // 3. Clean Architecture Status Footer
      const footerY = height - 16;
      ctx.font = '8.5px "Space Mono", monospace';
      ctx.fillStyle = '#888888';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'alphabetic';
      ctx.fillText('EXPENSES • GROUPS • SETTLEMENTS → LOCAL JSON', 16, footerY);

      ctx.textAlign = 'right';
      ctx.fillStyle = '#10b981';
      ctx.fillText('CLI WORKFLOW', width - 16, footerY);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className="quantum-visualizer-canvas" />;
}
