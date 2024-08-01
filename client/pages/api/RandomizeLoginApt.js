import React from 'react'

function getRandomFurnitureSet(furnitureSets) {
    const index = Math.floor(Math.random() * furnitureSets.length);
    return furnitureSets[index];
}

function RandomizeLoginApt() {
    // apt01 = base, apt02 = low val...
    const aptBaseSets = ["/images/apt_images/apt01_base.png"]; 
    const aptBedroomSets = ["/images/apt_images/apt01_bedroom.png", "/images/apt_images/apt02_bedroom.png"];
    const aptEntranceSets = ["/images/apt_images/apt01_entrance.png", "/images/apt_images/apt02_entrance.png"];
    const aptKitchenSets = ["/images/apt_images/apt01_kitchen.png", "/images/apt_images/apt02_kitchen.png"];
    const aptLivingRoomSets = ["/images/apt_images/apt01_livingroom.png", "/images/apt_images/apt02_livingroom.png"];
    const aptOfficeSets = ["/images/apt_images/apt01_office.png", "/images/apt_images/apt02_office.png"];
    const aptWindowsSets = ["/images/apt_images/apt01_windows.png", "/images/apt_images/apt02_windows.png"]; // Will we have different window sets?

    return {
        randomAptBase: aptBaseSets[0],
        randomAptBedroom: getRandomFurnitureSet(aptBedroomSets),
        randomAptEntrance: getRandomFurnitureSet(aptEntranceSets),
        randomAptKitchen: getRandomFurnitureSet(aptKitchenSets),
        randomAptLivingRoom: getRandomFurnitureSet(aptLivingRoomSets),
        randomAptOffice: getRandomFurnitureSet(aptOfficeSets),
        randomAptWindows: getRandomFurnitureSet(aptWindowsSets)
    };
}

export default RandomizeLoginApt