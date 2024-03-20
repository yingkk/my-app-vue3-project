class CartData {
  private uiGoods: GoodsSKU[];
  private minDeliveryPrice: number; //最低起送价格
  private deliveryPrice: number; //配送费
  constructor(goodsList: Goods[]) {
    this.uiGoods = goodsList.map(
      (t: Goods) => ({ ...t, choose: 0 } as unknown as GoodsSKU)
    );
    this.minDeliveryPrice = 30; //tips 根据接口获取
    this.deliveryPrice = 5;
  }
  // 获取已选择所有商品的总价格
  getTotalPrice(): number {
    return this.uiGoods.reduce((init, cur) => {
      init += cur.getTotalPrice();
      return init;
    }, 0);
  }
  // 增加下标为index商品的数量
  increase(index: number) {
    return this.uiGoods[index].increase();
  }
  // 减少下标为index商品的数量
  decrease(index: number) {
    return this.uiGoods[index].decrease();
  }
  // 获取已选择商品的总数量
  getChooseTotalNum(): number {
    return this.uiGoods.reduce((init, cur) => {
      init += cur.choose;
      return init;
    }, 0);
  }
  //购物车是否有商品
  hasGoodsInCar(): boolean {
    return !!this.getChooseTotalNum();
  }
  //是否达到最低起送标准
  isCrossMinDeliveryPrice(): boolean {
    return this.getTotalPrice() > this.minDeliveryPrice;
  }
}

class GoodsSKU {
  readonly data: Goods;
  choose: number;
  constructor(g: Goods) {
    this.data = g;
    this.choose = 0;
  }
  // 获取当前商品已选的总价格
  getTotalPrice(): number {
    return this.choose * this.data.price;
  }
  // 是否已选该商品
  isChoose(): boolean {
    return !!this.isChoose;
  }
  //添加当前选择的商品
  increase() {
    this.choose++;
  }
  //减少当前选择的商品
  decrease() {
    if (this.choose === 0) {
      return;
    }
    this.choose--;
  }
}

interface Goods {
  pic: string;
  title: string;
  desc: string;
  sellNumber: number;
  favorRate: number;
  price: number;
}

export { CartData };
