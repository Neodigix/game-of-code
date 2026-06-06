class ShopItem{
  constructor(name, text, cost, example, shopDiv, num) {
    this.name = name;
    this.text = text;
    this.cost = cost;
    this.example = example;
    this.shopDiv = shopDiv;
    this.num = num;
    this.mainDiv = document.createElement('div');
    this.mainDiv.className = 'shop-item';
    
    this.buttonDiv = document.createElement('div');
    this.buttonDiv.className = 'shop-item-btn';
    this.checkbox = document.createElement("input");
    this.checkbox.type = "checkbox";
    this.checkbox.onclick = function(){
        shop.click(num);
    };
    this.buttonDiv.appendChild(this.checkbox);
    
    this.costDiv = document.createElement('div');
    this.costDiv.className = 'shop-item-cost';
    this.costDiv.innerHTML = this.cost;
    
    this.descriptionDiv = document.createElement('div');
    this.descriptionDiv.className = 'shop-item-description';
    this.descriptionDiv.innerHTML = this.text;
    
    this.mainDiv.appendChild(this.buttonDiv);
    this.mainDiv.appendChild(this.costDiv);
    this.mainDiv.appendChild(this.descriptionDiv);
    this.shopDiv.appendChild(this.mainDiv);
    this.active = false;
  }
  update() {
    this.checkbox.checked = this.active; 
    if (this.active) {
      decorationMap[this.name] = 'hlOk';
    }
    else {
      decorationMap[this.name] = 'hlError';
    }
  }
}

class Shop{
  constructor(money, shopDiv, optionNames=[]) {
    this.money = money;
    this.options = [];
    this.shopDiv = shopDiv;
    for (let i = 0; i < optionNames.length; i++){
      const opt = shop_options[optionNames[i]];
      this.options.push(
        new ShopItem(
          opt['name'],
          opt['text'],
          opt['cost'],
          opt['example'],
          shopDiv,
          i
        )
      );
    }
  }
  updateState() {
    for (let i = 0; i < this.options.length; i++) {
      this.options[i].update();
    }
    updateH();
  }
  buy(num) {
    if (this.options[num].active) {
      this.updateState();
      return;
    }
    let moneyLeft = this.money;
    for (let i = 0; i < this.options.length; i++){
      if (this.options[i].active) {
        moneyLeft -= this.options[i].cost;
      }
    }
    if (moneyLeft >= this.options[num].cost) {
      this.options[num].active = true;
    }
    this.updateState();
  }
  sell(num) {
    this.options[num].active = false;
    this.updateState();
  }
  click(num) {
    if (this.options[num].active) {
      this.sell(num);
    }
    else {
      this.buy(num);
    }
  }
}

let shop = null;
document.addEventListener("DOMContentLoaded", () => {
  shop = new Shop(
    4,
    document.getElementById('shop-container'),
    ['x', 'y', 'nearestFood']
  );
});
