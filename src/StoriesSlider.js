class StoriesSlider  {
  constructor(element, options) {
    this.element = element;
    this.options = options;
    this.currentStory = 0;
    this.storiesIndexes = this.getInitialStoriesIndexes();
    this.muted = true;
    this.opened = false;
    this.init();
  }

  
  makeStoriesCircles() {
    this.storiesCircles = document.createElement("div");
    this.storiesCircles.classList.add("stories-cirle");
    let template = '<div class="container"><div class="stories-cirle-wrapper">';

    if (this.options?.stories?.constructor === Array ) {
      this.options.stories.forEach((story) => {
        template += this.getStoryCircleTemplate(story.name, story.photo);
      });
    }

    template += '</div></div>';

    this.storiesCircles.innerHTML = template;

    this.element.append(this.storiesCircles);

    [...this.storiesCircles.querySelectorAll('.stories-cirle-wrapper__circle')].forEach((circle, index) => {
      circle.addEventListener('click', () => {
        if(this.modal.classList.contains('stories-slider-none')) {
          this.modal.classList.remove('stories-slider-none');

          // const currentItem = this.options.stories[this.modalSwiper.activeIndex].items[this.storiesIndexes[this.modalSwiper.activeIndex]];

          // if(currentItem.goods.length) {
          //   console.log(currentItem.goods.length);
          //   console.log('ok');
          //   this.showGoods.innerHTML = this.getGoodsTemplate(currentItem);
          //   this.goodsButton.classList.remove('show-goods-button__hide');
          // }
          // else {
          //   console.log('no');
          //   this.showGoods.innerHTML = '';
          //   this.goodsButton.classList.add('show-goods-button__hide');
          // }

        }

        if(!this.opened) {
          this.initEvents();
          this.opened = true;
        }

        this.modalSwiper.slideTo(index);
        this.playVideo();

        const currentItem = this.options.stories[this.modalSwiper.activeIndex].items[this.storiesIndexes[this.modalSwiper.activeIndex]];
        this.showGoods.innerHTML = this.getGoodsTemplate(currentItem);

        //[...this.modalSwiper.slides[this.modalSwiper.activeIndex].querySelectorAll('.player-wrapper__timeline')][this.storiesIndexes[this.modalSwiper.activeIndex]].classList.add('player-wrapper__timeline-active');
      });
    });
  }

  makeStoriesModal(children) {
    if (children?.constructor !== String) return "";

    if (!this.modal) {
      this.modal = document.createElement("div");
      this.modal.classList.add("slider-app-stroies", "stories-slider-none");
      this.showGoods = document.createElement('div');
      this.showGoods.classList.add('show-goods');
      this.showGoods.innerHTML = this.getGoodsTemplate();
      this.mountedSound = document.createElement('div');
      this.mountedSound.classList.add('sound_muted');
      this.mountedSound.innerHTML = this.makeStoriesModalMuted();
      const closeButton = this.getModalCloseButton();

      const swiperElement = this.makeSwiperOnModal();

      swiperElement.querySelector(".swiper-wrapper").innerHTML = children;

      this.modal.append(swiperElement);
      this.modal.append(this.mountedSound);
      this.modal.append(closeButton);
      this.element.append(this.modal);
      this.modal.append(this.showGoodsButton());
      this.modal.append(this.showGoods);
      this.modal.append(this.owerflowBg());
    }
  }

  closeModal() {
    this.pauseVideo();
    this.modal.classList.add('stories-slider-none');
  }
  
  // -------------------

  makeStoriesModalMuted() {
    return `
    <div class="player-wrapper__muted">
        <div class="player-wrapper__off-muted">
            <svg width="22" height="22" viewBox="0 0 20 20" fill="#fff" xmlns="http://www.w3.org/2000/svg"><path d="M13 0V9.93934L11.5 8.43934V3.17108L8.60617 5.54551L7.54036 4.4797L13 0Z"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M13 14.0438L17.9697 19.0304L19.0304 17.9697L1.55941 0.439579L0.498747 1.50024L4.31891 5.33333H0V14.6667H6.5L13 20V14.0438ZM11.5 12.5387V16.8289L7.03662 13.1667H1.5V6.83333H5.81384L11.5 12.5387Z"></path></svg>
            <span class="stories-modal__mute-label">Звук выключен</span>
        </div>
        <div class="player-wrapper__on-muted">
            <svg width="22" height="22" viewBox="0 0 20 20" fill="#fff" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M7.03662 13.1667L11.5 16.8289V3.17108L7.03662 6.83333H1.5V13.1667H7.03662ZM0 14.6667V5.33333H6.5L13 0V20L6.5 14.6667H0Z"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M19.75 10C19.75 12.412 18.6368 14.7895 16.4785 16.5776L15.5215 15.4224C17.3632 13.8968 18.25 11.9311 18.25 10C18.25 8.06887 17.3632 6.1032 15.5215 4.57756L16.4785 3.42244C18.6368 5.21051 19.75 7.58799 19.75 10Z"></path></svg>
            <span class="stories-modal__mute-label">Звук включен</span>
        </div>
    </div>
    `
  }

  // -------------------

  makeSwiperOnModal() {
 
    const swiperMainElement = document.createElement("div");
    swiperMainElement.classList.add("stories-swiper");
    swiperMainElement.innerHTML = '<div class="swiper-wrapper"></div>';

    this.modalSwiper = new Swiper(swiperMainElement, {
      slidesPerView: this.options.stories.length,
      spaceBetween: 30,
      centeredSlides: true,
      // autoHeight: true,
      noSwiping: false,
      noSwipingClass: "swiper-slide",
      // lazyLoad: true,
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 0
        },
        600: {
          slidesPerView: 1.25,
          spaceBetween: 0
        },
        620: {
          slidesPerView: 1.28,
          spaceBetween: 0
        },
        640: {
          slidesPerView: 1.32,
          spaceBetween: 0
        },
        658: {
          slidesPerView: 1.35,
          spaceBetween: 0
        },
        698: {
          slidesPerView: 1.43,
          spaceBetween: 0
        },
        728: {
          slidesPerView: 1.5,
          spaceBetween: 0
        },
        825: {
          slidesPerView: 1.7,
          spaceBetween: 0
        },
        992: {
          slidesPerView: 2,
          spaceBetween: 0
        },
        1090: {
          slidesPerView: 2.1,
          spaceBetween: 0,
        },
        1100: {
          slidesPerView: 2.45,
          spaceBetween: 0,
        },
        1110: {
          slidesPerView: 2.52,
          spaceBetween: 0,

        },
        1290: {
          slidesPerView: 2.8,
          spaceBetween: 0,
        },
        1320: {
          slidesPerView: 2.8,
          spaceBetween: 0
        },
        1420: {
          slidesPerView: 2.9,
          spaceBetween: 0
        },
        1540: {
          slidesPerView: 3.3,
          spaceBetween: 0
        }
      }
    });

    return swiperMainElement;
  }

  makeStoriesTemplate() {
    let template = "";

    if (this.options?.stories?.constructor === Array) {
      this.options.stories.forEach((story, index) => {
        let storyItems = "";

        if (story?.items?.constructor === Array) {
          const needItem = [...story.items].shift();

          storyItems += this.getStoryItemTemplate(story, needItem);
        }

        template += storyItems;
      });
    }

    return template;
  }

  getInitialStoriesIndexes() {
    const initial = {};

    this.options.stories.forEach((_story, index) => {
      initial[index] = 0;
    });

    return initial;
  }


 
  showGoodsButton() {
    this.goodsButton = document.createElement('div');
    this.goodsButton.classList.add('show-goods-button');
    this.goodsButton.innerHTML = 'Используемые товары';
    this.goodsButton.onclick = (e) => {

    this.swiperInitPod();

      const originalElement = e.currentTarget || e.originalTarget;
      const goodsElement = originalElement.nextElementSibling;

      const visibleBg = originalElement.parentNode.querySelector('.overflowBg');
            visibleBg.classList.toggle('overflowBg__visible');

      if(goodsElement) {
        goodsElement.classList.toggle('show-goods_opened');
        let isOpen = goodsElement.classList.contains('show-goods_opened');

        if(isOpen) {
          this.pauseVideo(false);
        }
        else {
          this.playVideo();
        }

        if(this.goodsButton.innerHTML = isOpen) {
          this.goodsButton.innerHTML = 'Скрыть товары';
          this.goodsButton.classList.add('addColorBtn');
        } else {
          this.goodsButton.innerHTML = 'Используемые товары';
          this.goodsButton.classList.remove('addColorBtn');
        }
      }

      e.stopPropagation();
    }

    return this.goodsButton;
  }

  owerflowBg = () => {
    this.overflowBg = document.createElement('div');
    this.overflowBg.classList.add('overflowBg');
    this.overflowBg.onclick = (e) => {
      
      const originalElement = e.currentTarget || e.originalTarget;

      const visibleBg = originalElement.parentNode.querySelector('.overflowBg')

      if(visibleBg) {
        visibleBg.classList.toggle('overflowBg__visible');
        let isOpen = visibleBg.classList.contains('overflowBg__visible');
        visibleBg.parentNode.querySelector('.show-goods').classList.remove('show-goods_opened');

        if(isOpen) {
          this.pauseVideo(false);
        }
        else {
          this.playVideo();
        }

        if(this.goodsButton.innerHTML = isOpen) {
          this.goodsButton.innerHTML = 'Скрыть товары';
          this.goodsButton.classList.add('addColorBtn');
        } else {
          this.goodsButton.innerHTML = 'Используемые товары';
          this.goodsButton.classList.remove('addColorBtn');
        }
      }

    }

    return this.overflowBg;
  }

  
  getStoryCircleTemplate(name, photo) {
    return `
    <div class="stories-cirle-wrapper__circle">
      <div class="stories-cirle-wrapper__picture">
        <img src="${photo}" alt="${name}"></img>
      </div>
      <div class="stories-cirle-wrapper__title">${name}</div>
    </div>`;
  }


  getStoryItemTemplate(story, item) {
    return `
      <div class="swiper-slide">
        <div class="player">
          <div class="player-wrapper">
              <div class="player-wrapper__timeline-wrp">
              ${this.getStoryItemTimelineTemplate(story)}
              </div>
              <div class="player-wrapper__nav">
                  <div class="player-wrapper__prev"></div>
                  <div class="player-wrapper__next"></div>
              </div>
              <div class="player-wrapper__chunk-wrp">
                ${this.getStoryItemTypeTemplate(item, story)}
              </div>
              <div class="player-wrapper__story-info">
                <div class="player-wrapper__story-info-picture" style="background-image: url('${story.photo}')"></div>
                <div class="player-wrapper__story-info-title">${story.name}</div>
                <div class="player-wrapper__story-info-date"></div>
              </div>
          </div>
          ${this.preloader()}
        </div>
      </div>`;
  }


  getStoryGoodsLinkTemplate(prod, name) {
    return `
      <div class="stories-goods">
          <a class="stories-goods__link" href="${prod}">${name}</a>
      </div>`;
  }


  preloader() {
    return `
      <div class="lds-ripple"><div></div><div></div></div>
    `;
  }

  getStoryItemTimelineTemplate(story) {
    let template = '';

    story.items.forEach(() => {
      template += `<div class="player-wrapper__timeline">
        <div class="player-wrapper__process"></div>
      </div>`;
    });

    return template;
  }

  

  getGoodsTemplate(storyItem) {
    if(!storyItem?.goods) return '';

    let template = `
    <div class="swiper swiperStoriesProd">
      <div class="swiper-wrapper">`;
            
    storyItem.goods.forEach((item) => {
      template += this.getGoodTemplate(item);
    });

    template += `
      </div>
      <div class="swiper-button-next swiper-button-next-stories-prod"></div>
      <div class="swiper-button-prev swiper-button-prev-stories-prod"></div>
    </div>
    `;

    return template;
  }

  
  swiperInitPod = () => {
    var swiperProd = new Swiper(".swiperStoriesProd", {
      // slidesPerView: 'auto',
      // spaceBetween: 20,
      loop: true,
      navigation: {
        nextEl: ".swiper-button-next-stories-prod",
        prevEl: ".swiper-button-prev-stories-prod",
      },
      breakpoints: {
        320: {
          slidesPerView: 2.5,
          spaceBetween: 20
        },
        576: {
          slidesPerView: 2.5,
          spaceBetween: 20
        },
        768: {
          slidesPerView: 3.5,
          spaceBetween: 20
        },
        992: {
          slidesPerView: 4,
          spaceBetween: 20
        },
        1200: {
          slidesPerView: 6,
          spaceBetween: 0
        },
      }
    });

    swiperProd.update();
  }

  getGoodTemplate(item) {
    return `
      <div class="swiper-slide">
        <div class="player-wrapper__chunk-goods-wrp-item">
          <div class="player-wrapper__chunk-goods-wrp-content">
              <div class="player-wrapper__chunk-goods-wrp-image">
                <a href="#">
                  <img src="${item.thumbnail ?? 'https://simg2.marwin.kz/media/catalog/product/cache/550cf8d20d514ab5650dc2adb71f19c7/s/c/nioh_collection_ps5.png'}" alt=""></img>
                </a>
              </div>
              <div class="player-wrapper__chunk-goods-wrp-type">
                <a href="#">${item.name}</a>
              </div>
              <div class="player-wrapper__chunk-goods-wrp-prices">
                <div>
                  <div class="player-wrapper__chunk-goods-wrp-price${item.price > item.special_price ? ' player-wrapper__chunk-goods-wrp-price_underline' : ''}">
                    ${item.price}
                  </div>
                <div class="player-wrapper__chunk-goods-wrp-price_discount">${item.special_price}</div>
                </div>
                <button class="player-wrapper__chunk-goods-wrp-add-cart" title="Добавить в корзину"></button>
            </div>
          </div>
        </div>
      </div>
    `
  }

  
  getStoryItemTypeTemplate(item, story) {

    const typeFormat = item.url.slice(item.url.lastIndexOf('.') + 1);

    let template = '<div class="player-wrapper__chunk player-wrapper__chunk-active">';
    if (item.type == "video") {
      template += `
        <video class="player-wrapper__chunk-video" preload="metadata" playsinline ${this.muted ? 'muted': ''}>
          <source src="${item.url}" type="${item.type}/${typeFormat}">
        </video>
      `;
    }
    if (item.type == "image") {
      template += `<img src="${item.url}" alt="${item.type}"></img>`;
    }
   
    template += '</div>';

    return template;
  }

  getModalCloseButton() {
    const button = document.createElement("div");
    button.classList.add('close_strories');
    button.innerHTML = `<div class="close_strories_mark">
      <svg width="18" height="18" viewBox="0 0 18 18" fill="#fff" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M7.9394 9.00006L0.469727 1.53039L1.53039 0.469727L9.00006 7.9394L16.4697 0.469727L17.5304 1.53039L10.0607 9.00006L17.5304 16.4697L16.4697 17.5304L9.00006 10.0607L1.53039 17.5304L0.469727 16.4697L7.9394 9.00006Z"></path></svg>
    </div>`;
    button.addEventListener('click', () => {
      this.closeModal();
    });

    return button;
  }

  // clickPauseVideo() {
  //   let video = this.modal.querySelector('video');
  //   console.log(video.pause());
  // }

  // clickPlayVideo() {
  //   let video = this.modal.querySelector('video');
  //   console.log(video.play());
  // }
  
  initEvents() {
    [...this.modalSwiper.wrapperEl.querySelectorAll('.swiper-slide')].forEach((storyElement, index) => {
      storyElement.querySelector('.player-wrapper__next').addEventListener('click', this.nextStoryItem);
      storyElement.querySelector('.player-wrapper__prev').addEventListener('click', this.prevStoryItem);
      storyElement.addEventListener('click', () => this.slideToStoryItem(index));
      //storyElement.addEventListener('mousedown', () => this.clickPauseVideo(), false);
      //storyElement.addEventListener('mouseup', () => this.clickPlayVideo(), false);
      // storyElement.addEventListener('mouseover', () => this.clickPlayVideo());
      // тут можно вызвать еще одну функцию на удержание пауза
    });

    this.modalSwiper.on('slideChange', () => {
      const activeIndex = this.modalSwiper.activeIndex;
      const prevIndex = this.modalSwiper.previousIndex;
      const activeElement = this.modalSwiper.slides[activeIndex];
      const prevElement = this.modalSwiper.slides[prevIndex];

      if(activeElement) {
        const video = activeElement.querySelector('video');
        const currentItem = this.options.stories[this.modalSwiper.activeIndex].items[this.storiesIndexes[this.modalSwiper.activeIndex]];
        activeElement.querySelector('.player-wrapper__timeline-wrp').querySelector('.player-wrapper__timeline').classList.add('player-wrapper__timeline-active');

        if(video) {
          video.play();
        }

        if(currentItem.goods.length > 0) {
          this.showGoods.innerHTML = this.getGoodsTemplate(currentItem);
          this.goodsButton.classList.remove('show-goods-button__hide');
        }
        else {
          this.showGoods.innerHTML = '';
          this.goodsButton.classList.add('show-goods-button__hide');
        }
      }

      if(prevElement) {
        const video = prevElement.querySelector('video');

        if(video) {
          video.pause();
          video.currentTime = 0;
        }
      }
    });
  }


  playVideo() {
    const activeIndex = this.modalSwiper.activeIndex;
    const slides = this.modalSwiper.slides.length > 0 ? this.modalSwiper.slides : [...this.modalSwiper.wrapperEl.querySelectorAll('.swiper-slide')];
    const activeElement = slides[activeIndex];
    
    if(activeElement) {
      const video = activeElement.querySelector('video');
      const timeLineAll = [...activeElement.querySelectorAll('.player-wrapper__timeline')];
      const currentItemIndex = this.storiesIndexes[this.modalSwiper.activeIndex];
      
      if(video) {
        video.play();
      }

      timeLineAll.forEach((timeLine, index) => {
        if(index <= currentItemIndex && !timeLine.classList.contains('player-wrapper__timeline-active')) {
          timeLine.classList.add('player-wrapper__timeline-active');
        }
        else if(index > currentItemIndex && timeLine.classList.contains('player-wrapper__timeline-active')) {
          timeLine.classList.remove('player-wrapper__timeline-active');
        }
      });
    }
  }

  pauseVideo(returnToStart = true) {
    const activeIndex = this.modalSwiper.activeIndex;
    const slides = this.modalSwiper.slides.length > 0 ? this.modalSwiper.slides : [...this.modalSwiper.wrapperEl.querySelectorAll('.swiper-slide')];
    const activeElement = slides[activeIndex];
    
    if(activeElement) {
      const video = activeElement.querySelector('video');
      if(video) {
        video.pause();
        if(returnToStart) {
          video.currentTime = 0;
        }
      }
    }
  }


  // здесь переключается сторис вперед
  nextStoryItem = (e) => {
    
    if(!e.target.closest('.swiper-slide').classList.contains('swiper-slide-active')) return false;
    
    const playerWrapper = e.target.closest('.player-wrapper');
    const playerChunk = playerWrapper.querySelector('.player-wrapper__chunk-wrp');
    
    if(this.storiesIndexes[this.modalSwiper.activeIndex] < this.options.stories[this.modalSwiper.activeIndex].items.length - 1) {
      this.storiesIndexes[this.modalSwiper.activeIndex] += 1;
      const currentItem = this.options.stories[this.modalSwiper.activeIndex].items[this.storiesIndexes[this.modalSwiper.activeIndex]];
      
      playerChunk.innerHTML = this.getStoryItemTypeTemplate(currentItem);
      
      const video = playerChunk.querySelector('video');

      //переключаем плашки в право
      /*let timeLineActive = e.target.parentNode.parentNode.querySelector('.player-wrapper__timeline-active');
          if(timeLineActive.nextElementSibling) {
            timeLineActive.classList.remove('player-wrapper__timeline-active');
            timeLineActive.nextElementSibling.classList.add('player-wrapper__timeline-active');
          }*/

      // тут по клику получаем длительность видео
        /*if(video) {
          video.addEventListener('loadedmetadata', (e) => {
            let resDuration = e.target.duration.toFixed() + '000';
            let result = Number(resDuration);
              console.log(result);
          });
        }*/
      
      this.playVideo();

      if(currentItem.goods.length > 0) {
        this.showGoods.innerHTML = this.getGoodsTemplate(currentItem);
        this.goodsButton.classList.remove('show-goods-button__hide');
      }
      else {
        this.showGoods.innerHTML = '';
        this.goodsButton.classList.add('show-goods-button__hide');
      }
    }
    else if(this.storiesIndexes[this.modalSwiper.activeIndex] >= this.options.stories[this.modalSwiper.activeIndex].items.length - 1) {
      const video = playerChunk.querySelector('video');
      
      if(video) {
        video.pause();
      }

      if(this.modalSwiper.activeIndex == this.options.stories.length - 1) {
        this.closeModal();
      }
      else {
        this.modalSwiper.slideNext();
      }
    }

    e.stopPropagation();
  }

  // здесь переключается сторис назад
  prevStoryItem = (e) => {
    if(!e.target.closest('.swiper-slide').classList.contains('swiper-slide-active')) return false;

    const playerChunk = e.target.closest('.player-wrapper').querySelector('.player-wrapper__chunk-wrp');

    if(this.storiesIndexes[this.modalSwiper.activeIndex] !== 0) {
      this.storiesIndexes[this.modalSwiper.activeIndex] -= 1;
      const currentItem = this.options.stories[this.modalSwiper.activeIndex].items[this.storiesIndexes[this.modalSwiper.activeIndex]];

      playerChunk.innerHTML = this.getStoryItemTypeTemplate(currentItem);
      //const video = playerChunk.querySelector('video');


      /*let timeLineActive = e.target.parentNode.parentNode.querySelector('.player-wrapper__timeline-active');
          if(timeLineActive.previousElementSibling) {
            timeLineActive.classList.remove('player-wrapper__timeline-active');
            timeLineActive.previousElementSibling.classList.add('player-wrapper__timeline-active');
          }*/


      this.playVideo();

      if(currentItem.goods.length > 0) {
        this.showGoods.innerHTML = this.getGoodsTemplate(currentItem);
        this.goodsButton.classList.remove('show-goods-button__hide');
      }
      else {
        this.showGoods.innerHTML = '';
        this.goodsButton.classList.add('show-goods-button__hide');
      }
    }
    else if(this.modalSwiper.activeIndex !== 0) {
      const video = playerChunk.querySelector('video');

      if(video) {
        video.pause();
      }

      this.modalSwiper.slidePrev();
    }

    e.stopPropagation();
  }

