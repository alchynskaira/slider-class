const pictures = [
    'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg'
];

const wrapper = document.getElementById("container");

class Slider {

    #direction;
    slides;

    constructor(wrapper, pictures, direction, slides){
        this.wrapper = wrapper;
        this.pictures = pictures;
        this.#direction = direction;
        this.startPosition = 0;
        this.slides = slides;

        this.#renderSlides(pictures);
        this.dragStart()
        this.dragEnd()
        this.#addListenersDrag();

    }


    #renderSlides(){
        const slider = document.createElement("div");
        slider.classList.add("slider");
        this.wrapper.append(slider);
        const imgList = document.createElement('div');
        imgList.classList.add("image-list")
        const dotBox = document.createElement("div");
        dotBox.classList.add("dots-wrapper");
        imgList.setAttribute("id", "image-list");
        slider.appendChild(imgList);
        slider.append(dotBox);

        this.pictures.map((item, index) => {
            let itemImg = `<span class="fade image-item ${index === 0 ? 'active' : ''}" data-img-index= "${index}" >
                       <img class="slide-img" src= "${item}" alt="image">
                       </span>`;

            imgList.innerHTML += itemImg;
            dotBox.innerHTML +=  this.createDot(index);

        });
        this.addEventToDots();
        // this.#addListenersDrag();
        this.#createButtonWrapper()

    }

    #createButtonWrapper() {
        const buttonWrapper = document.createElement("div");
        const sliderWrapper = document.querySelector(".slider");
        buttonWrapper.classList.add("button-wrapper");
        buttonWrapper.append(this.createButton(true, ["btn", "right-btn"]));
        buttonWrapper.append(this.createButton(false, ["btn", "left-btn"]));
        sliderWrapper.append(buttonWrapper);
        buttonWrapper.querySelector(".right-btn").addEventListener("click", () => this.#switchSlides(true));
        buttonWrapper.querySelector(".left-btn").addEventListener("click", () => this.#switchSlides(false));
    }

     createButton(isRight, btnClass) {
        const button = document.createElement("button");
         button.classList.add(...btnClass);
        return button;

    }

     createDot(index) {
        return `<div class="dot${index === 0 ? ' active' : ''}" data-dot-index="${index}">
                       </div>`;

    }

     addEventToDots() {
        const dots = document.getElementsByClassName('dot');
        for (let dot of dots) {
            dot.addEventListener("click", () => this.#moveToSlide(dot));
        }
    }

    markDot(id) {
        document.querySelector('.dot.active').classList.remove('active');
        document.querySelector("[data-dot-index='" + id + "']").classList.add('active');

    }

    #moveToSlide(dot) {
        const slide = document.querySelector(".image-item.active");
        slide.classList.remove("active");
        const currentSlide = document.querySelector("[data-img-index='" + dot.dataset.dotIndex + "']");
        currentSlide.classList.add("active")
        this.markDot(dot.dataset.dotIndex);
    }

    #switchSlides(right) {
        const currentSlide = document.querySelector(".image-item.active");
        const currentSlideIndex = currentSlide.getAttribute('data-img-index');
        let nextSlideIndex = right ? parseInt(currentSlideIndex) + 1 : parseInt(currentSlideIndex) - 1;

        const maxLength = pictures.length;

        if (nextSlideIndex > maxLength - 1) {
            nextSlideIndex = 0;
        } else if (nextSlideIndex < 0) {
            nextSlideIndex = maxLength - 1;
        }

        currentSlide.classList.remove("active");
        document.querySelector("[data-img-index='" + nextSlideIndex + "']").classList.add('active');

        this.markDot(nextSlideIndex);
    }

     #addListenersDrag () {
        this.slides = document.getElementById("image-list");
        this.slides.onmousedown = this.dragStart;
        this.slides.addEventListener('touchstart',  this.dragStart);
        this.slides.addEventListener('touchend', this.dragEnd);
        this.slides.addEventListener('touchmove',  this.#dragAction);
    }

      dragStart(e){
       e.preventDefault();

          document.onmouseup = this.dragEnd;
          document.onmousemove = this.#dragAction;
    }

     #dragAction (e) {
        if (e.pageX < this.startPosition) {
            this.direction = "left";
        } else if (e.pageX > this.startPosition) {
            this.direction = "right";
        }
        this.startPosition = e.pageX;
    }

    private dragEnd () {
        if (this.direction === 'right') {
            this.#switchSlides(true);
        } else {
            this.#switchSlides(false);
        }

        document.onmouseup = null;
        document.onmousemove = null;
    }

}


const firstSlider = new Slider(wrapper, pictures);



