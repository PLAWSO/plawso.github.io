/*

// -- SPACING ---------------------------------------------------------------------------------------------------------
const V_SPACE_DEFAULT = 650;  // vertical distance between strips, px
const H_SPACE_DEFAULT = 900;  // horizontal distance between panels, px
const PB_SPACE_DEFAULT = 35;  // horizontal distance between panel buttons, px

// -- ZOOM ------------------------------------------------------------------------------------------------------------
const ZOOM_DEFAULT = 1;           // panel size when in view, %
const ZOOM_OFFSET_DEFAULT = 0.15; // amount to zoom out of panels, %
const ZOOM_TIME_DEFAULT = 200;    // time spent zooming panels, ms

// -- TRANSITIONS -----------------------------------------------------------------------------------------------------
const V_TIME_DEFAULT = 500;     // time spent sliding between strips, ms
const VA_TIME_DEFAULT = 240;    // time spent accelerating during strip slide, ms, < 0.5 * STRIP_SLIDE_TIME
const H_TIME_DEFAULT = 300;     // time spent sliding between panels, ms
const HA_TIME_DEFAULT = 140;    // time spent accelerating during panel slide, ms, < 0.5 * PANEL_SLIDE_TIME
const ZT_OVERLAP_DEFAULT = 100; // time zoom and slide are allowed to overlap, ms

// -- PANEL SHADOW ----------------------------------------------------------------------------------------------------
const P_SHADOW_SPREAD_DEFAULT = 10;                   // max amount of panel shadow spread, px
const P_SHADOW_SPREAD_OFFSET_DEFAULT = 10;            // amount of shadow subtracted from panel, px
const P_SHADOW_BLUR_DEFAULT = 15;                     // amount of panel shadow blur, px
const P_SHADOW_COLOR_DEFAULT = "rgba(0, 0, 0, 0.25)"; // color of panel shadow

// -- DOM ELEMENTS ----------------------------------------------------------------------------------------------------
const TREE =                        // dom element for tree
document.getElementById("stripTree");

const STRIPS =                      // array w dom e for each strip
document.getElementsByClassName("strip");

const PANELS =                      // 2d array w dom e for each panel, sorted by strip[x]
CollectPanels();

const STRIP_BUTTONS =               // array w dom e for each strip button
document.getElementsByClassName("stripButton");

const PANEL_BUTTON_ZOOM_ALIGNERS =  // array w dom e for divs that control panel button zoom
document.getElementsByClassName("buttonZoomAligner");

const PANEL_BUTTON_ALIGNERS =       // array w dom e for divs that algin panel buttons
document.getElementsByClassName("buttonAligner");

const PANEL_BUTTONS =               // 2d array w dom e for each panel button, sorted by strip[x]
CreatePanelButtons();

// -- COORDINATION VARIABLES, NO TOUCHY! ------------------------------------------------------------------------------
var CURRENT_STRIP;  // strip currently in view
var CURRENT_PANEL;  // current panel on strip[x]
var SLIDE_INPRO;    // true if any slide is currently in progress
var V_SPACE;
var H_SPACE;
var PB_SPACE;
var ZOOM;
var ZOOM_OFFSET;
var ZOOM_TIME;
var V_TIME;
var VA_TIME;
var H_TIME;
var HA_TIME;
var ZT_OVERLAP;
var P_SHADOW_SPREAD;
var P_SHADOW_SPREAD_OFFSET;
var P_SHADOW_BLUR;
var P_SHADOW_COLOR;

*/