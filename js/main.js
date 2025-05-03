// 
// Read and add to HTML all images via *.json file list
// 
// Remember to set imgix path correctly to serve images online properly.
// It may need a specific sub-folder name from the `Assets` repo.
// var imgix_path = "https://sound-spinning-pics.imgix.net/";
var imgix_path = "./assets/";
// imgix settings, appended after image filename.
// Input width value `w=` right.
// var imgix_ops = "?w=800&auto=compress,enhance,format";
// var index = 0;

// START parsing file list
fetch('js/images.json')
.then(response => response.json())
.then(data => {
  const main_grid = document.getElementById("grid");
  const dataImgs = data.images;
  // Append images to HTML
  for (const img of dataImgs) {
    // index += 1;
    main_grid.innerHTML +=
`     <!-- IMG${img.imgId} -->
			<article>
				<img src="${imgix_path}${img.file}" alt="${img.alt}" loading="lazy" data-id="${img.imgId}" title="${img.file.split(/\.(?=[^\.]+$)/)[0]}"/>
				<h2>${img.imgId}.-${img.file.split(/\.(?=[^\.]+$)/)[0]}${img.year}<span> ${img.alt}</span></h2>
				<details>
					<summary> Info </summary>
					<p>
						<span>${img.type}</span> <span><b>Size</b>: ${img.size}</span> <span><b>Price</b>: &pound;${img.imgId} + P&amp;P</span> <button role="button">Buy</button>
					</p>
				</details>
			</article>`;
  }
  // console.log("Got Here#1"); 
  // this is called here so that the DOM has all elements required
  window.onload = init();
})
.catch(error => console.error("Error fetching JSON data:", error));
// END dealing with files in JSON list


function init() {
  // Get the modals
  var introModal = document.getElementById("intro-modal");
  var loader = document.querySelector(".loader");
  var modal = document.getElementById("main-modal");
  var aboutModal = document.getElementById("about-modal");
  var controlsModal = document.getElementById("controls-modal");
  document.querySelector("#intro-text div:nth-of-type(1)").style.display = "flex";
  document.querySelector("#intro-text div:nth-of-type(1)").style.animation = "showup 7s";
  document.querySelector("#intro-text div:nth-of-type(2)").style.display = "flex";
  document.querySelector("#intro-text div:nth-of-type(2)").style.animation = "reveal 5s infinite";
  document.querySelector("#intro-text div:nth-of-type(3)").style.display = "inline-block";
  document.querySelector("#intro-text div:nth-of-type(3)").style.animation = "reveal 7s infinite";
  introModal.style.animation = "slideOut 2s 5s";
  loader.style.animation = "showup 2s infinite";
  setTimeout(()=>{
    loader.style.display = "none";
  },2000)

  setTimeout(()=>{
    introModal.style.display = "none";
  },6000)
  
  // MAIN modal
  // Get the image and insert it inside the modal - use its "alt" text as a caption
  // + carousel inside the modal
  var imgs = document.querySelectorAll("article img");
  var imgDetails = document.querySelectorAll("article details");
  // var imgp = document.querySelectorAll("article p");
  var modalImg = document.getElementById("modal-img");
  var modalPrev = document.getElementById("prev");
  var modalNext = document.getElementById("next");
  var modalCount = document.getElementById("count");
  var modalTitle = document.getElementById("modal-title");
  var modalCaption = document.getElementById("modal-caption");
  var modalDetails = document.getElementById("modal-details");
  imgs.forEach(e => {
    e.onclick=()=> {
      modal.style.display = "block";
      modalImg.src = e.src;
      modalTitle.innerHTML = e.title;
      modalCaption.innerHTML = e.alt;
      modalDetails.innerHTML = imgDetails[e.dataset.id - 1].innerHTML;
      modalCount.innerHTML = e.dataset.id+" / "+imgs.length;
      // basic carousel logic via controls
      modalPrev.onclick=()=> {
        if (e.dataset.id == 1) {
          e = imgs[imgs.length - 1];          
        } else {
          e = imgs[e.dataset.id - 2];
        }
        modalImg.src = e.src;
        modalTitle.innerHTML = e.title;
        modalCaption.innerHTML = e.alt;
        modalDetails.innerHTML = imgDetails[e.dataset.id - 1].innerHTML;
        modalCount.innerHTML = e.dataset.id+" / "+imgs.length;
        // console.log("clicked Prev: img-id = ", e.dataset.id); 
      }
      modalNext.onclick=()=> {
        if (e.dataset.id == imgs.length) {
          e = imgs[0];          
        } else {
          e = imgs[e.dataset.id];
        }
        modalImg.src = e.src;
        modalTitle.innerHTML = e.title;
        modalCaption.innerHTML = e.alt;
        modalDetails.innerHTML = imgDetails[e.dataset.id - 1].innerHTML;
        modalCount.innerHTML = e.dataset.id+" / "+imgs.length;
        // console.log("clicked Next: img-id = ", e.dataset.id); 
      }
    }
  })
  
  // About box popup
  // var footer = document.querySelector("footer");
  var footBar = document.querySelector(".foot-bar");
  var aboutBox = document.querySelector(".foot-bar > span:nth-of-type(1) > a");
  var controlsBox = document.querySelector(".foot-bar > span:nth-of-type(2) > a");
  aboutBox.onclick=()=> {
    aboutModal.style.display = "flex";
    // footer.style.animation = "slideIn 0.8s";
    footBar.style.display = "none";
  }
  controlsBox.onclick=()=> {
    // footer.style.animation = "slideIn 0.8s";
    controlsModal.style.display = "flex";
    footBar.style.display = "none";
  }
  
  // Get the <span> elements that close the modals
  var xClose = document.querySelectorAll("span.close");
  
  // When the user clicks on <span> (x), close the modal
  xClose.forEach(e => {
    e.onclick = function() { 
      introModal.style.animation = "slideOut 1s";
      modal.style.animation = "slideOut 1s";
      aboutModal.style.animation = "slideOut 1s";
      controlsModal.style.animation = "slideOut 1s";
      setTimeout(()=>{
        introModal.style.display = "none";
        // introModal.style.animation = "slideIn 1s";
        modal.style.display = "none";
        modal.style.animation = "slideIn 1s";
        aboutModal.style.display = "none";
        aboutModal.style.animation = "slideIn 0.8s";
        controlsModal.style.display = "none";
        controlsModal.style.animation = "slideIn 0.8s";
        // footer.style.animation = "slideIn 0.8s";
        footBar.style.display = "flex";
      },500)
    }
  })

  // get range (slider) value:
  // Get the root element
  var r = document.querySelector(':root');
  // slider input element
  var gapSize = document.getElementById("gapSwitch");
  gapSize.addEventListener('input', () => {
    r.style.setProperty('--gap', gapSize.value+'rem');
    // console.log("Got Here#2 :", gapSize.value);
  })

  // console.log("Got Here#2"); 
};
