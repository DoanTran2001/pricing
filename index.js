function makeSlideShow(slide) {
  const slideContainer = document.getElementById(slide);
  const pricing_slide_wapper = document.querySelector(
    `#${slide} .pricing_slide_wapper`
  );
  loadSlide(slider1, pricing_slide_wapper);
  const slideItem = slideContainer.querySelectorAll(
    ".pricing_container .pricing_item"
  );
  const dots = slideContainer.querySelector(".dots");
  const slideItemLength = slideItem.length;
  let dotsNum = Math.ceil(slideItemLength / 3); // Tổng số lượng dots
  renderDots(dotsNum, dots); // render dots
  const dotItem = slideContainer.querySelectorAll(".dots .dot_item"); 
  const leftArrow = slideContainer.querySelector(
    ".pricing_arrow .pricing_left"
  );
  const rightArrow = slideContainer.querySelector(
    ".pricing_arrow .pricing_right"
  );
  const sliderItems = slideContainer.querySelectorAll(".pricing_item");
  const size = sliderItems[0].offsetWidth + 21;
  let indexSlide = 0;
  let positionX = 0;
  dotItem.forEach((item, index) => {
    item.addEventListener("click", () => {
      slideContainer.querySelector(".dots .dot_item.active").classList.remove('active')
      dotItem[index].classList.add("active");
      indexSlide = index + 3;
      positionX = -1 * index * size * 3;
      pricing_slide_wapper.style = `transform: translateX(${positionX}px)`;
    });
  });

  rightArrow.addEventListener("click", () => {
    if (indexSlide >= slider1.length - 3) {
      indexSlide = slider1.length - 3;
      return;
    }
    // console.log(indexSlide, slider1.length - 3);
    positionX = positionX - size;
    pricing_slide_wapper.style = `transform: translateX(${positionX}px)`;
    indexSlide++;
  });
  // console.log(indexSlide);
  leftArrow.addEventListener("click", () => {
    console.log(indexSlide);
    if (indexSlide <= 0) {
      indexSlide = 0;
      return;
    }
    positionX = positionX + size;
    pricing_slide_wapper.style = `transform: translateX(${positionX}px)`;
    indexSlide--;
  });
}

makeSlideShow("slider1");

// Render Slider Item
function renderSlideItem(item) {
  return `
  <div class="pricing_item">
  <div class="pricing_item_container">
    <div class="pricing_content">
      <div class="pricing_head">
        <img src=${item.image} alt="" />
        <div class="pricing_head_content">
          <h3>${item.name}</h3>
          <p>${item.title ? item.title : ""}</p>
        </div>
        <div class="pricing_head_price">
          <p>${item.price}</p>
          <span>Per tour</span>
        </div>
        ${
          item.new
            ? `<div class="pricing_head_newmark">
                    <img src="./images/newmark.png" alt="">
                    <p>New</p>
                  </div>`
            : ""
        }
        
      </div>

      <div class="pricing_body">
        <div class="">
          <div class="pricing_body_desc">
            <p>Subtitle goes here</p>
            <p>Subtitle second line goes here lorem ipsum *</p>
          </div>
          <ul class="pricing_body_list">
            <li>Drop out ramen hustle</li>
            <li>Drop out ramen hustle</li>
            <li>Drop out ramen hustle</li>
            <li>Drop out ramen hustle</li>
            <li>Drop out ramen hustle</li>
          </ul>
        </div>
        <div class="pricing_body_button">
          <button>Buy tour</button>
        </div>
      </div>
    </div>
  </div>
</div>
  `;
}

// Render dots
function renderDots(total, dots) {
  const a = Array(total)
    .fill(0)
    .map((item, index) => {
      if (index === 0) {
        return `<div class="dot_item active"></div>`;
      }
      return `<div class="dot_item"></div>`;
    });
  dots.innerHTML = a.join("\n");
}

// Render Slider
function loadSlide(slider, slideWrapper) {
  slideWrapper.innerHTML = "";
  const a = slider.map((item) => renderSlideItem(item));
  slideWrapper.insertAdjacentHTML("beforeend", a.join("\n"));
}