//Получаем время
  getDataTime() {
    let toDay = new Date();
    let options = {
       month: 'short',
       day: 'numeric' 
      };
    let result = toDay.toLocaleString('ru', options);
    return result;
  }

  ifGonePage() {
    
    document.addEventListener("visibilitychange", function() {
      if (document.hidden) {
       const stopVideo = document.querySelectorAll('.player-wrapper__chunk-video');
              stopVideo.forEach(elm => {
                elm.pause();
              });
      } else {
        const stopVideo = document.querySelectorAll('.player-wrapper__chunk-video');
              stopVideo.forEach(elm => {
                elm.play();
              });
      }
    });
  }


  turnOnTurnoffSound() {
    let soundBtn = this.modal.querySelector('.player-wrapper__muted');
    let changeMuted = soundBtn;
    changeMuted.addEventListener('click', () => {
        this.muted = !this.muted;
        changeMuted.querySelector('.player-wrapper__on-muted').classList.toggle('change_on-muted');
        changeMuted.querySelector('.player-wrapper__off-muted').classList.toggle('change_off-muted');
        this.modalSwiper.slides.forEach((slide) => {
          const video = slide.querySelector('video');
          if(video) {
            video.muted = this.muted;
          }
        });
    });
  }

  slideToStoryItem(index) {
    if(this.modalSwiper.activeIndex == index) return false;
    this.modalSwiper.slideTo(index);
  }

  init() {
    this.makeStoriesCircles();
    this.getDataTime();
    this.preloader();
    // this.ifGonePage();
    // this.showChunkGoods();
    this.makeStoriesModal(this.makeStoriesTemplate());
    //setTimeout(() => this.initEvents(), 1000)
    this.turnOnTurnoffSound();
    // this.swiperInitPod();
    
  }
}

window.StoriesSlider = StoriesSlider;

export default StoriesSlider;



