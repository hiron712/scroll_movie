class ScrollMoviePlay {
    constructor(opt) {
        this.currentTime = 0;
        this.arrival = 0;
        this.prev = 0;

        this.vd = document.querySelector(opt.video);
        this.video_wrap = document.querySelector(opt.target);

        this.duration = Math.floor(vd.duration);

        this.onResize();

        window.addEventListener('resize',()=>{
            this.onResize();
        });

        window.addEventListener('scroll',(e)=>{
            this.onScroll(e);
        });

    
        this.animate();
        
        return this;
    };

    onResize(){
        this.wh = window.innerHeight;
        this.wrapH = this.video_wrap.offsetHeight;
        this.wrapT = this.video_wrap.offsetTop;
        this.sa = Math.round(this.wrapH/this.duration);
    };

    onScroll(e){
        this.scrollY = window.pageYOffset - this.wrapT + this.wh;
        let currentTime = this.scrollY/this.sa;
        if(currentTime < 0){
            this.currentTime = 0;
        }else if(currentTime > this.duration){
            this.currentTime = this.duration;
        }else{
            this.currentTime = currentTime;
        }

        this.currentTime = Math.round(this.currentTime * 1000)/1000;
    }

    animate(){
        this.arrival += (this.currentTime - this.arrival)/10;
        this.arrival = Math.round(this.arrival * 1000)/1000;

        if(!isNaN(this.arrival)){
            if(this.prev !== this.arrival){
                this.vd.currentTime = this.arrival;
                console.log(this.arrival);
            }
        }
        this.prev = this.arrival;
        window.requestAnimationFrame(()=>this.animate());
    };
}

function init(){
    new ScrollMoviePlay({
        target: '.content',
        video: '#vd'
    });
}

window.addEventListener('load',init);