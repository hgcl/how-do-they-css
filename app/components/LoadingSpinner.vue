<template>
  <span
    ><svg role="img" viewBox="-16 -16 32 32" width="100%" height="100%">
      <title>Loading page content</title>
      <circle r="9"></circle>
      <circle r="9"></circle>
    </svg>
  </span>
</template>

<style scoped>
span {
  display: block;
  height: 48px;
  width: 48px;
  stroke-width: 1.5px;
}

span > svg {
  display: block;
  fill: none;
  animation: spinner-rotate 1.2s steps(50) infinite;
}

span > svg > circle:first-child {
  stroke: rgb(107, 109, 112);
}

span > svg > circle:last-child {
  animation: spinner-dash 1.2s steps(50) infinite;
  stroke: var(--color-fg-default);
  stroke-dasharray: 57px;
  stroke-linecap: round;
}

@keyframes spinner-rotate {
  0% {
    transform: rotateZ(0deg);
  }
  100% {
    transform: rotateZ(360deg);
  }
}

@keyframes spinner-dash {
  0% {
    stroke-dashoffset: 57;
    transform: rotateZ(0deg);
  }
  50%,
  75% {
    stroke-dashoffset: 20;
    transform: rotateZ(80deg);
  }
  100% {
    stroke-dashoffset: 57;
    transform: rotateZ(360deg);
  }
}
</style>
