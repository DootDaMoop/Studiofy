import React from 'react'

function getRandomFurnitureSet(furnitureSets) {
    const index = Math.floor(Math.random() * furnitureSets.length);
    return furnitureSets[index];
}

function RandomizeLoginApt() {
    const aptWallFloorSets = ["/images/apt_images/wallfloor/wallfloor-0.00-0.34.png","/images/apt_images/wallfloor/wallfloor-0.35-0.49.png","/images/apt_images/wallfloor/wallfloor-0.50-0.64.png","/images/apt_images/wallfloor/wallfloor-0.65-1.00.png"]; 
    const aptBedroomSets = ["/images/apt_images/bedroom/bedroom-0.00-0.34.png","/images/apt_images/bedroom/bedroom-0.50-0.64.png","/images/apt_images/bedroom/bedroom-0.65-1.00.png"];
    const aptEntranceSets = ["/images/apt_images/entrance/entrance-0.00-0.34.png", "/images/apt_images/entrance/entrance-0.65-1.00.png"];
    const aptKitchenSets = ["/images/apt_images/kitchen/kitchen-0.00-0.34.png","/images/apt_images/kitchen/kitchen-0.35-0.49.png","/images/apt_images/kitchen/kitchen-0.50-0.64.png","/images/apt_images/kitchen/kitchen-0.65-1.00.png"];
    const aptLivingRoomSets = ["/images/apt_images/livingroom/living-0.50-0.64.png"];
    const aptOfficeSets = ["/images/apt_images/office/office-0.00-0.34.png", "/images/apt_images/office/office-0.35-0.49.png"];
    const aptLightingSets = ["/images/apt_images/lighting/lighting-0.00-0.34.png","/images/apt_images/lighting/lighting-0.35-0.49.png","/images/apt_images/lighting/lighting-0.50-0.64.png","/images/apt_images/lighting/lighting-0.65-1.00.png"];

    return {
        randomAptWallFloor: getRandomFurnitureSet(aptWallFloorSets),
        randomAptBedroom: getRandomFurnitureSet(aptBedroomSets),
        randomAptEntrance: getRandomFurnitureSet(aptEntranceSets),
        randomAptKitchen: getRandomFurnitureSet(aptKitchenSets),
        randomAptLivingRoom: getRandomFurnitureSet(aptLivingRoomSets),
        randomAptOffice: getRandomFurnitureSet(aptOfficeSets),
        randomAptLighting: getRandomFurnitureSet(aptLightingSets)
    };
}

export default RandomizeLoginApt