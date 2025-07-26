import { configureStore, createSlice } from "@reduxjs/toolkit";

const savedCart = localStorage.getItem("cart");
const localStorageCart = JSON.parse(localStorage.getItem("cart")) || [];
const productsSlice = createSlice({
  name: "products",
  initialState: {
    vegetables: [
      { name: "Beans", price: 50.5, image: "/Vegetables/Beans.jpg" },
      { name: "Brinjal", price: 40.5, image: "/Vegetables/Brinjal.jpg" },
      { name: "BitterGaurd", price: 40.5, image: "/Vegetables/BitterGaurd.jpg" },
      { name: "Cabbage", price: 40.5, image: "/Vegetables/Cabbage.jpg" },
      { name: "Capsicum", price: 40.5, image: "/Vegetables/Capsicum.jpg" },
      { name: "Carrot", price: 60.5, image: "/Vegetables/Carrot.jpg" },
      { name: "Cauli Flower", price: 40.5, image: "/Vegetables/Cauli Flower.jpg" },
      { name: "Corriander", price: 10.5, image: "/Vegetables/Corriander.jpg" },
      { name: "CurryLeaves", price: 10.5, image: "/Vegetables/CurryLeaves.jpg" },
      { name: "Ginger", price: 85.5, image: "/Vegetables/Ginger.jpg" },
      { name: "GreenChilli", price: 80.5, image: "/Vegetables/GreenChilli.jpg" },
      { name: "LadysFinger", price: 40.5, image: "/Vegetables/LadysFinger.jpg" },
      { name: "Lemons", price: 50.5, image: "/Vegetables/Lemons.jpg" },
      { name: "Mushrooms", price: 80.5, image: "/Vegetables/Mushrooms.jpg" },
      { name: "Potato", price: 45.5, image: "/Vegetables/Potato.jpg" },
      { name: "Radish", price: 40.5, image: "/Vegetables/Radish.jpg" },
      { name: "Red Cabbage", price: 40.5, image: "/Vegetables/Red Cabbage.jpg" },
      { name: "Cucumber", price: 40.5, image: "/Vegetables/Cucumber.jpg" },
      { name: "Pumpkin", price: 80.5, image: "/Vegetables/Pumpkin.jpg" },
      { name: "Red Onions", price: 40.5, image: "/Vegetables/Red Onions.jpg" },
      { name: "RedChilli", price: 80.5, image: "/Vegetables/RedChilli.jpg" },
      { name: "Spinach", price: 40.5, image: "/Vegetables/Spinach.jpg" },
      { name: "Tomato", price: 40.5, image: "/Vegetables/Tomato.jpg" },
      { name: "SweetCorn", price: 40.5, image: "/Vegetables/SweetCorn.jpg" },
      { name: "White Onions", price: 40.5, image: "/Vegetables/White Onions.jpg" },
    ],
    frozenFood: [
      { name: "Chicken Momos", price: 130.5, image: "/Frozen Food/Chicken Momos.jpg" },
      { name: "Crunchy Chicken Nuggets", price: 150.5, image: "/Frozen Food/Chicken Nuggets.jpg" },
      { name: "Chicken Burger Patty", price: 100.5, image: "/Frozen Food/Chicken Burger Patty.jpg" },
      { name: "Chicken Cheese Sausages", price: 120.5, image: "/Frozen Food/Chicken Cheese Sausages.jpg" },
      { name: "Chicken Ham", price: 120.5, image: "/Frozen Food/Chicken Ham.jpg" },
      { name: "Veg Momos", price: 120.5, image: "/Frozen Food/Veg Momos.jpg" },
      { name: "Aloo Tikki", price: 120.5, image: "/Frozen Food/Aloo Tikki.jpg" },
      { name: "Banana Waffle Mix", price: 120.5, image: "/Frozen Food/Banana Waffle Mix.jpg" },
      { name: "ButterMilk Pancakes", price: 120.5, image: "/Frozen Food/ButterMilk Pancakes.jpg" },
      { name: "Chicken Nuggets", price: 120.5, image: "/Frozen Food/Chicken Nuggets.jpg" },
      { name: "Eggo ButterMilk Waffles", price: 120.5, image: "/Frozen Food/Eggo ButterMilk Waffles.jpg" },
      { name: "French Fries", price: 120.5, image: "/Frozen Food/French Fries.jpg" },
      { name: "Methi Paratha", price: 120.5, image: "/Frozen Food/Methi Paratha.jpg" },
      { name: "Mixed Vegetables Samosa", price: 120.5, image: "/Frozen Food/Mixed Vegetables Samosa.jpg" },
      { name: "Paratha", price: 120.5, image: "/Frozen Food/Paratha.jpg" },
      { name: "Potato Wedges", price: 120.5, image: "/Frozen Food/Potato Wedges.jpg" },
      { name: "Protein Pancakes", price: 120.5, image: "/Frozen Food/Protein Pancakes.jpg" },
      { name: "Punjabi Samosa", price: 120.5, image: "/Frozen Food/Punjabi Samosa.jpg" },
      { name: "Vegetable Spring Roll", price: 120.5, image: "/Frozen Food/Vegetable Spring Roll.jpg" },
    ],
    nonVeg: [
      { name: "Beef", price: 250.5, image: "/NonVeg/Beef.jpg" },
      { name: "Brown Eggs", price: 190.5, image: "/NonVeg/Brown Eggs.jpg" },
      { name: "Chicken Boneless", price: 400.5, image: "/NonVeg/Chicken Boneless.jpg" },
      { name: "Chicken Currycut Skin", price: 150.5, image: "/NonVeg/Chicken Currycut Skin.jpg" },
      { name: "Chicken Currycut Small", price: 200.5, image: "/NonVeg/Chicken Currycut Small.jpg" },
      { name: "Chicken Drumsticks Skin", price: 280.5, image: "/NonVeg/Chicken Drumsticks Skin.jpg" },
      { name: "Chicken DrumSticks Skinless", price: 300.5, image: "/NonVeg/Chicken Drumsticks Skinless.jpg" },
      { name: "Classic Eggs", price: 350.5, image: "/NonVeg/Classic Eggs.jpg" },
      { name: "Fish", price: 120.5, image: "/NonVeg/Fish.jpg" },
      { name: "Mutton Keema", price: 120.5, image: "/NonVeg/Mutton Keema.jpg" },
      { name: "Mutton", price: 120.5, image: "/NonVeg/Mutton.jpg" },
      { name: "Octopus", price: 120.5, image: "/NonVeg/Octopus.jpg" },
      { name: "Pork", price: 120.5, image: "/NonVeg/Pork.jpg" },
      { name: "Prawns", price: 120.5, image: "/NonVeg/Prawns.jpg" },
      { name: "Ribbon Fish", price: 120.5, image: "/NonVeg/Ribbon Fish.jpg" },
    ],
    milk: [
      { name: "Amul Masti Spiced ButterMilk", price: 30.5, image: "/DairyProducts/Amul Masti Spiced ButterMilk.jpg" },
      { name: "Butter", price: 20.5, image: "/DairyProducts/Butter.jpg" },
      { name: "Amul Cheese Slices", price: 20.5, image: "/DairyProducts/Amul Cheese Slices.jpg" },
      { name: "Heritage Pista Milk", price: 20.5, image: "/DairyProducts/Heritage Pista Milk.jpg" },
      { name: "Amul Cheese Spreads", price: 20.5, image: "/DairyProducts/Amul Cheese Spreads.jpg" },
      { name: "Cottage Cheese", price: 20.5, image: "/DairyProducts/Cottage Cheese.jpg" },
      { name: "Buffalo Milk", price: 30.0, image: "/DairyProducts/Buffalo Milk.jpg" },
      { name: "Heritage Lassi", price: 20.5, image: "/DairyProducts/Heritage Lassi.jpg" },
      { name: "Dodla Masala ButterMilk", price: 20.0, image: "/DairyProducts/Dodla Masala ButterMilk.jpg" },
      { name: "Ghee", price: 60.0, image: "/DairyProducts/Ghee.jpg" },
      { name: "Cheese", price: 70.0, image: "/DairyProducts/Cheese.jpg" },
      { name: "Heritage Doodh Peda", price: 20.5, image: "/DairyProducts/Heritage Doodh Peda.jpg" },
      { name: "Heritage Butter", price: 30.5, image: "/DairyProducts/Heritage Butter.jpg" },
      { name: "Milk Powder", price: 50.5, image: "/DairyProducts/Milk Powder.jpg" },
    ],
    chocolate: [
      { name: "Caramel Protein Bar", price: 30.5, image: "/Chocolates/Caramel Protein Bar.jpg" },
      { name: "Cadbury 5 Star", price: 20.5, image: "/Chocolates/5 Star.jpg" },
      { name: "Cadbury DairyMilk Silk", price: 20.5, image: "/Chocolates/Cadbury DairyMilk Silk.jpg" },
      { name: "Ferrero Rocher", price: 20.5, image: "/Chocolates/Ferrero Rocher.jpg" },
      { name: "Cadbury Gems", price: 20.5, image: "/Chocolates/Cadbury Gems.jpg" },
      { name: "Munch", price: 20.5, image: "/Chocolates/Munch.jpg" },
      { name: "Perk", price: 20.5, image: "/Chocolates/Perk.jpg" },
      { name: "KitKat", price: 20.5, image: "/Chocolates/KitKat.jpg" },
      { name: "Milky Bar", price: 20.5, image: "/Chocolates/Milky Bar.jpg" },
    ],
  },
  reducers: {}
});

const cartSlice = createSlice({
  name: "cart",
  initialState: localStorageCart,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.find(item => item.name === action.payload.name);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      return state.filter((item) => item.name !== action.payload.name);
    },
    IncCart: (state, action) => {
      const item = state.find(i => i.name === action.payload.name);
      if (item) item.quantity += 1;
    },
    DecCart: (state, action) => {
      const item = state.find(i => i.name === action.payload.name);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      } else {
        return state.filter((i) => i.name !== action.payload.name); // remove if qty 1
      }
    },
    clearCart: () => [],
  }
});
const orderSlice = createSlice({
  name: 'orders',
  initialState: [],
  reducers: {
    orderDetails: (state, action) => {
      state.push(action.payload);
    }
  }
});

const store = configureStore({
  reducer: {
    products: productsSlice.reducer,
    cart: cartSlice.reducer,
    orders: orderSlice.reducer
  },
});

export const {
  addToCart,
  removeFromCart,
  IncCart,
  DecCart,
  clearCart
} = cartSlice.actions;
export const { orderDetails } = orderSlice.actions;

export default store;
