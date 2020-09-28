const particles = [];

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    
    const particlesLength = Math.floor(window.innerWidth / 10);

    for(let i = 0; i < particlesLength; i++) {
        particles.push(new Particle());
    }
}

function draw() {
    background(55, 100, 144)
    particles.forEach((p, index) => {
        p.update();
        p.draw();
        p.connectParticles(particles.slice(index))
    })

}

class Particle {
    
    constructor() {
        let r1 = int(random(255))
        let r2 = int(random(255))
        let r3= int(random(255))
        this.pos = createVector(random(width), random(height))
        this.speed = createVector(random(-2,2), random(-2,2))
        this.size = 5;
        this.color = `rgba(${r1}, ${r2}, ${r3}, 0.5)`;
    }

    update() {
        this.pos.add(this.speed)
        this.detectEdges();
    }

    draw() {
        noStroke();
        fill('rgba(255, 255, 255, 0.7)');
        circle(this.pos.x, this.pos.y, this.size)
    }

    detectEdges() {
        if(this.pos.x < 0 || this.pos.x > width){
            this.speed.x *= -1;
        }
        
        if(this.pos.y < 1 || this.pos.y > height){
            this.speed.y *= -1;
        }
    }

    connectParticles() {
        particles.forEach(p => {
            const d = dist(this.pos.x, this.pos.y, p.pos.x, p.pos.y);

            if( d < 60) {
                stroke(this.color)
                line(this.pos.x, this.pos.y, p.pos.x, p.pos.y)
            }
        })
    }

}