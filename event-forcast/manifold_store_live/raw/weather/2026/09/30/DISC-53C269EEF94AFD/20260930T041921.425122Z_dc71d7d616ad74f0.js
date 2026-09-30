// image_scripts_scripts.js
//
// JavaScript functions and handlers used by Image_body.php
//
// Part of in-line JavaScript remediation of MAG
//
// Created 2025-01 by Jake Zappin

IMAGE_HEIGHT = 0;
IMAGE_WIDTH = 0;

var cycleDatesArr = [];

document.addEventListener('DOMContentLoaded', function() {

    const jsSettingsElement = document.getElementById("jsSettings");

    const settings = jsSettingsElement 
        ? JSON.parse(jsSettingsElement.textContent) 
        : {};
        
    if(settings){
    
        // Set global variables using var
        my_server = settings.my_server;
        current_index = settings.current_index;
        imagepath_format1 = settings.imagepath_format1;
        imagepath_format2 = settings.imagepath_format2;
        g_cycle = settings.g_cycle;
        cluster = settings.cluster;
        cyclesFhrsArr = settings.cyclesFhrsArr;
        for (const key in cyclesFhrsArr) {
            cyclesFhrsArr[key] = cyclesFhrsArr[key].map(item => item.replace(/'/g, ""));
        }
        use_mins = settings.use_mins;
        area = settings.area;
        model = settings.model;
        param = settings.param;
        num_images = settings.num_images;

        cycleArr = settings.cycleArr;
        g_fhr = settings.g_fhr;
    }

    const imageSettingsElement = document.getElementById('imageSettings');
    if (imageSettingsElement) {
        const imageSettings = JSON.parse(imageSettingsElement.textContent);
        IMAGE_WIDTH = imageSettings.imageWidth;
        IMAGE_HEIGHT = imageSettings.imageHeight;
    }

    const cycleSelect = document.getElementById('cycle_sel');
    if (cycleSelect) {

        cycleSelect.addEventListener('change', function() {

            const cycleArray = JSON.parse(cycleSelect.getAttribute("data-cycle-array") || "[]");

            // Loop through cycleArray to create and populate cycleDatesArr
            cycleArray.forEach((eachCycle) => {
                if (eachCycle) {

                    // Split the date and hour
                    const spaceIndex = eachCycle.indexOf(" ");
                    const dateStr = eachCycle.substring(0, spaceIndex); // e.g., "02/03/2021"
                    const hourStr = eachCycle.substring(spaceIndex + 1, spaceIndex + 3); // e.g., "18"

                    // Extract MM, DD, YYYY from the dateStr
                    const [mm, dd, yyyy] = dateStr.split("/");

                    // Create a Date object
                    const dateObj = new Date(Date.UTC(yyyy, mm - 1, dd, hourStr));

                    // Add the Date object to cycleDatesArr
                    cycleDatesArr.push(dateObj);
                }
            });

            changeCycle(this.value, this.selectedIndex);
        });
    }

    const prevCycleBtn = document.getElementById("prevCycleBtn");
    if (prevCycleBtn) {
        prevCycleBtn.addEventListener("click", () => {

            const cycleArray = JSON.parse(prevCycleBtn.getAttribute("data-cycle-array") || "[]");

            // Loop through cycleArray to create and populate cycleDatesArr
            cycleArray.forEach((eachCycle) => {
                if (eachCycle) {

                    // Split the date and hour
                    const spaceIndex = eachCycle.indexOf(" ");
                    const dateStr = eachCycle.substring(0, spaceIndex); // e.g., "02/03/2021"
                    const hourStr = eachCycle.substring(spaceIndex + 1, spaceIndex + 3); // e.g., "18"

                    // Extract MM, DD, YYYY from the dateStr
                    const [mm, dd, yyyy] = dateStr.split("/");

                    // Create a Date object
                    const dateObj = new Date(Date.UTC(yyyy, mm - 1, dd, hourStr));

                    // Add the Date object to cycleDatesArr
                    cycleDatesArr.push(dateObj);
                }
            });

            PrevCycle();
        });
    }

    const nextCycleBtn = document.getElementById("nextCycleBtn");
    if (nextCycleBtn) {
        nextCycleBtn.addEventListener("click", () => {

            const cycleArray = JSON.parse(nextCycleBtn.getAttribute("data-cycle-array") || "[]");

            // Loop through cycleArray to create and populate cycleDatesArr
            cycleArray.forEach((eachCycle) => {
                if (eachCycle) {

                    // Split the date and hour
                    const spaceIndex = eachCycle.indexOf(" ");
                    const dateStr = eachCycle.substring(0, spaceIndex); // e.g., "02/03/2021"
                    const hourStr = eachCycle.substring(spaceIndex + 1, spaceIndex + 3); // e.g., "18"

                    // Extract MM, DD, YYYY from the dateStr
                    const [mm, dd, yyyy] = dateStr.split("/");

                    // Create a Date object
                    const dateObj = new Date(Date.UTC(yyyy, mm - 1, dd, hourStr));

                    // Add the Date object to cycleDatesArr
                    cycleDatesArr.push(dateObj);
                }
            });

            NextCycle();
        });
    }

    const backButton = document.querySelector(".nav_button[data-back-target]");
    if (backButton) {
        backButton.addEventListener("click", function () {

            const backTarget = JSON.parse(this.getAttribute("data-back-target"));

            if (backTarget && backTarget.function && Array.isArray(backTarget.params)) {
                if (typeof window[backTarget.function] === "function") {
                    window[backTarget.function](...backTarget.params);
                } else {
                    console.error(`Function ${backTarget.function} is not defined.`);
                }
            } else {
                console.error("Invalid back target data.");
            }
        });
    }

    const modelButton = document.querySelector(".nav_button[data-model-target]");
    if (modelButton) {
        modelButton.addEventListener("click", function () {

            const targetData = JSON.parse(this.getAttribute("data-model-target"));

            if (targetData && targetData.function) {
                const func = targetData.function;
                const params = targetData.params || [];

                if (typeof window[func] === "function") {
                    window[func](...params);
                } else {
                    console.error(`Function "${func}" is not defined.`);
                }
            } else {
                console.error("Invalid target data for the button.");
            }
        });
    }

    const prevLink = document.getElementById("prevLink");
    if (prevLink) {
        prevLink.addEventListener("click", function (event) {
            event.preventDefault(); 
            prev();
        });
    }

    const nextLink = document.getElementById("nextLink");
    if (nextLink) {
        nextLink.addEventListener("click", function (event) {
            event.preventDefault();
            next();
        });
    }

    const homeButton = document.getElementById("homeButton");
    if (homeButton) {
        homeButton.addEventListener("click", function (event) {
            event.preventDefault();
            goHome();
        });
    }

    const resetZoomButton = document.getElementById("resetZoomButton");
    if (resetZoomButton) {
        resetZoomButton.addEventListener("click", function () {
            HAniS.resetZoom();
        });
    }

    const pageHelpButton = document.getElementById("pageHelpButton");
    if (pageHelpButton) {
        pageHelpButton.addEventListener("click", function () {
            const modalId = this.getAttribute("data-modal-id"); 
            if (modalId) {
                openModalBox(modalId);
            }
        });
    }

    const productDescriptionButton = document.getElementById("productDescriptionButton");
    if (productDescriptionButton) {
        productDescriptionButton.addEventListener("click", function () {
            const modalId = this.getAttribute("data-modal-id");
            if (modalId) {
                openModalBox(modalId);
            }
        });
    }

    const prevLinkOA = document.getElementById("prevLinkOA");
    if (prevLinkOA) {
        prevLinkOA.addEventListener("click", function (event) {
            event.preventDefault();
            prev();
        });
    }

    const nextLinkOA = document.getElementById("nextLinkOA");
    if (nextLinkOA) {
        nextLinkOA.addEventListener("click", function (event) {
            event.preventDefault();
            next();
        });
    }

    const infoModalContent = document.getElementById("more_info_div");
    if (infoModalContent) {
        infoModalContent.addEventListener("click", function () {
            closeModalBox("more_info_div_id");
        });
    }

    const hanisModalContent = document.getElementById("hanis_help_div");
    if (hanisModalContent) {
        hanisModalContent.addEventListener("click", function () {
            closeModalBox("hanis_help_div_id");
        });
    }

});