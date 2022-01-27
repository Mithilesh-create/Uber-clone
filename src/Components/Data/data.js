class RidesClass {
  constructor(id, title, description, reachtime, srcimg,price) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.reachtime = reachtime;
    this.srcimg = srcimg;
    this.price = price;
  }
}

export const RidesData = [
  new RidesClass(
    "1",
    "Short",
    "Get an goto vehical at your doorstep",
    "6",
    "https://bit.ly/3fLQEW7",
    "56"
  ),
  new RidesClass(
    "2",
    "Micro",
    "Small fares for short rides",
    "4",
    "https://bit.ly/3fQ8SFG",
    "86"
  ),
  new RidesClass(
    "3",
    "Mini",
    "Comfy hatchbacks at pocket-friendly fares",
    "4",
    "https://bit.ly/3rGHcbV",
    "103"
  ),
  new RidesClass(
    "4",
    "Share",
    "Pay less by sharing a cab going your way",
    "2",
    "https://bit.ly/3fLQEW7",
    "126"
  ),
  new RidesClass(
    "5",
    "Prime Sedan",
    "Sedans with free wifi and top drivers",
    "2",
    "https://bit.ly/3rGHcbV",
    "223"
  ),
  new RidesClass(
    "6",
    "Luxary Sedan",
    "Most comfortable ride on limousine",
    "7",
    "https://bit.ly/3fQ8SFG",
    "230"
  ),
  new RidesClass(
    "7",
    "Black",
    "Most secure ride with highest safety",
    "13",
    "https://bit.ly/3Isu155",
    "540"
  ),
];
