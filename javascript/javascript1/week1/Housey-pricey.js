function houseVolume(house) {
    return house.width * house.height * house.depth;
}

function housePrice(house) {
    const volumeInMeters = houseVolume(house);
    return volumeInMeters * 2.5 * 1000 + house.gardenSizeInM2 * 300;
}

function estimate(house) {
    const personHousePrice = housePrice(house);
    if (personHousePrice < house.marketHousePrice) {
        console.log('You are paying too much, ' + house.name);
    }
    else {
        console.log('You are paying too little, ' + house.name); 
    }
}

const petersHouse = {
    name: 'Peter',
    width: 8,
    height: 10,
    depth: 10,
    gardenSizeInM2: 100,
    marketHousePrice: 2500000,
};

const juliasHouse = {
    name: 'Julia',
    width: 5,
    height: 11,
    depth: 8,
    gardenSizeInM2: 70,
    marketHousePrice: 1000000,
};

const houses = [petersHouse, juliasHouse];
for (let i = 0; i < houses.length; i++) {
    const house = houses[i];
    estimate(house);  
}