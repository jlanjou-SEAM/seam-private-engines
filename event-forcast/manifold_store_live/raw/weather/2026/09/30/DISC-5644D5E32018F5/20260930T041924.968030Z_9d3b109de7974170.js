// index_scripts.js
//
// JavaScript functions and handlers used by by index_body.php
//
// Part of in-line JavaScript remediation of MAG
//
// Created 2025-01 by Jake Zappin

document.addEventListener("DOMContentLoaded", function () {
    const worldMap = document.getElementById("world_map_id");
    if (worldMap) {
        worldMap.addEventListener("click", function () {
            alert("Select Model Guidance, Observations and Analyses, Tropical Guidance, or Forecast Soundings");
        });
    }
});