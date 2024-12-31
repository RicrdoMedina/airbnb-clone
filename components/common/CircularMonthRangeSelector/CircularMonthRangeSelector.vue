<template>
  <div class="month-picker">
    <div class="month-picker--item-1"></div>
    <div class="month-picker--item-2"></div>
    <div class="month-picker--item-3">
      <div class="month-picker--item-3--el-1">3</div>
      <div class="month-picker--item-3--el-2">Meses</div>
    </div>
    <div class="month-picker--item-4"></div>
    <span class="dot dot-1"></span>
    <span class="dot dot-2"></span>
    <span class="dot dot-3"></span>
    <span class="dot dot-4"></span>
    <span class="dot dot-5"></span>
    <span class="dot dot-6"></span>
    <span class="dot dot-7"></span>
    <span class="dot dot-8"></span>
    <span class="dot dot-9"></span>
    <span class="dot dot-10"></span>
    <span class="dot dot-11"></span>
    <span class="dot dot-12"></span>
    <svg
      aria-hidden="true"
      class="bar"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      style="/* display: none; */"
    >
      <defs>
        <mask id="trackBackground">
          <rect x="0" y="0" width="100%" height="100%" fill="black"></rect>
          <circle
            cx="50%"
            cy="50%"
            fill="none"
            r="115"
            stroke="white"
            stroke-width="60"
          ></circle>
          <path
            fill="black"
            filter="blur(10px)"
            d="M 157 157 L -20 157 L -20 -7.372125185138003 L 142.6193024466364 -7.372125185138003 L 157 157 L 157 334 L -20 334 L -20 157 L 157 157 L 334 157 L 334 334 L 157 334 L 157 157 L 273.6726188957804 40.32738110421967 L 334 40.32738110421967 L 334 157 L 157 157"
          ></path>
        </mask>
        <radialGradient id="trackBackgroundInnerShadow">
          <stop offset="56%" stop-color="rgba(188, 0, 55, 0.6)"></stop>
          <stop offset="62%" stop-color="transparent"></stop>
          <stop offset="66%" stop-color="transparent"></stop>
          <stop offset="89%" stop-color="rgba(188, 0, 55, 0.4)"></stop>
        </radialGradient>
        <mask id="trackForeground">
          <rect x="0" y="0" width="100%" height="100%" fill="black"></rect>
          <path
            fill="white"
            stroke="white"
            d="M 157 20 A 4 4 0 0 1 160.99946349592804 16.056733783608024 A 141 141 0 0 1 227.49999999999994 34.89041806639413 A 26 26 0 0 1 227.5 34.89041806639416 A 26 26 0 0 1 201.49999999999997 79.92373906318494 A 89 89 0 0 0 160.9986535046821 68.08987251077922 A 4 4 0 0 1 157 64 Z"
          ></path>
        </mask>
        <radialGradient id="trackForegroundFill">
          <stop offset="69%" stop-color="#cb005e"></stop>
          <stop offset="100%" stop-color="#ff234b"></stop>
        </radialGradient>
        <filter id="trackForegroundDropShadow1" filterUnits="userSpaceOnUse">
          <feDropShadow
            dx="0"
            dy="0"
            flood-color="#ed2343"
            flood-opacity="0.5"
            stdDeviation="20"
          ></feDropShadow>
        </filter>
        <filter id="trackForegroundDropShadow2" filterUnits="userSpaceOnUse">
          <feDropShadow
            dx="0"
            dy="0"
            flood-color="#41000c"
            flood-opacity="0.9"
            stdDeviation="3"
          ></feDropShadow>
        </filter>
        <filter id="trackForegroundDropShadow3" filterUnits="userSpaceOnUse">
          <feDropShadow
            dx="0"
            dy="0"
            flood-color="#ed2343"
            flood-opacity="1"
            stdDeviation="6"
          ></feDropShadow>
          <feDropShadow
            dx="0"
            dy="0"
            flood-color="#ed2343"
            flood-opacity="0.5"
            stdDeviation="6"
          ></feDropShadow>
        </filter>
        <filter id="trackForegroundInsetShadow1">
          <feOffset dx="0" dy="-10"></feOffset>
          <feGaussianBlur
            stdDeviation="10"
            result="offset-blur"
          ></feGaussianBlur>
          <feComposite
            operator="out"
            in="SourceGraphic"
            in2="offset-blur"
            result="inverse"
          ></feComposite>
          <feFlood
            flood-color="#ffc0cb"
            flood-opacity="0.7"
            result="color"
          ></feFlood>
          <feComposite
            operator="in"
            in="color"
            in2="inverse"
            result="shadow"
          ></feComposite>
          <feComponentTransfer in="shadow" result="shadow">
            <feFuncA type="linear" slope="1"></feFuncA>
          </feComponentTransfer>
        </filter>
        <filter id="trackForegroundInsetShadow2">
          <feOffset dx="0" dy="-2"></feOffset>
          <feGaussianBlur
            stdDeviation="4"
            result="offset-blur"
          ></feGaussianBlur>
          <feComposite
            operator="out"
            in="SourceGraphic"
            in2="offset-blur"
            result="inverse"
          ></feComposite>
          <feFlood
            flood-color="#cf0020"
            flood-opacity="1"
            result="color"
          ></feFlood>
          <feComposite
            operator="in"
            in="color"
            in2="inverse"
            result="shadow"
          ></feComposite>
          <feComponentTransfer in="shadow" result="shadow">
            <feFuncA type="linear" slope="1"></feFuncA>
          </feComponentTransfer>
        </filter>
        <filter id="trackForegroundInsetShadow3">
          <feOffset dx="0" dy="-10"></feOffset>
          <feGaussianBlur
            stdDeviation="5"
            result="offset-blur"
          ></feGaussianBlur>
          <feComposite
            operator="out"
            in="SourceGraphic"
            in2="offset-blur"
            result="inverse"
          ></feComposite>
          <feFlood
            flood-color="white"
            flood-opacity="0.1"
            result="color"
          ></feFlood>
          <feComposite
            operator="in"
            in="color"
            in2="inverse"
            result="shadow"
          ></feComposite>
          <feComponentTransfer in="shadow" result="shadow">
            <feFuncA type="linear" slope="1"></feFuncA>
          </feComponentTransfer>
        </filter>
      </defs>
      <circle
        cx="50%"
        cy="50%"
        fill="url(#trackBackgroundInnerShadow)"
        filter="blur(10px)"
        mask="url(#trackBackground)"
        r="145"
      ></circle>
      <path
        fill="#ff234b"
        filter="url(#trackForegroundDropShadow1)"
        mask="url(#trackBackground)"
        d="M 157 20 A 4 4 0 0 1 160.99946349592804 16.056733783608024 A 141 141 0 0 1 227.49999999999994 34.89041806639413 A 26 26 0 0 1 227.5 34.89041806639416 A 26 26 0 0 1 201.49999999999997 79.92373906318494 A 89 89 0 0 0 160.9986535046821 68.08987251077922 A 4 4 0 0 1 157 64 Z"
      ></path>
      <path
        fill="#ff234b"
        filter="url(#trackForegroundDropShadow2)"
        mask="url(#trackBackground)"
        d="M 157 20 A 4 4 0 0 1 160.99946349592804 16.056733783608024 A 141 141 0 0 1 227.49999999999994 34.89041806639413 A 26 26 0 0 1 227.5 34.89041806639416 A 26 26 0 0 1 201.49999999999997 79.92373906318494 A 89 89 0 0 0 160.9986535046821 68.08987251077922 A 4 4 0 0 1 157 64 Z"
      ></path>
      <circle
        cx="50%"
        cy="50%"
        fill="url(#trackForegroundFill)"
        mask="url(#trackForeground)"
        r="145"
      ></circle>
      <path
        fill="#ff234b"
        filter="url(#trackForegroundInsetShadow1)"
        stroke="#ff234b"
        d="M 157 20 A 4 4 0 0 1 160.99946349592804 16.056733783608024 A 141 141 0 0 1 227.49999999999994 34.89041806639413 A 26 26 0 0 1 227.5 34.89041806639416 A 26 26 0 0 1 201.49999999999997 79.92373906318494 A 89 89 0 0 0 160.9986535046821 68.08987251077922 A 4 4 0 0 1 157 64 Z"
      ></path>
      <path
        fill="#ff234b"
        filter="url(#trackForegroundInsetShadow2)"
        stroke="#ff234b"
        d="M 157 20 A 4 4 0 0 1 160.99946349592804 16.056733783608024 A 141 141 0 0 1 227.49999999999994 34.89041806639413 A 26 26 0 0 1 227.5 34.89041806639416 A 26 26 0 0 1 201.49999999999997 79.92373906318494 A 89 89 0 0 0 160.9986535046821 68.08987251077922 A 4 4 0 0 1 157 64 Z"
      ></path>
      <path
        fill="#ff234b"
        filter="url(#trackForegroundInsetShadow3)"
        stroke="#ff234b"
        d="M 157 20 A 4 4 0 0 1 160.99946349592804 16.056733783608024 A 141 141 0 0 1 227.49999999999994 34.89041806639413 A 26 26 0 0 1 227.5 34.89041806639416 A 26 26 0 0 1 201.49999999999997 79.92373906318494 A 89 89 0 0 0 160.9986535046821 68.08987251077922 A 4 4 0 0 1 157 64 Z"
      ></path>
    </svg>
  </div>
