(function() {
    // Create canvas
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.zIndex = '-999'; 
    canvas.style.pointerEvents = 'none';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let width, height;

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    // Particle Array (Matte Dust / Floating Ash)
    const particles = [];
    const numParticles = window.innerWidth < 768 ? 40 : 80;

    for (let i = 0; i < numParticles; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 2 + 0.5, // Smaller, flatter particles
            vx: (Math.random() - 0.5) * 0.2, 
            vy: (Math.random() - 0.5) * 0.2, 
            baseOpacity: Math.random() * 0.4 + 0.1,
            pulseSpeed: Math.random() * 0.01 + 0.005,
            angle: Math.random() * Math.PI * 2,
            color: Math.random() > 0.5 ? '#ffffff' : '#b0b0b5' // Matte Silver and White
        });
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);
        
        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;

            if (p.x < -10) p.x = width + 10;
            if (p.x > width + 10) p.x = -10;
            if (p.y < -10) p.y = height + 10;
            if (p.y > height + 10) p.y = -10;

            p.angle += p.pulseSpeed;
            const currentOpacity = p.baseOpacity + Math.sin(p.angle) * 0.15;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.globalAlpha = Math.max(0, currentOpacity); 
            
            // Matte effect: NO shadowBlur, NO glowing.
            
            ctx.fill();
        });

        ctx.globalAlpha = 1;
        requestAnimationFrame(animate);
    }
    animate();
})();
