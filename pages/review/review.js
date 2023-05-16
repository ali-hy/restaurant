/**
 * @typedef {{
 * reviewerName: string;
 * starRating: number;
 * reviewText: string;
 * }} ReviewData
 */
/**
 * @type {HTMLFormElement}
 */
const reviewForm = document.querySelector('form.review-form');
/**
 * @type {HTMLDivElement}
 */
const starRatingContainer = document.querySelector("div.star-review-section");
/**
 * @type {number}
 */
let starRatingValue = 0;
/**
 * @type {NodeListOf<HTMLDivElement>}
 */
const stars = document.querySelectorAll("div.star-img");
stars.forEach((star, index) => {
  star.dataset.n = index + 1;
})
/**
 * @type {ReviewData[]}
 */
const loadedReviews = JSON.parse(localStorage.getItem("reviews")) ?? [];
/**
 * @type {HTMLUListElement}
 */
const reviewList = document.querySelector(".review-list");

/**
 * @param {ReviewData} reviewData 
 * @returns {HTMLLIElement}
 */
function renderReview(reviewData){
  const listItem = document.createElement("li");
  listItem.className = "review";
    const reviewerName = document.createElement("h5");
    reviewerName.className = "reviewer-name";
    reviewerName.innerText = reviewData.reviewerName;
    listItem.appendChild(reviewerName);

    const reviewText = document.createElement("p");
    reviewText.className = "reviewer-text";
    reviewText.innerText = reviewData.reviewText;
    listItem.appendChild(reviewText);

    const starRating = document.createElement("div");
    starRating.className = "d-flex";
    for(let i = 0; i < reviewData.starRating; i++){
      const star = document.createElement("div");
      star.className = "star-img-sm";
      starRating.appendChild(star);
    }
    listItem.appendChild(starRating);
  return listItem;
}
function renderReviews(){
  const renderedReviews = loadedReviews.map(renderReview);
  
  renderedReviews.forEach(review => {
    reviewList.appendChild(review);
  });
}
function appendReview(reviewData){
  loadedReviews.push(reviewData);
  const renderedReview = renderReview(reviewData);
  reviewList.appendChild(renderedReview);
}
function saveReviews(){
  localStorage.setItem("reviews", JSON.stringify(loadedReviews));
}

function fillStars(n) {
  stars.forEach((star, index) => {
    if (index < n) {
      star.classList.add("full-star");
    } else {
      star.classList.remove("full-star");
    }
  });
}
function fillStars_currentValue() {
  fillStars(starRatingValue);
}

function createStarClickHandler(index) {
  /**
   * @param {MuouseEvent} e
   */
  return (e) => {
    starRatingContainer.dataset.value = index + 1;
    starRatingValue = index + 1;
    fillStars_currentValue();
  }
}
function createStarMouseEnterHandler(index) {
  /**
   * @param {MuouseEvent} e
   */
  return (e) => {
    fillStars(index+1);
  }
}
function starMouseLeaveHandler(){
  fillStars_currentValue();
}

function resetForm(){
  starRatingValue = 0;
  fillStars_currentValue();

  reviewForm.reset();
}

/**
 * @param {SubmitEvent} e 
 */
function submitReview(e){
  e.preventDefault();
  /**
   * @type {ReviewData}
   */
  const reviewData = {
    starRating: starRatingValue,
    reviewerName: reviewForm.querySelector("#reviewer-name").value,
    reviewText: reviewForm.querySelector("#review-text").value
  }
  appendReview(reviewData);
  saveReviews();
  resetForm();
}

stars.forEach((star, index) => {
  star.addEventListener('click', createStarClickHandler(index));
  star.addEventListener('mouseenter', createStarMouseEnterHandler(index));
  star.addEventListener('mouseleave', starMouseLeaveHandler);
})

reviewForm.addEventListener('submit', submitReview);

renderReviews();