</template>

<script setup></script>

<style lang="css" scoped>
.month-picker {
  border-radius: 50%;
  -webkit-tap-highlight-color: transparent;
  aspect-ratio: 1;
  display: flex;
  height: auto;
  max-height: 290px;
  max-width: 290px;
  min-height: 230px;
  min-width: 230px;
  position: relative;
  width: 100%;
  --angle: 90deg;
  --circular-slider-input_height: auto;
  --circular-slider-input_width: 100%;
  container-type: inline-size;
  flex-grow: 0;
  flex-shrink: 1;
}

.month-picker--item-1 {
  background: #e6e6e6;
  border-radius: 50%;
  box-shadow: 0 -5px 5px rgba(0, 0, 0, 0.2), 0 5px 5px #ffffff,
    inset 0 -20px 30px #ffffffe5, inset 0 10px 20px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  height: 100%;
  position: absolute;
  width: 100%;
  -webkit-tap-highlight-color: transparent;
  aspect-ratio: 1;
  display: flex;
  height: auto;
  max-height: 290px;
  max-width: 290px;
  min-height: 230px;
  min-width: 230px;
  position: relative;
  --circular-slider-input_height: auto;
  --circular-slider-input_width: 100%;
}

.month-picker--item-2 {
  filter: blur(5px);
  pointer-events: none;
  position: absolute;
  height: 100%;
  width: 100%;
  --angle: 90deg;
  -webkit-tap-highlight-color: transparent;
  --circular-slider-input_height: auto;
  --circular-slider-input_width: 100%;

  --big-search-form_background: #ebebeb, red;
  --big-search-button_background_hover: #dddddd;
  --big-search-input-button_color: #222222;
  color: #222222;
  --big-search-form_background_active: #ebebeb;
  --query-input_flex: 1.25 0 0%;
  --input-with-search-button_flex: 1 0 0%;
  --split-date-input_flex: 1 0 0%;
  text-align: left;
  --header_brand-color: #ff385c;
  --explore_padding-inline: 40px;
  --explore-nav_padding-block-start: 20px;
  --page-shell-max-content-width: 2520px;
  --gp-sidebar-top-padding: 0;
}

