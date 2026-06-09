<template>
  <svg class="hidden sm:block absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1200 650" fill="none" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
    <!-- Left: 3 vertical cables -->
    <path pathLength="1000" d="M 60 750 C 58 500 62 250 60 -50" class="cable-line" />
    <path pathLength="1000" d="M 110 750 C 108 500 112 250 110 -50" class="cable-line" />
    <path pathLength="1000" d="M 160 750 C 158 500 162 250 160 -50" class="cable-line" />
    <!-- Left: horizontal branches -->
    <path pathLength="1000" d="M -60 200 C 20 200 60 200 110 200" class="cable-line" />
    <path pathLength="1000" d="M -60 430 C 30 430 100 430 160 430" class="cable-line" />

    <!-- Right: 3 vertical cables -->
    <path pathLength="1000" d="M 1040 750 C 1038 500 1042 250 1040 -50" class="cable-line" />
    <path pathLength="1000" d="M 1090 750 C 1088 500 1092 250 1090 -50" class="cable-line" />
    <path pathLength="1000" d="M 1140 750 C 1138 500 1142 250 1140 -50" class="cable-line" />
    <!-- Right: horizontal branches -->
    <path pathLength="1000" d="M 1040 310 C 1090 310 1160 310 1260 310" class="cable-line" />
    <path pathLength="1000" d="M 1090 520 C 1120 520 1200 520 1260 520" class="cable-line" />

    <!-- Flowing data — left verticals -->
    <path pathLength="1000" d="M 60 750 C 58 500 62 250 60 -50" class="cable-data" style="animation-duration:3.2s;animation-delay:0s" />
    <path pathLength="1000" d="M 110 750 C 108 500 112 250 110 -50" class="cable-data" style="animation-duration:2.9s;animation-delay:0.8s" />
    <path pathLength="1000" d="M 160 750 C 158 500 162 250 160 -50" class="cable-data" style="animation-duration:3.5s;animation-delay:1.4s" />
    <!-- Flowing data — left horizontals -->
    <path pathLength="1000" d="M -60 200 C 20 200 60 200 110 200" class="cable-data" style="animation-duration:1.8s;animation-delay:0.5s" />
    <path pathLength="1000" d="M -60 430 C 30 430 100 430 160 430" class="cable-data" style="animation-duration:2s;animation-delay:1.2s" />

    <!-- Flowing data — right verticals -->
    <path pathLength="1000" d="M 1040 750 C 1038 500 1042 250 1040 -50" class="cable-data" style="animation-duration:3s;animation-delay:0.3s" />
    <path pathLength="1000" d="M 1090 750 C 1088 500 1092 250 1090 -50" class="cable-data" style="animation-duration:3.4s;animation-delay:1s" />
    <path pathLength="1000" d="M 1140 750 C 1138 500 1142 250 1140 -50" class="cable-data" style="animation-duration:2.7s;animation-delay:0.6s" />
    <!-- Flowing data — right horizontals -->
    <path pathLength="1000" d="M 1040 310 C 1090 310 1160 310 1260 310" class="cable-data" style="animation-duration:1.6s;animation-delay:0.7s" />
    <path pathLength="1000" d="M 1090 520 C 1120 520 1200 520 1260 520" class="cable-data" style="animation-duration:1.9s;animation-delay:1.3s" />
  </svg>
</template>

<style scoped>
.cable-line {
  stroke: rgb(203 213 225 / 0.5);
  stroke-width: 1;
}

:global(.dark) .cable-line {
  stroke: rgb(38 38 38 / 0.9);
}

.cable-data {
  stroke: rgb(99 102 241 / 0.7);
  stroke-width: 1.5;
  stroke-dasharray: 35 965;
  stroke-dashoffset: 1000;
  animation: flowData linear infinite;
}

:global(.dark) .cable-data {
  stroke: rgb(129 140 248 / 0.5);
}

@keyframes flowData {
  from { stroke-dashoffset: 1000; }
  to   { stroke-dashoffset: -50; }
}
</style>
