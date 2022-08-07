class DefValues {
  constructor() {
    // -- SPACING ---------------------------------------------------------------------------------------------------------
    this.V_SPACE = 650;  // vertical distance between strips, px
    this.H_SPACE = 900;  // horizontal distance between panels, px
    this.PB_SPACE = 35;  // horizontal distance between panel buttons, px

    // -- ZOOM ------------------------------------------------------------------------------------------------------------
    this.ZOOM = 1;           // panel size when in view, %
    this.ZOOM_OFFSET = 0.15; // amount to zoom out of panels, %
    this.ZOOM_TIME = 200;    // time spent zooming panels, ms

    // -- TRANSITIONS -----------------------------------------------------------------------------------------------------
    this.V_TIME = 500;     // time spent sliding between strips, ms
    this.VA_TIME = 240;    // time spent accelerating during strip slide, ms, < 0.5 * STRIP_SLIDE_TIME
    this.H_TIME = 300;     // time spent sliding between panels, ms
    this.HA_TIME = 140;    // time spent accelerating during panel slide, ms, < 0.5 * PANEL_SLIDE_TIME
    this.ZT_OVERLAP = 100; // time zoom and slide are allowed to overlap, ms
  }
}