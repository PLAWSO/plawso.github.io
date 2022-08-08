class DefValues {
  constructor() {
    this.vSpace = 650  // vertical distance between strips, px
    this.hSpace = 900  // horizontal distance between panels, px

    this.zoom = 1           // panel size when in view, %
    this.zoomOffset = 0.15 // amount to zoom out of panels, %
    this.zoomTime = 200    // time spent zooming panels, ms

    this.vTime = 500     // time spent sliding between strips, ms
    this.vaTime = 240    // time spent accelerating during strip slide, ms, < 0.5 * STRIP_SLIDE_TIME
    this.hTime = 300     // time spent sliding between panels, ms
    this.haTime = 140   // time spent accelerating during panel slide, ms, < 0.5 * PANEL_SLIDE_TIME
    this.ztOverlap = 100 // time zoom and slide are allowed to overlap, ms

    this.vaTimeSliderMax = 240
    this.haTimeSliderMax = 140
  }
}