import * as data from "./data.json";

const timeFrameSelectionContainer = document.querySelector(
  ".profile-card__time-frame-selection"
);
const activityCardContainer = document.querySelector(
  ".activity-card-container"
);

window.addEventListener("load", function () {
  const activityCardMarkup = generateActivityCardMarkup("weekly");

  activityCardContainer.insertAdjacentHTML("afterbegin", activityCardMarkup);
});

timeFrameSelectionContainer.addEventListener("click", function (e) {
  const timeFrameSelectionButtons = document.querySelectorAll(
    ".profile-card__button"
  );
  const timeFrameSelectionButton = e.target.closest(".profile-card__button");

  if (!timeFrameSelectionButton) return;

  timeFrameSelectionButtons.forEach((button) =>
    button.classList.remove("profile-card__button--active")
  );

  timeFrameSelectionButton.classList.add("profile-card__button--active");

  const timeFrame = timeFrameSelectionButton.dataset.timeFrame;

  activityCardContainer.innerHTML = "";
  const activityCardMarkup = generateActivityCardMarkup(timeFrame);

  activityCardContainer.insertAdjacentHTML("afterbegin", activityCardMarkup);
});

const generateActivityCardMarkup = function (timeFrame) {
  return data
    .map((activity) => {
      const activityClassName = activity.title
        .toLowerCase()
        .split(" ")
        .join("-");

      return `
      <div class="activity-card">
        <div class="activity-card__header activity-card__header--${activityClassName}"></div>
        <div class="activity-card__stats">
          <p class="activity-card__activity-type">${activity.title}</p>
          <button class="activity-card__dots">
          <img
            src="https://svgshare.com/i/isj.svg"
            alt="Ellipsis Menu Button Image"
          />
        </button>
          <p class="activity-card__activity-time-current">${activity.timeframes[timeFrame].current}hrs</p>
          <p class="activity-card__activity-time-previous">
            Last ${timeFrame} - ${activity.timeframes[timeFrame].previous}hrs
          </p>
        </div>
      </div>
    `;
    })
    .join("");
};