.month-picker--item-2:before {
  border-radius: 50%;
  background: conic-gradient(
    from -33deg at 50% 50%,
    transparent 0deg,
    rgba(255, 0, 46, 0.4) 52deg,
    rgba(255, 0, 46, 0.4) calc(var(--angle) / 2 + 38deg),
    transparent calc(var(--angle) / 2 + 38deg + 0.5deg),
    transparent 100%
  );
  content: "";
  height: 100%;
  position: absolute;
  width: 100%;
  pointer-events: none;
  --angle: 90deg;
  -webkit-tap-highlight-color: transparent;
  --circular-slider-input_height: auto;
  --circular-slider-input_width: 100%;

  --big-search-form_background: #ebebeb, red;
  --big-search-button_background_hover: #dddddd;
  --big-search-input-button_color: #222222;
  --big-search-form_background_active: #ebebeb;
  --query-input_flex: 1.25 0 0%;
  --input-with-search-button_flex: 1 0 0%;
  text-align: left;
  --header_brand-color: #ff385c;
  --explore_padding-inline: 40px;
  --explore-nav_padding-block-start: 20px;
  --page-shell-max-content-width: 2520px;
  --gp-sidebar-top-padding: 0;
  --split-date-input_flex: 1 0 0%;
}

.month-picker--item-2:after {
  border-radius: 50%;
  background: conic-gradient(
    from calc((var(--angle) / 2) + 5deg - 0.5deg) at 50% 50%,
    rgba(255, 0, 46, 0.4) 0deg,
    rgba(255, 0, 46, 0.4) calc((var(--angle) / 2) + 2deg),
    transparent calc(var(--angle) / 2 + 35deg),
    transparent 100%
  );
  content: "";
  height: 100%;
  position: absolute;
  width: 100%;
  --angle: 90deg;
  -webkit-tap-highlight-color: transparent;
  --circular-slider-input_height: auto;
  --circular-slider-input_width: 100%;
  --search-input-detail-panel-transition-name: search-input-detail-panel-dates;
  --big-search-form_background: #ebebeb, red;
  --big-search-button_background_hover: #dddddd;
  --big-search-input-button_color: #222222;
  --big-search-form_background_active: #ebebeb;
  --query-input_flex: 1.25 0 0%;
  --input-with-search-button_flex: 1 0 0%;
  --split-date-input_flex: 1 0 0%;
  text-align: left;
  --header_brand-color: #ff385c;
  --page-shell-max-content-width: 2520px;
  --gp-sidebar-top-padding: 0;
  --explore-nav_box-shadow-spread: 4px;
  --explore_padding-inline: 40px;
  --explore-nav_padding-block-start: 20px;
}

