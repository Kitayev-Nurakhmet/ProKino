const createListTrailers = (parrent, srcList) => {
 const trailerList = document.createElement('ul');
 trailerList.classList.add('trailer__list');
 parrent.append(trailerList);

 const trailerWrappers = [];
 const trailerFrames = [];

 srcList.forEach(src => {
  const trailerItem = document.createElement('li');
  trailerItem.classList.add('trailer__item');
  trailerList.append(trailerItem);

  const trailerWrapper = document.createElement('div');
  trailerWrapper.classList.add('trailer__wrapper');
  trailerItem.append(trailerWrapper);
  trailerWrappers.push(trailerWrapper);

  const trailerVideo = document.createElement('iframe');
  trailerVideo.classList.add('trailer__video');
  trailerWrapper.append(trailerVideo);
  trailerFrames.push(trailerVideo);

  const idVideo = src.match(/\/embed\/([^/\?]+)/)[1];

  trailerVideo.srcdoc = `
  <style>
    * {
    	padding: 0;
    	margin: 0;
    	overflow: hidden;
    }
    
    html,
    body {
    	width: 100%;
    	height: 100%;
    }

    a {
    cursor: default;
    }
    
    img, svg {
    	position: absolute;
    	top: 0;
    	left: 0;
    	width: 100%;
    	height: 100%;
    }
    
    #button {
    	position: absolute;
    	top: 50%;
    	left: 50%;
    	transform: translate(-50%, -50%);
    	width: 64px;
    	height: 64px;
    	z-index: 5;
    	background-color: transparent;
    	border: none;
    	cursor: pointer;
    }
    
    @media (max-width: 900px) {
    	#button {
    		width: 36px;
    		height: 36px;
    	}
    }
  </style>
  <a href="https://www.youtube.com/embed/${idVideo}?autoplay=1">
   <img src= "https://img.youtube.com/vi/${idVideo}/maxresdefault.jpg">
   <div id="button">
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="32" r="32" fill="#FF3D00"/>
        <path d="M42.5 31.134C43.1667 31.5189 43.1667 32.4811 42.5 32.866L27.5 41.5263C26.8333 41.9112 26 41.4301 26 40.6603V23.3397C26 22.5699 26.8333 22.0888 27.5 22.4737L42.5 31.134Z" fill="white"/>
   </div>
  </a>
  `;
 })

 return { trailerWrappers, trailerFrames };
};

const controlTrailer = (trailerWrappers, trailerFrames, i = 0, j = 0) => {
 if (i !== j) {
  trailerWrappers[i].style.display = 'none';
  trailerFrames[i].srcdoc = '';
 } else {
  trailerWrappers[i].style.display = 'block';
  trailerFrames[i].srcdoc = trailerFrames[i].dataset.srcdoc;
 }
}

const init = () => {
 const trailerContainer = document.querySelector('.trailer__container');
 const trailerButtons = document.querySelectorAll('.trailer__button');

 const srcList = [];
 trailerButtons.forEach((btn) => {
  srcList.push(btn.dataset.src);
 })

 const { trailerWrappers, trailerFrames } = createListTrailers(trailerContainer, srcList);


 trailerButtons.forEach((btn, j) => {
  trailerFrames[j].dataset.srcdoc = trailerFrames[j].srcdoc;

  btn.addEventListener('click', () => {
   trailerButtons.forEach((tBtn, i) => {
    if (tBtn === btn) {
     tBtn.classList.add('trailer__button_active')
    } else {
     tBtn.classList.remove('trailer__button_active')
    }

    controlTrailer(trailerWrappers, trailerFrames, i, j)
   });

  })
 })
 controlTrailer(trailerWrappers, trailerFrames)
};

init();