.month-picker--item-3 {
  background: #f7f7f7;
  border-radius: 50%;
  box-shadow: 0 -5px 5px rgba(255, 255, 255, 0.4),
    inset 0 5px 3px rgba(255, 255, 255, 0.8),
    inset 0 -5px 5px rgba(0, 0, 0, 0.2), 0 11px 18px rgba(0, 0, 0, 0.18),
    0 -20px 30px rgba(255, 255, 255, 0.8);
  right: 60px;
  left: 60px;
  text-align: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  top: 60px;
  bottom: 60px;
  justify-content: center;
  overflow: hidden;
  position: absolute;
  -webkit-user-select: none;
  user-select: none;
  --angle: 90deg;
  --circular-slider-input_height: auto;
  --circular-slider-input_width: 100%;
  --big-search-form_background: #ebebeb, red;
  --big-search-button_background_hover: #dddddd;
  --big-search-input-button_color: #222222;
  --big-search-form_background_active: #ebebeb;
  --query-input_flex: 1.25 0 0%;
  --input-with-search-button_flex: 1 0 0%;
  --split-date-input_flex: 1 0 0%;
  --header_brand-color: var(--ihf-tp-q);
  --explore_padding-inline: 40px;
  --explore-nav_padding-block-start: 20px;
}

.month-picker--item-3--el-1 {
  background: #f7f7f7;
  border-radius: 50%;
  font-size: 76px;
  line-height: 76px;
  text-align: center;
}

.month-picker--item-3--el-2 {
  font-size: 12px;
  line-height: 16px;
  --monthly-stays-dial_output-value-font-size: 96px;
  --monthly-stays-dial_output-value-line-height: 89px;

  color: #222222;
  font-weight: 800;
  text-align: center;
  -webkit-tap-highlight-color: transparent;
  --circular-slider-input_height: auto;
  --circular-slider-input_width: 100%;
  --big-search-button_background_hover: #dddddd;
  --big-search-input-button_color: #222222;
  --big-search-form_background_active: #ebebeb;
  --query-input_flex: 1.25 0 0%;
  --input-with-search-button_flex: 1 0 0%;
  --split-date-input_flex: 1 0 0%;
  --header_brand-color: #ff385c;
  --explore_padding-inline: 40px;
  --explore-nav_padding-block-start: 20px;
  --page-shell-max-content-width: 2520px;
  --gp-sidebar-top-padding: 0;
  --explore-nav_box-shadow-spread: 4px;
}

.month-picker--item-4 {
  left: 50%;
  transform: translate(-50%, 8px) rotate(90deg);
  cursor: grab;
  margin: 0;
  transform-origin: center bottom;
  height: calc(50% + -8px);
  pointer-events: none;
  position: absolute;
  top: 0;
  touch-action: none;
  width: 44px;
  z-index: 2;
  outline: none;
  -webkit-tap-highlight-color: transparent;
  color: #222222;
  text-align: left;
}

.month-picker--item-4::before {
  right: 0;
  transform: rotate(calc(-1 * 90deg));
  background: #e9e9e9;
  border-radius: 50%;
  box-shadow: 0 2px 2px rgba(225, 0, 35, 0.5),
    inset 0 -1px 2px rgba(0, 0, 0, 0.35), inset 0 2px 2px #ffffff;
  transition: scale 0.2s cubic-bezier(0.2, 0, 0, 1);
  content: "";
  height: 44px;
  pointer-events: auto;
  position: absolute;
  width: 44px;
  cursor: grab;
  text-align: left;
}

.month-picker--item-4::after {
  background: linear-gradient(180deg, #d5d5d5 0%, #ffffff 83.75%);
  transform: translate(2px, 2px) rotate(calc(-1 * 90deg));
  border-radius: 50%;
  transition: scale 0.2s cubic-bezier(0.2, 0, 0, 1);
  content: "";
  height: 40px;
  pointer-events: auto;
  position: absolute;
  width: 40px;
}

.dot-1 {
  top: 45.4071px;
  left: 202.5px;
  background: transparent;
  border-radius: 50%;
  border: 0;
  cursor: pointer;
  margin: 0;
  padding: 0;
  height: 48px;
  position: absolute;
  transform: translate(-50%, -50%);
  width: 48px;
  outline: none;
}

.dot::before {
  background: #717171;
  border-radius: 50%;
  content: "";
  display: block;
  height: 4px;
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 4px;
}

.dot-2 {
  top: 87.5px;
  left: 244.593px;
  background: transparent;
  border-radius: 50%;
  border: 0;
  cursor: pointer;
  margin: 0;
  padding: 0;
  height: 48px;
  position: absolute;
  transform: translate(-50%, -50%);
  width: 48px;
  outline: none;
}

.dot-3 {
  top: 145px;
  left: 260px;
  background: transparent;
  border-radius: 50%;
  border: 0;
  cursor: pointer;
  margin: 0;
  padding: 0;
  height: 48px;
  position: absolute;
  transform: translate(-50%, -50%);
  width: 48px;
  outline: none;
}

.dot-4 {
  top: 202.5px;
  left: 244.593px;
  background: transparent;
  border-radius: 50%;
  border: 0;
  cursor: pointer;
  margin: 0;
  padding: 0;
  height: 48px;
  position: absolute;
  transform: translate(-50%, -50%);
  width: 48px;
  outline: none;
}

.dot-5 {
  top: 244.593px;
  left: 202.5px;
  background: transparent;
  border-radius: 50%;
  border: 0;
  cursor: pointer;
  margin: 0;
  padding: 0;
  height: 48px;
  position: absolute;
  transform: translate(-50%, -50%);
  width: 48px;
  outline: none;
}

.dot-6 {
  top: 260px;
  left: 145px;
  background: transparent;
  border-radius: 50%;
  border: 0;
  cursor: pointer;
  margin: 0;
  padding: 0;
  height: 48px;
  position: absolute;
  transform: translate(-50%, -50%);
  width: 48px;
  outline: none;
}

.dot-7 {
  top: 244.593px;
  left: 87.5px;
  background: transparent;
  border-radius: 50%;
  border: 0;
  cursor: pointer;
  margin: 0;
  padding: 0;
  height: 48px;
  position: absolute;
  transform: translate(-50%, -50%);
  width: 48px;
  outline: none;
}

.dot-8 {
  top: 202.5px;
  left: 45.4071px;
  background: transparent;
  border-radius: 50%;
  border: 0;
  cursor: pointer;
  margin: 0;
  padding: 0;
  height: 48px;
  position: absolute;
  transform: translate(-50%, -50%);
  width: 48px;
  outline: none;
}

.dot-9 {
  top: 145px;
  left: 30px;
  background: transparent;
  border-radius: 50%;
  border: 0;
  cursor: pointer;
  margin: 0;
  padding: 0;
  height: 48px;
  position: absolute;
  transform: translate(-50%, -50%);
  width: 48px;
  outline: none;
}

.dot-10 {
  top: 87.5px;
  left: 45.4071px;
  background: transparent;
  border-radius: 50%;
  border: 0;
  cursor: pointer;
  margin: 0;
  padding: 0;
  height: 48px;
  position: absolute;
  transform: translate(-50%, -50%);
  width: 48px;
  outline: none;
}

.dot-11 {
  top: 45.4071px;
  left: 87.5px;
  background: transparent;
  border-radius: 50%;
  border: 0;
  cursor: pointer;
  margin: 0;
  padding: 0;
  height: 48px;
  position: absolute;
  transform: translate(-50%, -50%);
  width: 48px;
  outline: none;
}

.dot-12 {
  top: 30px;
  left: 145px;
  background: transparent;
  border-radius: 50%;
  border: 0;
  cursor: pointer;
  margin: 0;
  padding: 0;
  height: 48px;
  position: absolute;
  transform: translate(-50%, -50%);
  width: 48px;
  outline: none;
}

.bar {
  right: -12px;
  left: -12px;
  height: calc(100% + 12px * 2);
  top: -12px;
  bottom: -12px;
  pointer-events: none;
  position: absolute;
  width: calc(100% + 12px * 2);
  -webkit-tap-highlight-color: transparent;
  text-align: left;
}
</style>
